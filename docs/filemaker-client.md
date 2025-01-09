# FileMakerClient 使用ガイド

FileMakerClient は、FileMaker Data API を簡単に利用するための TypeScript クライアントライブラリです。

## セットアップ

### 環境変数の設定

```env
NEXT_PUBLIC_FILEMAKER_HOST_URL=https://your-filemaker-server.com/fmi/data/vLatest
NEXT_PUBLIC_FILEMAKER_DATABASE_NAME=your_database_name

# FileMaker認証情報
FILEMAKER_USERNAME=your_username
FILEMAKER_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

### クライアントの初期化

```typescript
import { createFileMakerClient } from '@/lib/filemaker/FileMakerClient';
import { FileMakerAuth } from '@/lib/filemaker/FileMakerAuth';

// FileMakerAuthの初期化
const auth = new FileMakerAuth({
  username: process.env.FILEMAKER_USERNAME!, // FileMakerのユーザー名
  password: process.env.FILEMAKER_PASSWORD!, // FileMakerのパスワード
  jwtSecret: process.env.JWT_SECRET!, // JWTトークンの署名に使用する秘密鍵
  tokenExpiration: '1h', // トークンの有効期限（オプション、デフォルト: '1h'）
});

const client = createFileMakerClient({ auth });
```

FileMakerAuth には以下のオプションが必要です：

- `username`: FileMaker サーバーのユーザー名
- `password`: FileMaker サーバーのパスワード
- `jwtSecret`: JWT トークンの署名に使用する秘密鍵（セキュリティのため、環境変数から読み込むことを推奨）
- `tokenExpiration`: トークンの有効期限（オプション）
  - 例: '1h'（1 時間）, '1d'（1 日）, '7d'（7 日）
  - デフォルト値: '1h'

セキュリティのベストプラクティス：

1. 認証情報は必ず環境変数から読み込む
2. 本番環境では強力なパスワードと JWT 秘密鍵を使用する
3. トークンの有効期限は必要最小限に設定する

## 基本的な使用方法

### レコードの取得

```typescript
// 単一レコードの取得
const result = await client.get('レイアウト名').single('レコードID');

// 複数レコードの取得
const records = await client.get('レイアウト名');

// ソート条件付きで取得
const sortedRecords = await client
  .get('レイアウト名')
  .sort('フィールド名', 'ascend')
  .range(1, 100); // 開始位置と取得件数を指定

// 複数のソート条件
const multiSortedRecords = await client.get('レイアウト名').sort([
  { fieldName: 'フィールド1', sortOrder: 'ascend' },
  { fieldName: 'フィールド2', sortOrder: 'descend' },
]);
```

### レコードの検索

```typescript
// 完全一致検索
const searchResult = await client.find('レイアウト名').eq({ field: 'value' });

// ソート条件付き検索
const sortedSearchResult = await client
  .find('レイアウト名')
  .sort({ fieldName: 'フィールド名', sortOrder: 'ascend' })
  .eq({ field: 'value' });
```

### レコードの作成

```typescript
const newRecord = await client.post('レイアウト名', {
  fieldData: {
    field1: 'value1',
    field2: 'value2',
  },
});

// スクリプトを実行しながらレコードを作成
const recordWithScript = await client
  .post('レイアウト名', {
    fieldData: {
      /* ... */
    },
  })
  .script('スクリプト名', { param1: 'value1' })
  .dateformat(2); // ISO 8601形式を使用
```

## レスポンス型

### データ取得時のレスポンス

```typescript
interface FileMakerDataResponse<T> {
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
  messages: Array<{
    code: string;
    message: string;
  }>;
}
```

### レコード作成・更新時のレスポンス

```typescript
interface FileMakerModifyResponse {
  response: {
    recordId?: string;
    modId?: string;
  };
  messages: Array<{
    code: string;
    message: string;
  }>;
}
```

## エラーハンドリング

```typescript
try {
  const result = await client.get('レイアウト名').single('レコードID');
  if (result.error) {
    console.error('エラーが発生しました:', result.error);
    return;
  }

  // 正常にデータを取得できた場合の処理
  const record = result.data;
} catch (error) {
  console.error('予期せぬエラーが発生しました:', error);
}
```

## 日付フォーマット

dateformat オプションで日付の形式を指定できます：

- `0`: 米国形式
- `1`: ファイルロケール形式
- `2`: ISO 8601 形式

```typescript
const record = await client.post('レイアウト名', data).dateformat(2);
```

## スクリプトの実行

レコード操作時に同時に FileMaker スクリプトを実行できます：

```typescript
const result = await client
  .post('レイアウト名', data)
  .script('メインスクリプト', { param: 'value' })
  .scriptPreRequest('前処理スクリプト')
  .scriptPreSort('ソート前スクリプト');
```

## 型安全性

このクライアントは TypeScript で書かれており、FileMaker のレイアウトやフィールドに対して型安全な操作を提供します。スキーマ型を定義することで、コンパイル時にエラーを検出できます。

```typescript
// スキーマの例
interface FMDatabase {
  Table: {
    Users: {
      id: number;
      name: string;
      email: string;
    };
    // 他のテーブル定義...
  };
}
```

## ベストプラクティス

1. 環境変数を適切に設定する
2. エラーハンドリングを適切に行う
3. 大量のレコードを取得する場合は`range()`を使用してページネーションを実装する
4. 機密情報は適切に管理する
5. スクリプトパラメータは型安全に定義する
