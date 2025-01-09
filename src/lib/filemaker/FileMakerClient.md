# FileMakerClient

FileMaker データベースとやり取りするための TypeScript クライアントライブラリです。

## 主要なクラスとインターフェース

### FileMakerClient クラス

FileMaker データベースとの接続と操作を行うメインクラスです。

```typescript
export default class FileMakerClient<Database = FMDatabase> {
  constructor(
    token: string,
    options?: FileMakerClientOptions<string & keyof Database>
  );

  public async get(path: string);
  public async post(path: string, body?: any);
  public async patch(path: string, body: any);
  public async delete(path: string);

  db<TableName extends string & keyof Database>(
    dbName: string
  ): {
    get: (layoutName: FMLayoutName) => GetBuilder<Database[TableName]>;
    find: (layoutName: FMLayoutName) => QueryBuilder<Database[TableName]>;
    post: (
      layoutName: FMLayoutName,
      data: Record<string, any>
    ) => PostBuilder<Database[TableName]>;
    update: (
      layoutName: FMLayoutName,
      recordId: string,
      data: Record<string, any>
    ) => Promise<any>;
    copy: (layoutName: FMLayoutName, recordId: string) => Promise<any>;
    delete: (layoutName: FMLayoutName, recordId: string) => Promise<any>;
  };
}
```

### QueryBuilder クラス

データ検索用のビルダークラスです。

```typescript
class QueryBuilder<T, D = any> {
  constructor(client: FileMakerClient<D>, dbName: string, layoutName: string);

  sort(sorts: SortOption[] | SortOption): this;
  async eq(conditions: Record<string, any>): Promise<{ data: T[] }>;
}
```

### GetBuilder クラス

データ取得用のビルダークラスです。

```typescript
class GetBuilder<T, D = any> {
  constructor(client: FileMakerClient<D>, dbName: string, layoutName: string);

  sort(
    sorts: string | PartialSortOption | (string | PartialSortOption)[],
    sortOrder?: 'ascend' | 'descend'
  ): this;
  range(start: number, limit: number): this;
  async single(
    recordId: string
  ): Promise<{ data: T | null; error: Error | null }>;
  async then(
    resolve: (value: { data: T[] | null; error: Error | null }) => void
  );
}
```

### PostBuilder クラス

データ登録用のビルダークラスです。

```typescript
class PostBuilder<T, D = FMDatabase> {
  constructor(
    client: FileMakerClient<D>,
    dbName: string,
    layoutName: string,
    data: Record<string, any>
  );

  script(name: FMScriptName, param?: string | Record<string, any>): this;
  scriptPreRequest(
    name: FMScriptName,
    param?: string | Record<string, any>
  ): this;
  scriptPreSort(name: FMScriptName, param?: string | Record<string, any>): this;
  dateformat(format: 0 | 1 | 2): this;
  async then(resolve: (value: { data: T | null; error: Error | null }) => void);
}
```

## 使用例

### クライアントの初期化

```typescript
const filemaker = await createToken('database-name');
```

### データの取得

```typescript
const { data, error } = await filemaker
  .db('database-name')
  .get('your-layout')
  .sort('fieldName', 'ascend')
  .range(0, 10)
  .then();
```

### データの検索

```typescript
const { data, error } = await filemaker
  .db('database-name')
  .find('your-layout')
  .sort([{ fieldName: 'field1', sortOrder: 'ascend' }])
  .eq({ fieldName: 'value' });
```

### データの登録

```typescript
await filemaker
  .db('database-name')
  .post('your-layout', { field1: 'value1', field2: 'value2' })
  .script('your-script', { param1: 'value1' });
```

## 注意点

- `getToken('database-name')`でトークンを取得してから使用します
