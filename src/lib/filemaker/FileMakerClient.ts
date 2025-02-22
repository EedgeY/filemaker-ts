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

interface ObjectFieldData {
  fieldName: string;
  data: string | Blob;
  fileName?: string;
}

class QueryBuilder<T extends keyof FMDatabase['Table']> {
  private layoutName: T;
  private dbName: string;
  private client: FileMakerClient;
  private sortOptions: SortOption[] = [];
  private conditions: Partial<FMDatabase['Table'][T]['read']['fieldData']> = {};
  private limitRecords?: number;
  private offsetRecords?: number;

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
   * 取得するレコード数を制限
   * @param limit 取得するレコードの最大数
   */
  limit(limit: number): this {
    this.limitRecords = limit;
    return this;
  }

  /**
   * 開始レコードを指定
   * @param offset スキップするレコード数
   */
  offset(offset: number): this {
    this.offsetRecords = offset;
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
      ...(this.limitRecords !== undefined && {
        limit: this.limitRecords.toString(),
      }),
      ...(this.offsetRecords !== undefined && {
        offset: this.offsetRecords.toString(),
      }),
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
    FileMakerDataResponse<FMDatabase['Table'][T]['read']['fieldData']>
  > {
    const response = await this.then();
    return response;
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

  async single(
    recordId: string
  ): Promise<
    FileMakerDataResponse<FMDatabase['Table'][T]['read']['fieldData']>
  > {
    try {
      const result = await this.client.sendGet(
        `layouts/${this.layoutName}/records/${recordId}`
      );

      const typedResponse: FileMakerDataResponse<
        FMDatabase['Table'][T]['read']['fieldData']
      > = {
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
      if (this.startRecord !== undefined) {
        params.append('_offset', this.startRecord.toString());
      }
      if (this.limitRecords !== undefined) {
        params.append('_limit', this.limitRecords.toString());
      }
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
    FileMakerDataResponse<FMDatabase['Table'][T]['read']['fieldData']>
  > {
    const response = await this.then();
    return response;
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
  private objectFields: ObjectFieldData[] = [];

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

  object(fieldName: string, data: string | Blob, fileName?: string): this {
    this.objectFields.push({ fieldName, data, fileName });
    return this;
  }

  async then(): Promise<FileMakerModifyResponse> {
    try {
      const filemakerToken = await this.client.auth.getFileMakerToken(
        this.client.getCurrentDatabase()
      );

      const createResponse =
        await this.client.sendPost<FileMakerModifyResponse>(
          `layouts/${this.layoutName}/records`,
          {
            fieldData: this.data.fieldData,
            ...(this.data.portalData && { portalData: this.data.portalData }),
            ...(typeof this.dateformatOption === 'number' && {
              dateformats: this.dateformatOption,
            }),
            ...this.buildScriptOptions(),
          }
        );

      if (!createResponse.response?.recordId) {
        throw new Error('レコードの作成に失敗しました');
      }

      if (this.objectFields.length > 0) {
        await Promise.all(
          this.objectFields.map(async (field) => {
            const formData = new FormData();

            try {
              let blob: Blob;
              if (typeof field.data === 'string') {
                if (field.data.startsWith('data:')) {
                  // Base64データの場合
                  const response = await fetch(field.data);
                  blob = await response.blob();
                } else if (field.data.startsWith('http')) {
                  // URLの場合
                  const response = await fetch(field.data);
                  blob = await response.blob();
                } else {
                  console.log('不正な形式のデータ:', field.data);
                  return;
                }
              } else {
                blob = field.data as Blob;
              }

              formData.append('upload', blob, field.fileName || 'image.jpg');

              const response = await fetch(
                `${this.client.getFileMakerUrl()}/${this.client.getCurrentDatabase()}/layouts/${
                  this.layoutName
                }/records/${createResponse.response.recordId}/containers/${
                  field.fieldName
                }/1`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${filemakerToken}`,
                  },
                  body: formData,
                }
              );

              if (!response.ok) {
                const errorText = await response.text();
                console.error('FileMaker API Error:', {
                  status: response.status,
                  statusText: response.statusText,
                  response: errorText,
                  url: response.url,
                });
                throw new Error(
                  `オブジェクトフィールド ${field.fieldName} のアップロードに失敗しました: ${response.status} ${response.statusText}`
                );
              }

              const responseData = await response.json().catch(() => null);
              console.log('FileMaker API Success:', {
                status: response.status,
                response: responseData,
              });
            } catch (error) {
              console.error('画像アップロードエラー:', error);
              throw error;
            }
          })
        );
      }

      return createResponse;
    } catch (error) {
      throw error;
    }
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

// PostBuilderクラスの後に配置
interface ScriptPDFResponse {
  base64: string;
  recordId: string;
  modId: string;
  scriptError: string | null;
}

interface PDFRecord {
  file: string;
  uuid: string;
}

class ScriptPDFBuilder<T extends keyof FMDatabase['Table']> {
  private readonly layoutName: T;
  private readonly client: FileMakerClient;
  private readonly data: FMDatabase['Table'][T]['create']['fieldData'];
  private scriptName?: FMScriptName;
  private scriptParam?: string;

  constructor(
    client: FileMakerClient,
    layoutName: T,
    data: FMDatabase['Table'][T]['create']['fieldData']
  ) {
    this.client = client;
    this.layoutName = layoutName;
    this.data = data;
  }

  script(name: FMScriptName): this {
    this.scriptName = name;
    return this;
  }

  scriptparam(param: string): this {
    this.scriptParam = param;
    return this;
  }

  async then(): Promise<ScriptPDFResponse> {
    if (!this.scriptName) {
      throw new Error('スクリプト名が指定されていません');
    }

    const post = this.client.post(this.layoutName, { fieldData: this.data });
    post.script(this.scriptName, this.scriptParam);

    const result = await post.then();

    console.log('FileMaker Response:', {
      scriptResult: result.response?.scriptResult,
      scriptError: result.response?.scriptError,
      recordId: result.response?.recordId,
      messages: result.messages,
    });

    const scriptResult = result.response?.scriptResult;
    const scriptError = result.response?.scriptError;

    if (result.messages?.[0]?.code !== '0') {
      throw new Error(
        `PDFの生成に失敗しました: ${result.messages?.[0]?.message}`
      );
    }

    if (!scriptResult) {
      throw new Error('PDFの生成に失敗しました');
    }

    // scriptResultから layoutname と uuid を取得
    const [targetLayout, uuid] = scriptResult.split('|');

    // 生成されたPDFレコードを検索
    const pdfRecord = (await this.client
      .find(targetLayout as T)
      .eq({ id: uuid } as any)
      .first()) as PDFRecord | undefined;

    if (!pdfRecord?.file) {
      throw new Error('PDFファイルが見つかりません');
    }

    return {
      base64: pdfRecord.file, // fileフィールドのURLを返す
      recordId: result.response.recordId || '',
      modId: result.response.modId || '',
      scriptError: scriptError || null,
    };
  }
}

export default class FileMakerClient {
  private filemakerUrl: string;
  private headers: Record<string, string>;
  private fetch: Fetch;
  public auth: FileMakerAuth;
  private defaultDatabase: string;
  private currentDatabase: string;

  private async fetchImageAsBase64(imageUrl: string): Promise<string | null> {
    if (!imageUrl) {
      console.log('画像URLが指定されていません');
      return null;
    }

    try {
      const filemakerToken = await this.auth.getFileMakerToken(
        this.currentDatabase
      );
      const response = await this.fetch(imageUrl, {
        headers: {
          Authorization: `Bearer ${filemakerToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`画像の取得に失敗しました: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error('取得したデータが画像ではありません');
      }

      const arrayBuffer = await response.arrayBuffer();
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        throw new Error('画像データが空です');
      }

      const buffer = Buffer.from(arrayBuffer);
      return `data:${contentType};base64,${buffer.toString('base64')}`;
    } catch (error) {
      console.error('画像取得エラー:', error);
      return null;
    }
  }

  async getContainerFieldAsBase64(url: string): Promise<string | null> {
    try {
      const imageUrl = `${url}`;
      return await this.fetchImageAsBase64(imageUrl);
    } catch (error) {
      console.error('画像取得エラー:', error);
      return null;
    }
  }

  async uploadContainerField(
    layoutName: string,
    recordId: string,
    fieldName: string,
    base64Image: string
  ): Promise<boolean> {
    try {
      // Base64データをBlobに変換
      const base64Response = await fetch(base64Image);
      const blob = await base64Response.blob();

      // FormDataを作成
      const formData = new FormData();
      formData.append('upload', blob, 'image.jpg');

      const filemakerToken = await this.auth.getFileMakerToken(
        this.currentDatabase
      );

      // コンテナフィールドに画像をアップロード
      const response = await this.fetch(
        `${this.filemakerUrl}/${this.currentDatabase}/layouts/${layoutName}/records/${recordId}/containers/${fieldName}/1`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${filemakerToken}`,
          },
          body: formData,
        }
      );

      return response.ok;
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      return false;
    }
  }

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

  public async patch<T extends keyof FMDatabase['Table']>(
    layoutName: T,
    recordId: string,
    data: {
      fieldData: FMDatabase['Table'][T]['update']['fieldData'];
      portalData?: FMDatabase['Table'][T]['create'] extends {
        portalData: infer P;
      }
        ? P
        : never;
    }
  ): Promise<FileMakerModifyResponse> {
    return this.sendPatch(`layouts/${layoutName}/records/${recordId}`, {
      fieldData: data.fieldData,
      ...(data.portalData && { portalData: data.portalData }),
    });
  }

  public async delete<T extends keyof FMDatabase['Table']>(
    layoutName: T,
    recordId: string
  ): Promise<FileMakerDeleteResponse> {
    return this.sendDelete(`layouts/${layoutName}/records/${recordId}`);
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
    params?: URLSearchParams,
    retryCount = 0
  ): Promise<T> {
    try {
      const filemakerToken = await this.auth.getFileMakerToken(
        this.currentDatabase
      );

      const jwtToken = this.auth.generateToken();
      if (!this.auth.verifyToken(jwtToken)) {
        throw new Error('JWT認証に失敗しました。');
      }

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
        cache: 'no-store',
        credentials: 'include',
      });

      if (!response.ok) {
        let errorMessage = `FileMaker API Error: ${response.status} - ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage += ` - ${
            errorData.messages?.[0]?.message || 'Unknown error'
          }`;
        } catch {
          errorMessage += ' (JSONレスポンスではありません)';
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('FileMaker APIからのレスポンスがJSONではありません');
      }

      const data = await response.json();

      if (data.messages?.[0]?.code === '952' && retryCount < 3) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(`filemaker_token_${this.currentDatabase}`);
        }
        delete this.auth.tokenCache[this.currentDatabase];
        await this.auth.getFileMakerToken(this.currentDatabase);
        return this.request<T>(method, path, body, params, retryCount + 1);
      }

      return data as T;
    } catch (error) {
      throw error;
    }
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
      if (!userData?.fieldData) {
        console.log('findUser: ユーザーデータが見つかりませんでした');
        return null;
      }

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

  public getCurrentDatabase(): string {
    return this.currentDatabase;
  }

  public getFileMakerUrl(): string {
    return this.filemakerUrl;
  }

  public obpost<T extends keyof FMDatabase['Table']>(
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

  public getFetch(): Fetch {
    return this.fetch;
  }

  async createWithImage<T extends keyof FMDatabase['Table']>(
    layoutName: T,
    data: FMDatabase['Table'][T]['create']['fieldData'],
    imageField?: {
      fieldName: string;
      data: string;
      fileName?: string;
    }
  ) {
    const post = this.post(layoutName, { fieldData: data });

    if (imageField?.data) {
      post.object(imageField.fieldName, imageField.data, imageField.fileName);
    }

    return await post.then();
  }

  createWithScriptPDF<T extends keyof FMDatabase['Table']>(
    layoutName: T,
    data: FMDatabase['Table'][T]['create']['fieldData']
  ) {
    return new ScriptPDFBuilder<T>(this, layoutName, data);
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
