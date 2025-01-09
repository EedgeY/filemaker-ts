import 'server-only';
import { createClient } from '../supabase/server';

interface TokenCacheItem {
  token: string;
  expiresAt: number;
}

interface TokenCache {
  [key: string]: TokenCacheItem;
}

const TOKEN_EXPIRY_TIME = 15 * 60 * 1000; // 15分
const tokenCache: TokenCache = {};

const getEnvironmentVariable = (prod: string, dev: string): string => {
  const value =
    process.env.NODE_ENV === 'production'
      ? process.env[prod]
      : process.env[dev];
  if (!value) throw new Error(`Environment variable ${prod}/${dev} is not set`);
  return value;
};

import { createFileMakerClient } from './FileMakerClient';

export const createToken = async (dbName: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getUser();
    if (error) {
      console.error('[Token] Supabase authentication error:', error);
      return null;
    }

    const token = await getToken(dbName);
    if (!token) {
      return null;
    }

    return createFileMakerClient(token);
  } catch (error) {
    console.error('[Token] Error in createToken:', error);
    return null;
  }
};

const getToken = async (dbName: string): Promise<string> => {
  const now = Date.now();
  const cached = tokenCache[dbName];

  if (cached) {
    // キャッシュが有効期限内の場合
    if (now < cached.expiresAt - 60000) {
      // 1分のバッファを追加
      try {
        console.log(`[Token] Validating cached token for ${dbName}`);
        const url = getEnvironmentVariable(
          'PROD_DATA_URL',
          'NEXT_PUBLIC_DATA_URL'
        );
        const response = await fetch(`${url}/${dbName}/layouts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cached.token}`,
          },
          cache: 'no-store',
        });

        if (response.ok) {
          return cached.token;
        }
      } catch (error) {
        console.warn('[Token] Error validating cached token:', error);
      }
    } else {
      console.log(
        `[Token] Cached token is expired or close to expiry for ${dbName}`
      );
    }
  }

  // 新しいトークンを取得
  try {
    const AUTH_ID = getEnvironmentVariable(
      'PROD_BASIC_AUTH_ID',
      'NEXT_PUBLIC_BASIC_AUTH_ID'
    );
    const AUTH_PASS = getEnvironmentVariable(
      'PROD_BASIC_AUTH_PASS',
      'NEXT_PUBLIC_BASIC_AUTH_PASS'
    );
    const url = getEnvironmentVariable('PROD_DATA_URL', 'NEXT_PUBLIC_DATA_URL');

    const credentials = btoa(`${AUTH_ID}:${AUTH_PASS}`);
    const response = await fetch(`${url}/${dbName}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      console.error(`[Token] Failed to fetch new token: ${response.status}`);
      throw new Error(`Failed to fetch token: ${response.status}`);
    }

    const data = await response.json();
    const newToken = data.response.token;

    // キャッシュを更新
    tokenCache[dbName] = {
      token: newToken,
      expiresAt: now + TOKEN_EXPIRY_TIME,
    };

    return newToken;
  } catch (error) {
    console.error('[Token] Error fetching new token:', error);
    throw error;
  }
};
