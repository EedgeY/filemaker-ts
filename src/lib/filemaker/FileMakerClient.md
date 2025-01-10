# FileMakerClient

FileMaker の Data API を使用するための TypeScript クライアントライブラリです。

## 基本的な使い方

```typescript
import { createFileMakerClient } from '@/lib/filemaker/FileMakerClient';
import { FileMakerAuth } from '@/lib/filemaker/FileMakerAuth';

// FileMakerAuthインスタンスの作成
const auth = new FileMakerAuth();

// クライアントの作成
const client = createFileMakerClient({ auth });
```

## データの取得

### 単一レコードの取得

```typescript
// users レイアウトから特定のレコードを取得
const { data, error } = await client.get('users').single('record_id');

if (data) {
  console.log(data.fieldData.name); // string | null
  console.log(data.fieldData.farm_id); // number | null
  console.log(data.fieldData.hidden); // number | null
}
```

### 複数レコードの取得

```typescript
// farm レイアウトから全てのレコードを取得
const response = await client.get('farm');
const farms = response.response.data;

// ソート条件を指定して取得
const sortedFarms = await client.get('farm').sort('farm_name', 'ascend');

// 複数のソート条件を指定
const multiSortedFarms = await client.get('farm').sort([
  { fieldName: 'farm_name', sortOrder: 'ascend' },
  { fieldName: 'farm_id', sortOrder: 'descend' },
]);

// 取得件数を制限して取得
const limitedFarms = await client.get('farm').range(0, 10);
```

### 条件付き検索

```typescript
// users レイアウトから条件に一致するレコードを検索
const users = await client.find('users').eq({
  farm_id: 1,
  hidden: 0,
});

// breeding レイアウトから条件に一致するレコードを検索
const breedings = await client.find('breeding').eq({
  owner_id: 1,
  state: 'active',
});
```

## データの作成・更新・削除

### レコードの作成

```typescript
// users レイアウトに新しいレコードを作成
const newUser = await client.post('users', {
  name: 'John Doe',
  farm_id: 1,
  role: 'user',
  hidden: 0,
});

// farm レイアウトに新しいレコードを作成
const newFarm = await client.post('farm', {
  farm_name: 'Sample Farm',
  owner_name: 'John Doe',
  farm_code: 'FARM001',
});
```

### レコードの更新

```typescript
// users レイアウトのレコードを更新
const updatedUser = await client.db().update('users', 'record_id', {
  name: 'Jane Doe',
  role: 'admin',
});

// farm レイアウトのレコードを更新
const updatedFarm = await client.db().update('farm', 'record_id', {
  farm_name: 'Updated Farm Name',
  owner_name: 'Jane Doe',
});
```

### レコードの削除

```typescript
// users レイアウトのレコードを削除
await client.db().delete('users', 'record_id');

// farm レイアウトのレコードを削除
await client.db().delete('farm', 'record_id');
```

### レコードのコピー

```typescript
// users レイアウトのレコードをコピー
const copiedUser = await client.db().copy('users', 'record_id');

// farm レイアウトのレコードをコピー
const copiedFarm = await client.db().copy('farm', 'record_id');
```

## スクリプトの実行

PostBuilder を使用してスクリプトを実行できます：

```typescript
// レコード作成時にスクリプトを実行
const result = await client
  .post('users', { name: 'John Doe' })
  .script('アカウント制御')
  .scriptPreRequest('_アカウント登録')
  .scriptPreSort('test');
```

## 日付フォーマットの指定

```typescript
// 日付フォーマットを指定してレコードを作成
const result = await client
  .post('users', { created_at: '2024-01-01' })
  .dateformat(1);
```

## エラーハンドリング

```typescript
try {
  const result = await client.get('users');
  if (result.messages[0].code !== '0') {
    console.error('FileMaker API エラー:', result.messages[0].message);
    return;
  }
  // 正常系の処理
} catch (error) {
  console.error('リクエストエラー:', error);
}
```

## 型の利用

このクライアントは`FMDatabase`型を使用して、各レイアウトのフィールド構造を定義しています。
これにより、TypeScript の型チェックを活用して、安全なデータアクセスが可能になります。

```typescript
// 型安全なフィールドアクセス
const users = await client.get('users');
const user = users.response.data?.[0];

if (user) {
  const name: string | null = user.fieldData.name;
  const farmId: number | null = user.fieldData.farm_id;
  const hidden: number | null = user.fieldData.hidden;
}
```

## データベースの切り替え

```typescript
// 別のデータベースを使用
const otherDb = client.db('other_database');

// 別データベースからのデータ取得
const result = await otherDb.get('users');
```
