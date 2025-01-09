import {
  FMDatabase,
  FMScriptName,
  FMLayoutName,
} from '@/types/filemaker/schema';
import { FileMakerAuth } from './FileMakerAuth';
import bcrypt from 'bcryptjs';

type Fetch = typeof fetch;

interface FileMakerClientOptions {
  fetch?: Fetch;
  headers?: Record<string, string>;
  auth: FileMakerAuth;
}

interface SortOption {
  fieldName: string;
  sortOrder: 'ascend' | 'descend';
}

// SortConditionインターフェースを削除し、代わりにPartialSortOptionを使用
type PartialSortOption = {
  fieldName: string;
  sortOrder?: 'ascend' | 'descend';
};

// スキーマ型の仮定義（実際のスキーマに合わせて調整してください）
interface FMScriptParam {
  [key: string]: string | number | boolean | null;
}

interface ScriptOptions {
  script?: {
    name: FMScriptName;
    param?: string | FMScriptParam;
  };
  scriptPreRequest?: {
    name: FMScriptName;
    param?: string | FMScriptParam;
  };
  scriptPreSort?: {
    name: FMScriptName;
    param?: string | FMScriptParam;
  };
}

export interface FileMakerRecord<T = Record<string, unknown>> {
  fieldData: T;
  portalData: Record<string, unknown>;
  recordId: string;
  modId: string;
}

// 基本的なFileMakerのレスポンス型
export interface FileMakerBaseResponse {
  messages: Array<{
    code: string;
    message: string;
  }>;
}

// データを含むレスポンス型
export interface FileMakerDataResponse<T = Record<string, unknown>>
  extends FileMakerBaseResponse {
  response: {
    dataInfo?: {
      database: string;
      layout: string;
      table: string;
      totalRecordCount: number;
      foundCount: number;
      returnedCount: number;
    };
    data?: FileMakerRecord<T>[];
    token?: string;
  };
}

// レコード作成・更新時のレスポンス型
export interface FileMakerModifyResponse extends FileMakerBaseResponse {
  response: {
    recordId?: string;
    modId?: string;
  };
}

// 削除時のレスポンス型
export interface FileMakerDeleteResponse extends FileMakerBaseResponse {
  response: Record<string, never>;
}

interface UserFieldData {
  _pk: string;
  id: number;
  name: string;
  pass: string;
  role: string;
  farm_id: number;
  furikana: string;
  hidden: number;
}

interface FileMakerUserResponse {
  id: string;
  username: string;
  password: string;
}

class QueryBuilder<T> {
  private layoutName: string;
  private dbName: string;
  private client: FileMakerClient;
  private sortOptions: SortOption[] = [];

  constructor(client: FileMakerClient, dbName: string, layoutName: string) {
    this.client = client;
    this.dbName = dbName;
    this.layoutName = layoutName;
  }

  sort(sorts: SortOption[] | SortOption): this {
    this.sortOptions = Array.isArray(sorts) ? sorts : [sorts];
    return this;
  }

  async eq(
    conditions: Record<string, unknown>
  ): Promise<FileMakerDataResponse<T>> {
    const query = {
      query: [conditions],
      ...(this.sortOptions.length > 0 && { sort: this.sortOptions }),
    };

    return await this.client.sendPost(
      `layouts/${this.layoutName}/_find`,
      query
    );
  }
}

class GetBuilder<T> {
  private layoutName: string;
  private dbName: string;
  private client: FileMakerClient;
  private sortOptions: SortOption[] = [];
  private startRecord?: number;
  private limitRecords?: number;

  constructor(client: FileMakerClient, dbName: string, layoutName: string) {
    this.client = client;
    this.dbName = dbName;
    this.layoutName = layoutName;
  }

