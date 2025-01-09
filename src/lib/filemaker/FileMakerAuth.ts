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
  private tokenCache: TokenCache = {};
  private readonly TOKEN_EXPIRY_TIME = 15 * 60 * 1000; // 15分

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

  async getFileMakerToken(dbName: string): Promise<string> {
    const now = Date.now();
    const cached = this.tokenCache[dbName];

    // キャッシュされたトークンが有効な場合
    if (cached && now < cached.expiresAt - 60000) {
      // 1分のバッファを追加
      try {
        const hostUrl = process.env.NEXT_PUBLIC_FILEMAKER_HOST_URL;
        if (!hostUrl) {
          throw new Error(
            'NEXT_PUBLIC_FILEMAKER_HOST_URLが設定されていません。'
          );
        }

        // トークンの有効性を確認
        const layoutsUrl = `${hostUrl}/${dbName}/layouts`;
        console.log('[FileMaker] トークン検証リクエスト:', layoutsUrl);
        const response = await fetch(layoutsUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cached.token}`,
          },
        });

        if (response.ok) {
          return cached.token;
        }
      } catch (error) {
        console.warn('キャッシュされたトークンの検証に失敗しました:', error);
      }
    }

    // 新しいトークンを取得
    try {
      const hostUrl = process.env.NEXT_PUBLIC_FILEMAKER_HOST_URL;
      if (!hostUrl) {
        throw new Error('FILEMAKER_HOST_URLが設定されていません。');
      }

      const credentials = btoa(`${this.username}:${this.password}`);
      const sessionsUrl = `${hostUrl}/${dbName}/sessions`;
      console.log('[FileMaker] 新規トークン取得リクエスト:', sessionsUrl);
      const response = await fetch(sessionsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        console.error('[FileMaker] トークン取得エラー:', {
          status: response.status,
          statusText: response.statusText,
          url: sessionsUrl,
        });
        throw new Error(
          `FileMakerトークンの取得に失敗しました: ${response.status}`
        );
      }

      const data = await response.json();
      const newToken = data.response.token;
      console.log('newToken', newToken);

      // キャッシュを更新
      this.tokenCache[dbName] = {
        token: newToken,
        expiresAt: now + this.TOKEN_EXPIRY_TIME,
      };

      return newToken;
    } catch (error) {
      console.error('新しいFileMakerトークンの取得に失敗しました:', error);
      throw error;
    }
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
