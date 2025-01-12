import 'server-only';
import jwt from 'jsonwebtoken';

interface TokenCacheItem {
  token: string;
  expiresAt: number;
}

interface TokenCache {
  [key: string]: TokenCacheItem;
}

export class FileMakerAuth {
  private secret: string;
  private expiresIn: string | number = '1h';
  private username: string = '';
  private password: string = '';
  public tokenCache: TokenCache = {};
  private readonly TOKEN_EXPIRY_TIME = 50 * 60 * 1000; // 50分
  private tokenRequestPromises: { [key: string]: Promise<string> } = {};

  constructor({ secret }: { secret: string }) {
    this.secret = secret;

    // 認証情報を初期化
    const username = process.env.NEXT_PUBLIC_FILEMAKER_AUTH_ID;
    const password = process.env.NEXT_PUBLIC_FILEMAKER_AUTH_PASS;

    if (!username || !password) {
      throw new Error(
        'FileMaker認証情報が設定されていません。NEXT_PUBLIC_FILEMAKER_AUTH_IDとNEXT_PUBLIC_FILEMAKER_AUTH_PASSを環境変数に設定してください。'
      );
    }

    this.username = username;
    this.password = password;
  }

  generateToken(): string {
    const payload = {
      username: this.username,
      timestamp: Date.now(),
    };

    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.secret);
      return true;
    } catch (err) {
      console.error('トークン検証エラー:', err);
      return false;
    }
  }

  getCredentials() {
    return {
      username: this.username,
      password: this.password,
    };
  }

  private isTokenValid(cached: TokenCacheItem): boolean {
    const now = Date.now();
    return cached && now < cached.expiresAt - 60000; // 1分のバッファを追加
  }

  private getStoredToken(dbName: string): TokenCacheItem | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(`filemaker_token_${dbName}`);
    if (!stored) return null;

    try {
      return JSON.parse(stored) as TokenCacheItem;
    } catch {
      return null;
    }
  }

  private storeToken(dbName: string, token: TokenCacheItem) {
    if (typeof window === 'undefined') return;

    localStorage.setItem(`filemaker_token_${dbName}`, JSON.stringify(token));
  }

  async getFileMakerToken(dbName: string): Promise<string> {
    // 既存のトークンリクエストがある場合は再利用
    if (dbName in this.tokenRequestPromises) {
      try {
        return await this.tokenRequestPromises[dbName];
      } catch {
        delete this.tokenRequestPromises[dbName];
      }
    }

    const now = Date.now();

    // まずローカルストレージをチェック
    const storedToken = this.getStoredToken(dbName);
    if (storedToken && this.isTokenValid(storedToken)) {
      return storedToken.token;
    }

    // メモリキャッシュをチェック
    const cached = this.tokenCache[dbName];
    if (cached && this.isTokenValid(cached)) {
      return cached.token;
    }

    // 新しいトークン取得処理
    this.tokenRequestPromises[dbName] = (async () => {
      try {
        const hostUrl = process.env.NEXT_PUBLIC_FILEMAKER_HOST_URL;
        if (!hostUrl) {
          throw new Error('FILEMAKER_HOST_URLが設定されていません。');
        }

        const credentials = btoa(`${this.username}:${this.password}`);
        const response = await fetch(`${hostUrl}/${dbName}/sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify({}),
          cache: 'no-store',
        });

        if (!response.ok) {
          if (storedToken && now < storedToken.expiresAt) {
            return storedToken.token;
          }
          throw new Error(
            `FileMakerトークンの取得に失敗しました: ${response.status}`
          );
        }

        const data = await response.json();
        const newToken = data.response.token;
        const tokenData = {
          token: newToken,
          expiresAt: now + this.TOKEN_EXPIRY_TIME,
        };

        // メモリとローカルストレージの両方にキャッシュ
        this.tokenCache[dbName] = tokenData;
        this.storeToken(dbName, tokenData);

        return newToken;
      } catch (error) {
        if (storedToken && now < storedToken.expiresAt) {
          return storedToken.token;
        }
        throw error;
      } finally {
        delete this.tokenRequestPromises[dbName];
      }
    })();

    return await this.tokenRequestPromises[dbName];
  }

  async getToken(): Promise<string> {
    const authId = process.env.NEXT_PUBLIC_FILEMAKER_AUTH_ID;
    const authPass = process.env.NEXT_PUBLIC_FILEMAKER_AUTH_PASS;

    if (!authId || !authPass) {
      throw new Error(
        'FileMaker認証情報が設定されていません。NEXT_PUBLIC_FILEMAKER_AUTH_IDとNEXT_PUBLIC_FILEMAKER_AUTH_PASSを環境変数に設定してください。'
      );
    }

    return this.generateToken();
  }
}