  /**
   * ソート条件を設定
   * @param sorts 単一のソート条件または複数のソート条件の配列
   * @example
   * // 単一のソート
   * .sort('fieldName', 'ascend')
   * // または
   * .sort({ fieldName: 'fieldName', sortOrder: 'ascend' })
   * // 複数のソート
   * .sort([
   *   { fieldName: 'field1', sortOrder: 'ascend' },
   *   { fieldName: 'field2', sortOrder: 'descend' }
   * ])
   */
  sort(
    sorts: string | PartialSortOption | (string | PartialSortOption)[],
    sortOrder?: 'ascend' | 'descend'
  ): this {
    if (typeof sorts === 'string') {
      // 文字列の場合は単一フィールドのソート
      this.sortOptions = [
        {
          fieldName: sorts,
          sortOrder: sortOrder || 'ascend',
        },
      ];
    } else if (Array.isArray(sorts)) {
      // 配列の場合は複数フィールドのソート
      this.sortOptions = sorts.map((sort) => {
        if (typeof sort === 'string') {
          return {
            fieldName: sort,
            sortOrder: 'ascend',
          };
        }
        return {
          fieldName: sort.fieldName,
          sortOrder: sort.sortOrder || 'ascend',
        };
      });
    } else {
      // オブジェクトの場合は単一フィールドのソート
      this.sortOptions = [
        {
          fieldName: sorts.fieldName,
          sortOrder: sorts.sortOrder || 'ascend',
        },
      ];
    }
    return this;
  }

  range(start: number, limit: number): this {
    this.startRecord = start;
    this.limitRecords = limit;
    return this;
  }

