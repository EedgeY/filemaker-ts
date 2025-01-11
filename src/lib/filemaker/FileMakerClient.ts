import { FMDatabase } from '@/types/filemaker/schema';
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

// FileMakerのレコード型
export interface FileMakerRecord<T = Record<string, unknown>> {
  fieldData: T;
  portalData?: Record<
    string,
    Array<{
      recordId: string;
      modId: string;
      [key: string]: unknown;
    }>
  >;
  recordId?: string;
  modId?: string;
}

// FileMakerのユーザーフィールド型
export interface FileMakerUserFields {
  _pk: string;
  name: string;
  pass: string;
}

// FileMakerのユーザーレスポンス型
export interface FileMakerUserResponse {
  id: string;
  username: string;
  password: string;
}

// FileMakerのレスポンス型
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
    data?: Array<FileMakerRecord<T>>;
  };
}

// レコード作成・更新時のレスポンス型
export interface FileMakerModifyResponseData {
  recordId?: string;
  modId?: string;
  scriptResult?: string;
  scriptError?: string;
}

export interface FileMakerModifyResponse extends FileMakerBaseResponse {
  response: FileMakerModifyResponseData;
}

// 削除時のレスポンス型を復活
export interface FileMakerDeleteResponse extends FileMakerBaseResponse {
  response: Record<string, never>;
}

// FMScriptNameの型を定義
type FMScriptName = FMDatabase['Script']['script'][number]['name'];

class QueryBuilder<T extends keyof FMDatabase['Table']> {
  private layoutName: T;
  private dbName: string;
  private client: FileMakerClient;
  private sortOptions: SortOption[] = [];
  private conditions: Partial<FMDatabase['Table'][T]['read']['fieldData']> = {};

  constructor(client: FileMakerClient, dbName: string, layoutName: T) {
    this.client = client;
    this.dbName = dbName;
    this.layoutName = layoutName;
  }

  sort(sorts: SortOption[] | SortOption): this {
    this.sortOptions = Array.isArray(sorts) ? sorts : [sorts];
    return this;
  }

  eq(conditions: Partial<FMDatabase['Table'][T]['read']['fieldData']>): this {
    this.conditions = conditions;
    return this;
  }

  /**
   * レスポンス全体を取得
   */
  async then(): Promise<
    FileMakerDataResponse<FMDatabase['Table'][T]['read']['fieldData']>
  > {
    const query = {
      query: [this.conditions],
      ...(this.sortOptions.length > 0 && { sort: this.sortOptions }),
    };
    return await this.client.sendPost(
      `layouts/${this.layoutName}/_find`,
      query
    );
  }

  /**
   * データ配列のみを取得
   */
  async data(): Promise<
    FileMakerRecord<FMDatabase['Table'][T]['read']['fieldData']>[]
  > {
    const response = await this.then();
    return response.response?.data || [];
  }

  /**
   * 最初のレコードのfieldDataを取得
   */
  async first(): Promise<
    FMDatabase['Table'][T]['read']['fieldData'] | undefined
  > {
    const response = await this.then();
    return response.response?.data?.[0]?.fieldData;
  }

  /**
   * すべてのレコードのfieldDataを配列で取得
   */
  async fields(): Promise<FMDatabase['Table'][T]['read']['fieldData'][]> {
    const response = await this.then();
    return response.response?.data?.map((record) => record.fieldData) || [];
  }
}

class GetBuilder<T extends keyof FMDatabase['Table']> {
  private layoutName: T;
  private dbName: string;
  private client: FileMakerClient;
  private sortOptions: SortOption[] = [];
  private startRecord?: number;
  private limitRecords?: number;

  constructor(client: FileMakerClient, dbName: string, layoutName: T) {
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

  async single(recordId: string): Promise<FileMakerDataResponse> {
    try {
      const result = await this.client.sendGet(
        `layouts/${this.layoutName}/records/${recordId}`
      );

      const typedResponse: FileMakerDataResponse = {
        messages: result.messages,
        response: {
          dataInfo: result.response.dataInfo,
          data: result.response.data?.map((record: any) => ({
            fieldData: record.fieldData,
            recordId: record.recordId,
            modId: record.modId,
            portalData: record.portalData,
          })),
        },
      };

      return typedResponse;
    } catch {
      return {
        messages: [
          { code: 'error', message: 'データが取得できませんでした。' },
        ],
        response: { data: [] },
      };
    }
  }

  async then(): Promise<
    FileMakerDataResponse<FMDatabase['Table'][T]['read']['fieldData']>
  > {
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
      const result = await this.client.sendGet(url, undefined, params);

      return {
        messages: result.messages,
        response: {
          dataInfo: result.response.dataInfo,
          data: result.response.data?.map((record: any) => ({
            fieldData: record.fieldData,
            recordId: record.recordId,
            modId: record.modId,
            portalData: record.portalData,
          })),
        },
      };
    } catch (error) {
      return {
        messages: [{ code: 'error', message: (error as Error).message }],
        response: { data: [] },
      };
    }
  }

  /**
   * データ配列のみを取得
   */
  async data(): Promise<
    FileMakerRecord<FMDatabase['Table'][T]['read']['fieldData']>[]
  > {
    const response = await this.then();
    return response.response?.data || [];
  }

  /**
   * 最初のレコードのfieldDataを取得
   */
  async first(): Promise<
    FMDatabase['Table'][T]['read']['fieldData'] | undefined
  > {
    const response = await this.then();
    return response.response?.data?.[0]?.fieldData;
  }