  async single(
    recordId: string
  ): Promise<{ data: FileMakerRecord<T> | null; error: Error | null }> {
    try {
      const result = (await this.client.sendGet(
        `layouts/${this.layoutName}/records/${recordId}`
      )) as FileMakerDataResponse<T>;
      return {
        data: result.response?.data?.[0] || null,
        error: null,
      };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async then(
    resolve: (value: FileMakerDataResponse<T>) => void
  ): Promise<void> {
    try {
      const params = new URLSearchParams();
      if (this.startRecord)
        params.append('_offset', this.startRecord.toString());
      if (this.limitRecords)
        params.append('_limit', this.limitRecords.toString());
      if (this.sortOptions.length > 0) {
        params.append('_sort', JSON.stringify(this.sortOptions));
      }

      const url = `layouts/${this.layoutName}/records`;
      console.log('[FileMaker] GetBuilder リクエストURL:', url);
      const result = (await this.client.sendGet(
        url,
        undefined,
        params
      )) as FileMakerDataResponse<T>;
      resolve(result);
    } catch (error) {
      resolve({
        messages: [{ code: 'error', message: (error as Error).message }],
        response: { data: [] },
      });
    }
  }
}

class PostBuilder<T> {
  private layoutName: string;
  private dbName: string;
  private client: FileMakerClient;
  private scriptOptions: ScriptOptions = {};
  private data: Record<string, unknown>;
  private dateformatOption?: number;

  constructor(
    client: FileMakerClient,
    dbName: string,
    layoutName: string,
    data: Record<string, unknown>
  ) {
    this.client = client;
    this.dbName = dbName;
    this.layoutName = layoutName;
    this.data = data;
  }

  script(name: FMScriptName, param?: string | FMScriptParam): this {
    this.scriptOptions.script = { name, param };
    return this;
  }

  scriptPreRequest(name: FMScriptName, param?: string | FMScriptParam): this {
    this.scriptOptions.scriptPreRequest = { name, param };
    return this;
  }

  scriptPreSort(name: FMScriptName, param?: string | FMScriptParam): this {
    this.scriptOptions.scriptPreSort = { name, param };
    return this;
  }

  dateformat(format: 0 | 1 | 2): this {
    this.dateformatOption = format;
    return this;
  }

  async then(
    resolve: (value: FileMakerDataResponse<T[]>) => void
  ): Promise<void> {
    try {
      if (!this.data || Object.keys(this.data).length === 0) {
        throw new Error('Request body cannot be empty');
      }

      const url = `layouts/${this.layoutName}/records`;

      const requestBody: Record<string, unknown> = {
        ...(typeof this.dateformatOption === 'number' && {
          dateformats: this.dateformatOption,
        }),
        ...this.data,
        ...(this.scriptOptions.script && {
          script: this.scriptOptions.script.name,
          'script.param': this.scriptOptions.script.param,
        }),
        ...(this.scriptOptions.scriptPreRequest && {
          'script.prerequest': this.scriptOptions.scriptPreRequest.name,
          'script.prerequest.param': this.scriptOptions.scriptPreRequest.param,
        }),
        ...(this.scriptOptions.scriptPreSort && {
          'script.presort': this.scriptOptions.scriptPreSort.name,
          'script.presort.param': this.scriptOptions.scriptPreSort.param,
        }),
      };

      console.log('[FileMaker] PostBuilder Request:', {
        url,
        requestBody,
      });

      const result = await this.client.sendPost<T[]>(url, requestBody);
      resolve(result);
    } catch (error) {
      resolve({
        messages: [{ code: 'error', message: (error as Error).message }],
        response: { data: [] },
      });
    }
  }
}

export default class FileMakerClient {
  private filemakerUrl: string;
  private headers: Record<string, string>;
  private fetch: Fetch;
  protected auth: FileMakerAuth;
  private defaultDatabase: string;
  private currentDatabase: string;

  constructor(options: FileMakerClientOptions) {
    if (!options.auth) {
      throw new Error('FileMakerAuth is required');
    }

    const hostUrl = process.env.NEXT_PUBLIC_FILEMAKER_HOST_URL;
    const defaultDb = process.env.NEXT_PUBLIC_FILEMAKER_DATABASE_NAME;

    if (!hostUrl) {
      throw new Error(
        'FileMakerのホストURLが設定されていません。NEXT_PUBLIC_FILEMAKER_HOST_URLを環境変数に設定してください。'
      );
    }

    this.filemakerUrl = `${hostUrl}`;
    this.defaultDatabase = defaultDb || '';
    this.currentDatabase = this.defaultDatabase;
    this.headers = options?.headers || {};
    this.fetch = options?.fetch || globalThis.fetch;
    this.auth = options.auth;
  }

  public getDefaultDatabase(): string {
    if (!this.defaultDatabase) {
      throw new Error(
        'NEXT_PUBLIC_FILEMAKER_DATABASE_NAMEが環境変数に設定されていません。'
      );
    }
    return this.defaultDatabase;
  }

  public async sendGet<T>(
    path: string,
    body?: unknown,
    params?: URLSearchParams
  ): Promise<FileMakerDataResponse<T>> {
    const response = await this.request<FileMakerDataResponse<T>>(
      'GET',
      path,
      body,
      params
    );
    return response as FileMakerDataResponse<T>;
  }

  public async sendPost<T>(
    path: string,
    body?: unknown
  ): Promise<FileMakerDataResponse<T>> {
    const response = await this.request<FileMakerDataResponse<T>>(
      'POST',
      path,
      body
    );
    return response as FileMakerDataResponse<T>;
  }

  public async sendPatch(
    path: string,
    body: unknown
  ): Promise<FileMakerModifyResponse> {
    const response = await this.request<FileMakerModifyResponse>(
      'PATCH',
      path,
      body
    );
    return response as FileMakerModifyResponse;
  }

  public async sendDelete(path: string): Promise<FileMakerDeleteResponse> {
    const response = await this.request<FileMakerDeleteResponse>(
      'DELETE',
      path
    );
    return response as FileMakerDeleteResponse;
  }

  private async request<T extends FileMakerBaseResponse>(
    method: string,
    path: string,
    body?: unknown,
    params?: URLSearchParams
  ): Promise<T> {
    const jwtToken = this.auth.generateToken();
    if (!this.auth.verifyToken(jwtToken)) {
      throw new Error('JWT認証に失敗しました。');
    }

    const filemakerToken = await this.auth.getFileMakerToken(
      this.currentDatabase
    );

    const headers = {
      ...this.headers,
      Authorization: `Bearer ${filemakerToken}`,
      'Content-Type': 'application/json',
    };

    const requestUrl = `${this.filemakerUrl}/${this.currentDatabase}/${path}${
      params?.toString() ? '?' + params.toString() : ''
    }`;
    console.log('[FileMaker] リクエスト詳細:', {
      database: this.currentDatabase,
      url: requestUrl,
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const response = await this.fetch(requestUrl, {
      method,
      headers,
      body:
        method === 'POST' && !body
          ? JSON.stringify({})
          : body
          ? JSON.stringify(body)
          : undefined,
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('[FileMaker] レスポンスエラー:', {
        status: response.status,
        statusText: response.statusText,
        url: requestUrl,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * デフォルトのデータベースを使用してレイアウトにアクセス
   */
  get<T extends FMLayoutName>(layoutName: T) {
    return new GetBuilder<FMDatabase['Table'][T]>(
      this,
      this.defaultDatabase,
      layoutName
    );
  }

  find<T extends FMLayoutName>(layoutName: T) {
    return new QueryBuilder<FMDatabase['Table'][T]>(
      this,
      this.defaultDatabase,
      layoutName
    );
  }

  post<T extends FMLayoutName>(layoutName: T, data: Record<string, unknown>) {
    return new PostBuilder<FMDatabase['Table'][T]>(
      this,
      this.defaultDatabase,
      layoutName,
      data
    );
  }

  /**
   * データベースを切り替えてアクセス
   */
  db(dbName?: string) {
    const targetDb = dbName || this.defaultDatabase;
    this.currentDatabase = targetDb;
    return {
      get: <T extends FMLayoutName>(layoutName: T) =>
        new GetBuilder<FMDatabase['Table'][T]>(this, targetDb, layoutName),
      find: <T extends FMLayoutName>(layoutName: T) =>
        new QueryBuilder<FMDatabase['Table'][T]>(this, targetDb, layoutName),
      post: <T extends FMLayoutName>(
        layoutName: T,
        data: Record<string, unknown>
      ) =>
        new PostBuilder<FMDatabase['Table'][T]>(
          this,
          targetDb,
          layoutName,
          data
        ),
      update: <T extends FMLayoutName>(
        layoutName: T,
        recordId: string,
        data: Record<string, unknown>
      ) =>
        this.sendPatch(`layouts/${layoutName}/records/${recordId}`, {
          fieldData: data,
        }),
      copy: <T extends FMLayoutName>(layoutName: T, recordId: string) =>
        this.sendPost(`layouts/${layoutName}/records/${recordId}`),
      delete: <T extends FMLayoutName>(layoutName: T, recordId: string) =>
        this.sendDelete(`layouts/${layoutName}/records/${recordId}`),
    };
  }

  async findUser(username: string): Promise<FileMakerUserResponse | null> {
    try {
      const response = await this.sendPost<UserFieldData>(
        `layouts/users/_find`,
        {
          query: [{ name: username }],
        }
      );
      const userData = response.response?.data?.[0];

      if (!userData?.fieldData) return null;

      return {
        id: userData.fieldData._pk,
        username: userData.fieldData.name,
        password: userData.fieldData.pass,
      };
    } catch (error) {
      console.error('ユーザー検索エラー:', error);
      return null;
    }
  }

  async signup(
    username: string,
    password: string
  ): Promise<FileMakerUserResponse | null> {
    try {
      // ユーザー名の重複チェック
      const existingUser = await this.findUser(username);
      if (existingUser) {
        throw new Error('このユーザー名は既に使用されています');
      }

      // パスワードのハッシュ化
      const hashedPassword = await bcrypt.hash(password, 10);

      // ユーザーの作成
      const response = await this.sendPost<UserFieldData>(
        `layouts/users/records`,
        {
          fieldData: {
            name: username,
            pass: hashedPassword,
          },
        }
      );

      const newUser = response.response?.data?.[0];
      if (!newUser?.fieldData) return null;

      return {
        id: newUser.fieldData._pk,
        username: newUser.fieldData.name,
        password: newUser.fieldData.pass,
      };
    } catch (error) {
      console.error('ユーザー登録エラー:', error);
      throw error;
    }
  }
}

/**
 * FileMakerクライアントを作成
 * @param filemakerKey FileMaker APIキー
 * @param token 認証トークン
 * @param options オプション
 */
export function createFileMakerClient({
  auth,
}: {
  auth: FileMakerAuth;
}): FileMakerClient {
  const baseUrl = process.env.NEXT_PUBLIC_FILEMAKER_HOST_URL;

  if (!baseUrl) {
    throw new Error(
      'FileMakerのホストURLが設定されていません。NEXT_PUBLIC_FILEMAKER_HOST_URLを環境変数に設定してください。'
    );
  }

  return new FileMakerClient({ auth });
}