  /**
   * すべてのレコードのfieldDataを配列で取得
   */
  async fields(): Promise<FMDatabase['Table'][T]['read']['fieldData'][]> {
    const response = await this.then();
    return response.response?.data?.map((record) => record.fieldData) || [];
  }
}

class PostBuilder<T extends keyof FMDatabase['Table']> {
  private readonly layoutName: T;
  private readonly dbName: string;
  private readonly client: FileMakerClient;
  private readonly scriptOptions: ScriptOptions = {};
  private readonly data: {
    fieldData: FMDatabase['Table'][T]['create']['fieldData'];
    portalData?: FMDatabase['Table'][T]['create'] extends {
      portalData: infer P;
    }
      ? P
      : never;
  };
  private dateformatOption?: number;

  constructor(
    client: FileMakerClient,
    dbName: string,
    layoutName: T,
    data: {
      fieldData: FMDatabase['Table'][T]['create']['fieldData'];
      portalData?: FMDatabase['Table'][T]['create'] extends {
        portalData: infer P;
      }
        ? P
        : never;
    }
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

  async then(): Promise<FileMakerModifyResponse> {
    const url = `layouts/${this.layoutName}/records`;
    const requestBody = {
      fieldData: this.data.fieldData,
      ...(this.data.portalData && { portalData: this.data.portalData }),
      ...(typeof this.dateformatOption === 'number' && {
        dateformats: this.dateformatOption,
      }),
      ...this.buildScriptOptions(),
    };

    return await this.client.sendPost<FileMakerModifyResponse>(
      url,
      requestBody
    );
  }

  private buildScriptOptions(): Record<string, unknown> {
    return {
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

  public async sendGet(
    path: string,
    body?: unknown,
    params?: URLSearchParams
  ): Promise<FileMakerDataResponse> {
    const response = await this.request<FileMakerDataResponse>(
      'GET',
      path,
      body,
      params
    );
    return response;
  }

  public async sendPost<T extends FileMakerBaseResponse>(
    path: string,
    body?: unknown
  ): Promise<T> {
    const response = await this.request<T>('POST', path, body);
    return response;
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
    return response;
  }

  public async sendDelete(path: string): Promise<FileMakerDeleteResponse> {
    const response = await this.request<FileMakerDeleteResponse>(
      'DELETE',
      path
    );
    return response;
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

    const response = await this.fetch(requestUrl, {
      method,
      headers,
      body:
        method === 'POST' && !body
          ? JSON.stringify({
              fieldData: {},
              response: {
                recordId: '0',
                modId: '0',
              },
            })
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

    const data = await response.json();
    return data as T;
  }

  /**
   * デフォルトのデータベースを使用してレイアウトにアクセス
   */
  get<T extends keyof FMDatabase['Table']>(layoutName: T) {
    return new GetBuilder<T>(this, this.defaultDatabase, layoutName);
  }

  find<T extends keyof FMDatabase['Table']>(layoutName: T) {
    return new QueryBuilder<T>(this, this.defaultDatabase, layoutName);
  }

  post<T extends keyof FMDatabase['Table']>(
    layoutName: T,
    data: {
      fieldData: FMDatabase['Table'][T]['create']['fieldData'];
      portalData?: FMDatabase['Table'][T]['create'] extends {
        portalData: infer P;
      }
        ? P
        : never;
    }
  ) {
    return new PostBuilder<T>(this, this.defaultDatabase, layoutName, data);
  }

  /**
   * データベースを切り替えてアクセス
   */
  db(dbName?: string) {
    const targetDb = dbName || this.defaultDatabase;
    this.currentDatabase = targetDb;
    return {
      get: <T extends keyof FMDatabase['Table']>(layoutName: T) =>
        new GetBuilder<T>(this, targetDb, layoutName),
      find: <T extends keyof FMDatabase['Table']>(layoutName: T) =>
        new QueryBuilder<T>(this, targetDb, layoutName),
      post: <T extends keyof FMDatabase['Table']>(
        layoutName: T,
        data: {
          fieldData: FMDatabase['Table'][T]['create']['fieldData'];
          portalData?: FMDatabase['Table'][T]['create'] extends {
            portalData: infer P;
          }
            ? P
            : never;
        }
      ) => new PostBuilder<T>(this, targetDb, layoutName, data),
      update: <T extends keyof FMDatabase['Table']>(
        layoutName: T,
        recordId: string,
        data: {
          fieldData: FMDatabase['Table'][T]['update']['fieldData'];
        }
      ) =>
        this.sendPatch(`layouts/${layoutName}/records/${recordId}`, {
          fieldData: data.fieldData,
        }),
      copy: <T extends keyof FMDatabase['Table']>(
        layoutName: T,
        recordId: string
      ) => this.sendPost(`layouts/${layoutName}/records/${recordId}`),
      delete: <T extends keyof FMDatabase['Table']>(
        layoutName: T,
        recordId: string
      ) => this.sendDelete(`layouts/${layoutName}/records/${recordId}`),
    };
  }

  async findUser(username: string): Promise<FileMakerUserResponse | null> {
    try {
      const response = await this.sendPost<
        FileMakerDataResponse<FileMakerUserFields>
      >(`layouts/users/_find`, {
        query: [{ name: username }],
      });

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
      const response = await this.sendPost<
        FileMakerDataResponse<FileMakerUserFields>
      >(`layouts/users/records`, {
        fieldData: {
          name: username,
          pass: hashedPassword,
        },
      });

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
