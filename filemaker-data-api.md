FileMaker Data API 呼び出しの作成
FileMaker Data API 呼び出しは次のコンポーネントで構成されます。

コンポーネント

説明

HTTP メソッド (HTTP 動詞)

FileMaker Data API は次の HTTP メソッドを使用します:

POST

データベースセッションへのログイン、レコードの作成、レコードの複製、検索の実行、およびオブジェクトデータのアップロードで使用します。

GET

単一のレコードの取得、レコードの範囲の取得、メタデータの取得、およびスクリプトの実行で使用します。

PATCH

レコードの編集およびグローバルフィールドの値の設定で使用します。

DELETE

データベースセッションからのログアウトおよびレコードの削除で使用します。

メモ FileMaker Data API は CORS (Cross-Origin Resource Sharing) および OPTIONS メソッドをサポートしていません。

HTTP ヘッダ

FileMaker Data API は次のヘッダを使用します:

Content-Type: application/json

データベースセッションへのログイン、データベースセッションからのログアウト、レコードの作成、レコードの編集、検索の実行、およびグローバルフィールドの値の設定で使用します。

このヘッダでは、値として「application/json」のみを使用できます。このヘッダを使用する HTTP リクエストの場合、FileMaker Data API ではコンテンツが JSON でエンコードされている必要があります。

Content-Type: multipart/form-data

オブジェクトデータのアップロードで使用します。

このヘッダでは、値として「multipart/form-data」のみを使用できます。

Authorization: session-token

ほとんどの HTTP リクエストで使用します。

アクセストークンの値はセッションへのログイン時に返される固有のセッショントークンです。共有データベースへのアクセスを認証するために必要になります。「データベースセッションへのログイン」を参照してください。

Authorization: FMID {FMID-token}

FileMaker Cloud の共有データベースの HTTP リクエストで使用します。

FMID-token は Claris ID アイデンティティプロバイダシステムで提供される Claris ID トークンです。Claris ID トークンの詳細については、Claris Customer Console ヘルプの「外部認証での Claris ID の使用」を参照してください。

X-FM-Data-OAuth-Request-Id

OAuth アイデンティティプロバイダを使用したデータベースセッションへのログインおよびメタデータの取得で使用します。このヘッダでは、/oauth/getoauthurl URL から返される X-FMS-Request-ID ヘッダの値を指定します。

X-FM-Data-OAuth-Identifier

OAuth アイデンティティプロバイダを使用したデータベースセッションへのログインおよびメタデータの取得で使用します。このヘッダでは、OAuth プロバイダによって返される識別子を指定します。

//
レコードの作成
レコードを作成するには、HTTP POST メソッドを使用してデータベース名とレイアウトを records API エンドポイントで指定します。

HTTP メソッド

POST

URL

/fmi/data/version/databases/database-name/layouts/layout-name/records

version – リクエストされた FileMaker Data API のバージョン。v1、v2、または vLatest のいずれかを使用できます。

database-name – 共有データベースの名前

layout-name – レコード作成のためのコンテキストとして使用するレイアウトの名前

HTTP ヘッダ

Content-Type: application/json

Authorization: Bearer session-token。session-token はデータベースセッションに固有の X-FM-Data-Access-Token の値です。

引数
目的のレイアウト内にあるフィールドに値を指定するフィールド/値ペアが含まれた JSON 形式のレコードデータ。portalData の指定を使用してレイアウト上にある関連レコードまたはポータルをこのデータで指定することもできます。FileMaker Pro のインスペクタに表示されるオブジェクト名か、関連テーブル名のいずれかをポータル名にすることができます。

例:

{
"fieldData": {
"文字列フィールド": "値 1",
"数字フィールド": 99.99,
"繰り返しフィールド (1)": "フィールド値",
"日付フィールド": "2029/1/20"
}
"options" : {
"entrymode": "script",
"prohibitmode": "script"
},
"dateformats": 2
}
各フィールドのデフォルト値が空のレコードを作成するには、引数として空のデータオブジェクトを JSON 形式で指定します。その他のオプションのリクエストボディの引数は次のとおりです:

例:

{
"fieldData": { }
}
その他のオプションのリクエストボディの引数:

options - データを書き込むとき、これらのオプションで次を制御できます:

entrymode - フィールドに [データの入力時にユーザによる上書きを許可する] 入力値の制限オプションが選択されているかどうかを無視して代わりにこのオプションを使用します。値「script」はフィールドのデータ入力値の制限の要件を無視します (スクリプトがこれらの要件を無視するためにこのように名付けられました)。値「user」 (デフォルト) はフィールドの入力値の制限の要件に従います。

prohibitmode - フィールドに [データ入力時の値変更の禁止] 入力値の自動化オプションが選択されているかどうかを無視して代わりにこのオプションを使用します。値「script」はフィールドの入力値の自動化の要件を無視します (スクリプトがこれらの要件を無視するためにこのように名付けられました)。値「user」 (デフォルト) はフィールドの入力値の自動化の要件に従います。

dateformats - 日付およびタイムスタンプフィールドの形式を指定します。米国形式の場合は値が 0、ファイルロケールの形式の場合は 1、ISO 8601 形式の場合は 2 です。指定されていない場合、デフォルト値は 0 です。

script.prerequest、script.presort、script - リクエストの一部として FileMaker スクリプトを実行します。「別のリクエストによるスクリプトの実行」を参照してください。

応答
作成されたレコードのレコード ID、およびエラーコード 0 を表示するメッセージ配列。

例:

{
"response": {
"recordId":"147",
"modId":"0"
},
"messages": [
{
"code": "0",
"message":"OK"
}
]
}
「エラー応答」を参照してください。

//
レコードの編集
レコードを編集するには、HTTP PATCH メソッドを使用してデータベース名、レイアウト、およびレコード ID を records API エンドポイントで指定します。

HTTP メソッド

PATCH

URL

/fmi/data/version/databases/database-name/layouts/layout-name/records/record-id

version – リクエストされた FileMaker Data API のバージョン。v1、v2、または vLatest のいずれかを使用できます。

database-name – 共有データベースの名前

layout-name – レコード編集のためのコンテキストとして使用するレイアウトの名前

record-id – 編集するレコードのレコード ID

HTTP ヘッダ

Content-Type: application/json

Authorization: Bearer session-token。session-token はデータベースセッションに固有の X-FM-Data-Access-Token の値です。

引数

更新するフィールド/値ペアが含まれた JSON 形式のレコードデータ。portalData の指定を使用してレイアウト上にある関連レコードまたはポータルをこのデータで指定することもできます。FileMaker Pro のインスペクタに表示されるオブジェクト名か、関連テーブル名のいずれかをポータル名にすることができます。

指定したフィールドのみが更新されます。レコード内の他のフィールドは変更されません。fieldData の値として「{}」を指定した場合、目的のレコードは更新されません。

例:

{
"fieldData": {
"First Name": "Joe",
"deleteRelated": "Orders.3",
"Date Field": "2029/1/20"
},
"portalData": {
"JobsTable": [
{
"recordId": "70",
"modId": "4",
"JobsTable::Name": "Contractor"
}
]
},
"options": {
"entrymode": "script",
"prohibitmode": "script"
},
"dateformats": 2
}
その他のオプションのリクエストボディの引数:

modId - 修正 ID を指定すると現在のバージョンのレコードを編集することができます。修正 ID の値がデータベース内の現在の修正 ID と一致しない場合、レコードは変更されません。

options - データを書き込むとき、これらのオプションで次を制御できます:

entrymode - フィールドに [データの入力時にユーザによる上書きを許可する] 入力値の制限オプションが選択されているかどうかを無視して代わりにこのオプションを使用します。値「script」はフィールドのデータ入力値の制限の要件を無視します (スクリプトがこれらの要件を無視するためにこのように名付けられました)。値「user」 (デフォルト) はフィールドの入力値の制限の要件に従います。

prohibitmode - フィールドに [データ入力時の値変更の禁止] 入力値の自動化オプションが選択されているかどうかを無視して代わりにこのオプションを使用します。値「script」はフィールドの入力値の自動化の要件を無視します (スクリプトがこれらの要件を無視するためにこのように名付けられました)。値「user」 (デフォルト) はフィールドの入力値の自動化の要件に従います。

dateformats - 日付およびタイムスタンプフィールドの形式を指定します。米国形式の場合は値が 0、ファイルロケールの形式の場合は 1、ISO 8601 形式の場合は 2 です。指定されていない場合、デフォルト値は 0 です。

script.prerequest、script.presort、script - リクエストの一部として FileMaker スクリプトを実行します。「別のリクエストによるスクリプトの実行」を参照してください。

応答
応答のボディ、およびエラーコード 0 を表示するメッセージ配列。

例:

{
"response": {
"modId": "3"
},
"messages": [
{
"code": "0",
"message": "OK"
}
]
}
「エラー応答」を参照してください。

メモ
FileMaker Data API を使用してレコードを編集する際は (上記 entrymode オプションで上書きされない限り) フィールドの入力値の制限がデフォルトで強制されます。フィールドの入力値の制限が強制されていてデータがフィールドの入力値の制限を満たしていない場合、エラーメッセージが返されてレコードは更新されません。

関連レコードを削除するには、deleteRelated 構文を使用できます。

ID が「3」の 1 つのレコードを関連テーブル「Orders」から削除する場合:

"deleteRelated" : "Orders.3"

ID が「7」および「9」のすべてのレコードを関連テーブル「Orders」から削除する場合:

"deleteRelated" : ["Orders.7", "Orders.9"]

//

レコードの複製
レコードを複製するには、HTTP POST メソッドを使用してデータベース名、レイアウト名、およびレコード ID を records API エンドポイントで指定します。

HTTP メソッド

POST

URL

/fmi/data/version/databases/database-name/layouts/layout-name/records/record-id

version – リクエストされた FileMaker Data API のバージョン。v1、v2、または vLatest のいずれかを使用できます。

database-name – 共有データベースの名前

layout-name – レコード編集のためのコンテキストとして使用するレイアウトの名前

record-id – 編集するレコードのレコード ID

HTTP ヘッダ

Content-Type: application/json

Authorization: Bearer session-token。session-token はデータベースセッションに固有の X-FM-Data-Access-Token の値です。

引数
オプションのリクエストボディの引数:

script.prerequest、script.presort、script - リクエストの一部として FileMaker スクリプトを実行します。「別のリクエストによるスクリプトの実行」を参照してください。

応答
新規レコードのレコード ID、およびエラーコード 0 を表示するメッセージ配列。

例:

{
"response": {
"recordId": "7",
"modId": "0"
},
"messages": [
{
"code": "0",
"message": "OK"
}
]
}
「エラー応答」を参照してください。

//
レコードの削除
レコードを削除するには、HTTP DELETE メソッドを使用してデータベース名、レイアウト、およびレコード ID を records API エンドポイントで指定します。

HTTP メソッド

DELETE

URL

/fmi/data/version/databases/database-name/layouts/layout-name/records/record-id

version – リクエストされた FileMaker Data API のバージョン。v1、v2、または vLatest のいずれかを使用できます。

database-name – 共有データベースの名前

layout-name – レコード削除のためのコンテキストとして使用するレイアウトの名前

record-id – 削除するレコードのレコード ID

その他のオプションの URL 引数は次のとおりです:

script.prerequest、script.presort、script - リクエストの一部として FileMaker スクリプトを実行します。「別のリクエストによるスクリプトの実行」を参照してください。

HTTP ヘッダ

Authorization: Bearer session-token。session-token はデータベースセッションに固有の X-FM-Data-Access-Token の値です。

引数 なし
応答
空の応答のボディ、およびエラーコード 0 を表示するメッセージ配列。

例:

{
"response": {},
"messages": [
{
"code": "0",
"message": "OK"
}
]
}
「エラー応答」を参照してください。

//
単一のレコードの取得
レコードを取得するには、HTTP GET メソッドを使用してデータベース名、レイアウト、およびレコード ID を records API エンドポイントで指定します。ポータル情報を指定して返される関連レコードの数を制限することもできます。

HTTP メソッド

GET

URL

形式 1: /fmi/data/version/databases/database-name/layouts/layout-name/records/record-id

形式 2: /fmi/data/version/databases/database-name/layouts/layout-name/records/record-id?portal=["portal-name-n", ...] &\_offset.portal-name=starting-record &\_limit.portal-name=number-of-records

version – リクエストされた FileMaker Data API のバージョン。v1、v2、または vLatest のいずれかを使用できます。

バージョン 1 (v1) - 返されるポータルデータの構造は指定されたレイアウトの表示形式 (フォーム形式または表形式) に基づきます。

フォーム形式 - すべての関連レコードを返します

表形式 - 最初の関連レコードを返します

メモ 表示設定を変更すると返される値のポータルデータ構造が変化します。

バージョン 2 (v2) - 返されるポータルデータの構造はフォーム形式に基づきます。

最新バージョン (vLatest) - 動作は API の最新バージョンに基づきます。

database-name – 共有データベースの名前

layout-name – レコード取得のためのコンテキストとして使用するレイアウトの名前

record-id – 取得するレコードのレコード ID

ポータルの場合:

URL の portal 部分はオプションです。portal が省略されてレイアウトにポータルが含まれている場合、呼び出しによってレイアウト上のすべてのポータルから関連レコードが返されます。そのため、ポータルのレイアウト上でのパフォーマンスを向上させるには、portal を使用して関連レコードを取得するポータルのみを指定します。

ポータルで表示できる関連レコードのみが返されます。FileMaker Pro の [ポータル設定] ダイアログボックスの次のオプションにより返されるレコードが変わります:

垂直スクロールを許可 - 選択すると、スクロールして表示できるすべてのレコードが返されます。選択を解除すると、[最初の行] と [行数] の間のレコード数 (スクロールせずに表示されるもの) のみが返されます。

ポータルレコードのフィルタ - 選択すると、フィルタされたレコードのみが返されます。

portal-name-n は関連レコードが含まれているポータルです。FileMaker Pro のインスペクタに表示されるオブジェクト名か、関連テーブル名のいずれかをポータル名にすることができます。複数のポータル名を指定することができます。

\_offset.portal-name-n の場合、starting-record は関連レコードの範囲内で最初のポータルレコードのレコード番号です。指定されていない場合、デフォルト値は 1 です。

\_limit.portal-name-n の場合、返される関連レコードの最大数を number-of-records で指定します。指定されていない場合、デフォルト値は 50 です。

その他のオプションの URL 引数:

layout.response - 異なるレイアウトのコンテキストにある応答データを返します。指定されたレイアウトは現在のレイアウトと同じ基本テーブルである必要があります。異なる基本テーブルのレイアウトを指定すると予期しない結果になる可能性があります。

dateformats - 日付およびタイムスタンプフィールドの形式を指定します。米国形式の場合は値が 0、ファイルロケールの形式の場合は 1、ISO 8601 形式の場合は 2 です。指定されていない場合、デフォルト値は 0 です。

script.prerequest、script.presort、script - リクエストの一部として FileMaker スクリプトを実行します。「別のリクエストによるスクリプトの実行」を参照してください。

HTTP ヘッダ

Authorization: Bearer session-token。session-token はデータベースセッションに固有の X-FM-Data-Access-Token の値です。

引数 なし
応答
JSON 形式のレコードデータおよびエラーコード 0 を表示するメッセージ配列。

例:

{
"response": {
"data": [
...
 ]
},
"messages": [
{
"code": "0",
"message": "OK"
}
]
}
「エラー応答」を参照してください。

//
レコードの範囲の取得
レコードの範囲を取得するには、HTTP GET メソッドを使用してデータベース名、レイアウト、および開始レコードとレコード数を指定する追加情報を records API エンドポイントで指定します。オプションでレコードのソート順を指定できます。ポータル情報を指定して返される関連レコードの数を制限することもできます。

HTTP メソッド

GET

URL

形式 1 (最大で最初の 100 のレコードを返す):
/fmi/data/version/databases/database-name/layouts/layout-name/records

形式 2 (レコードの範囲を返す):
/fmi/data/version/databases/database-name/layouts/layout-name/records?\_offset=starting-record&\_limit=number-of-records

形式 3 (ソートされたレコードの範囲を返す):
/fmi/data/version/databases/database-name/layouts/layout-name/records?\_offset=starting-record&\_limit=number-of-records&\_sort=[{ "fieldName": "field-name", "sortOrder": "sort-order" }, { ... }]

形式 4 (関連レコードの範囲が制限されたレコードの範囲を含む):
/fmi/data/version/databases/database-name/layouts/layout-name/records?\_offset=starting-record&\_limit=number-of-records&portal=["portal-name1", "portal-name2", ...]&\_offset.portal-name1=starting-record&\_limit.portal-name1=number-of-records

version – リクエストされた FileMaker Data API のバージョン。v1、v2、または vLatest のいずれかを使用できます。

バージョン 1 (v1) - 返されるポータルデータの構造は指定されたレイアウトの表示形式 (フォーム形式または表形式) に基づきます。

フォーム形式 - すべての関連レコードを返します

表形式 - 最初の関連レコードを返します

メモ 表示設定を変更すると返される値のポータルデータ構造が変化します。

バージョン 2 (v2) - 返されるポータルデータの構造はフォーム形式に基づきます。

最新バージョン (vLatest) - 動作は API の最新バージョンに基づきます。

database-name – 共有データベースの名前

layout-name – レコード取得のためのコンテキストとして使用するレイアウトの名前

\_offset の場合、starting-record はレコードの範囲内で最初のレコードのレコード番号です。

\_limit の場合、number-of-records で返されるレコードの最大数を指定します。

\_sort の指定では、情報を JSON 形式で指定する必要があります。field-name はレコードのソート基準として使用するフィールドの名前です。複数のフィールド名を指定することができます。sort-order には、ascend または descend キーワードを指定するか、あるいは値一覧の名前を指定します。

ポータルの場合:

URL の portal 部分はオプションです。portal が省略されてレイアウトにポータルが含まれている場合、呼び出しによってレイアウト上のすべてのポータルから関連レコードが返されます。そのため、ポータルのレイアウト上でのパフォーマンスを向上させるには、portal を使用して関連レコードを取得するポータルのみを指定します。

ポータルで表示できる関連レコードのみが返されます。FileMaker Pro の [ポータル設定] ダイアログボックスの次のオプションにより返されるレコードが変わります:

垂直スクロールを許可 - 選択すると、スクロールして表示できるすべてのレコードが返されます。選択を解除すると、[最初の行] と [行数] の間のレコード数 (スクロールせずに表示されるもの) のみが返されます。

ポータルレコードのフィルタ - 選択すると、フィルタされたレコードのみが返されます。

portal-name-n は関連レコードが含まれているポータルです。FileMaker Pro のインスペクタに表示されるオブジェクト名か、関連テーブル名のいずれかをポータル名にすることができます。複数のポータル名を指定することができます。

\_offset.portal-name-n の場合、starting-record は関連レコードの範囲内で最初のポータルレコードのレコード番号です。指定されていない場合、デフォルト値は 1 です。

\_limit.portal-name-n の場合、返される関連レコードの最大数を number-of-records で指定します。指定されていない場合、デフォルト値は 50 です。

その他のオプションの URL 引数:

layout.response - 異なるレイアウトのコンテキストにある応答データを返します。指定されたレイアウトは現在のレイアウトと同じ基本テーブルである必要があります。異なる基本テーブルのレイアウトを指定すると予期しない結果になる可能性があります。

dateformats - 日付およびタイムスタンプフィールドの形式を指定します。米国形式の場合は値が 0、ファイルロケールの形式の場合は 1、ISO 8601 形式の場合は 2 です。指定されていない場合、デフォルト値は 0 です。

script.prerequest、script.presort、script - リクエストの一部として FileMaker スクリプトを実行します。「別のリクエストによるスクリプトの実行」を参照してください。

HTTP ヘッダ

Authorization: Bearer session-token。session-token はデータベースセッションに固有の X-FM-Data-Access-Token の値です。

引数 なし
応答
JSON 形式のレコードデータおよびエラーコード 0 を表示するメッセージ配列。

{
"response": {
"data": [
...
 ]
},
"messages": [{"code":"0","message":"OK"
}
]
}
「エラー応答」を参照してください。

メモ
オプションの引数を使用して除外リクエスト、ソート順 (\_sort)、開始レコード (\_offset)、レコード数 (\_limit)、および返される関連レコード数を制限するためのポータルを指定できます。\_offset、\_limit、および \_sort の引数はレイアウトテーブルのレコードでは機能しますが、非関連ポータルレコードでは機能しません。関連セットで表示するレコードと行の数を制限するには、\_offset.portal-name-n および \_limit.portal-name-n 引数を指定します。

\_offset および \_limit の値を省略した場合、デフォルトのオフセット値 1 とレコードのデフォルトの制限値 100 が使用されます: \_offset=1&\_limit=100

sortOrder キーワードを省略した場合、デフォルトは ascend になります。たとえば、&\_sort=[{ "fieldName": "recordId" }] は次のように処理されます: &\_sort=[{ "fieldName": "recordId", "sortOrder": "ascend" }]

//

オブジェクトデータのアップロード
オブジェクトデータをアップロードするには、HTTP POST メソッドを使用してデータベース名、レイアウト名、レコード ID、フィールド名、およびフィールド繰り返しを containers API エンドポイントで指定します。

HTTP メソッド

POST

URL

形式: /fmi/data/version/databases/database-name/layouts/layout-name/records/record-id/containers/field-name/field-repetition

version – リクエストされた FileMaker Data API のバージョン。v1、v2、または vLatest のいずれかを使用できます。

database-name – 共有データベースの名前

layout-name – レコード取得のためのコンテキストとして使用するレイアウトの名前

record-id – レコードのレコード ID

field-name – オブジェクトフィールドの名前

field-repetition – 繰り返しフィールドの特定の繰り返し

その他のオプションの URL 引数:

modId - 修正 ID を指定すると現在のバージョンのレコードを編集することができます。修正 ID の値がデータベース内の現在の修正 ID と一致しない場合、レコードは変更されません。

HTTP ヘッダ

Content-Type: multipart/form-data

Authorization: Bearer session-token。session-token はデータベースセッションに固有の X-FM-Data-Access-Token の値です。

引数
オブジェクトフィールドのオブジェクトが name="upload" の一部として定義されているマルチパート MIME データストリーム (Content-Type: multipart/form-data)。upload という名前の部分のみが FileMaker Data API で処理されます。その他のすべての部分は無視されます。

multipart/form-data の指定をサポートするライブラリを使用してください。

応答
空の応答のボディ、およびエラーコード 0 を表示するメッセージ配列。

例:

{
"response": {},
"messages": [
{
"code": "0",
"message": "OK"
}
]
}
「エラー応答」を参照してください。

メモ
オブジェクトフィールドは指定されたレイアウトのテーブルオカレンスにあるフィールドである必要があります。関連テーブル内のオブジェクトフィールドを指定することはできません。

範囲の引数を含めて multipart/form-data を指定して、Content-Type ヘッダを適切に設定する必要があります。

FileMaker Data API はすべての MIME タイプを許可します。MIME タイプを FileMaker ソフトウェアまたは Web サーバーでサポートされるタイプに制限するためのチェックは実行されません。

FileMaker Data API では、オブジェクトフィールドデータがアップロードされている場合、プライマリマシン上のキャッシュフォルダにそのオブジェクトフィールドデータをキャッシュしますが、リクエストが完了するとキャッシュデータは削除されます。

//
検索の実行
検索を実行するには、HTTP POST メソッドを使用してデータベース名およびレイアウトと、クエリーフィールド、クエリー条件、ソート順、開始レコード、およびレコード数を指定する追加情報を \_find API エンドポイントで指定します。ポータル情報を指定して返される関連レコードの数を制限することもできます。

HTTP メソッド

POST

URL

/fmi/data/version/databases/database-name/layouts/layout-name/\_find

version – リクエストされた FileMaker Data API のバージョン。v1、v2、または vLatest のいずれかを使用できます。

バージョン 1 (v1) - 返されるポータルデータの構造は指定されたレイアウトの表示形式 (フォーム形式または表形式) に基づきます。

フォーム形式 - すべての関連レコードを返します

表形式 - 最初の関連レコードを返します

メモ 表示設定を変更すると返される値のポータルデータ構造が変化します。

バージョン 2 (v2) - 返されるポータルデータの構造はフォーム形式に基づきます。

最新バージョン (vLatest) - 動作は API の最新バージョンに基づきます。

database-name – 共有データベースの名前

layout-name – 検索条件のコンテキストとして使用するレイアウト

HTTP ヘッダ

Content-Type: application/json

Authorization: Bearer session-token。session-token はデータベースセッションに固有の X-FM-Data-Access-Token の値です。

引数
フィールドおよび検索条件を指定する JSON 形式のクエリー。オプションの引数を使用して除外リクエスト (omit)、ソート順 (sort)、開始レコード (offset)、レコード数 (limit)、および返される関連レコード数を制限するためのポータル (portal) を指定できます。offset、limit、および sort の引数はレイアウトテーブルのレコードでは機能しますが、非関連ポータルレコードでは機能しません。関連セットで表示するレコードと行の数を制限するには、offset.portal-name および limit.portal-name 引数を指定します。

例:

{
"query": [
{"Group": "=Surgeon"},
{"Work State" : "NY", "omit" : "true"}
],
"sort": [
{"fieldName": "Work State", "sortOrder": "ascend"},
{"fieldName": "First Name", "sortOrder": "ascend"}
]
}
オフセット、制限、およびポータルの使用例:

{
"query": [
{"Group": "=Surgeon"},
{"Work State": "NY", "omit" : "true"}
],
"portal": ["Portal1","Portal2"],
"limit": "10",
"offset": "1",
"offset.Portal1": "1",
"limit.Portal1": "5",
"layout.response": "Doctors"
}
その他のオプションのリクエストボディの引数:

layout.response - 異なるレイアウトのコンテキストにある応答データを返します。指定されたレイアウトは現在のレイアウトと同じ基本テーブルである必要があります。異なる基本テーブルのレイアウトを指定すると予期しない結果になる可能性があります。

dateformats - 日付およびタイムスタンプフィールドの形式を指定します。米国形式の場合は値が 0、ファイルロケールの形式の場合は 1、ISO 8601 形式の場合は 2 です。指定されていない場合、デフォルト値は 0 です。

script.prerequest、script.presort、script - リクエストの一部として FileMaker スクリプトを実行します。「別のリクエストによるスクリプトの実行」を参照してください。

応答
JSON 形式のレコードデータおよびエラーコード 0 を表示するメッセージ配列。

例:

{
"response": {
"data": [
...
 ]
},
"messages": [
{
"code": "0",
"message": "OK"
}
]
}
「エラー応答」を参照してください。

メモ
クエリーの検索条件については、FileMaker Pro の検索条件と同じ検索演算子 (単語全体が一致する場合は「=」など) を使用します。FileMaker Pro ヘルプの「レコード内のテキストの検索」、「数字、日付、時刻、およびタイムスタンプの検索」、「特定の範囲に一致する情報の検索」、および「空白、または空白ではないフィールドの検索」を参照してください。

レコードをソートして返すと時間がかかる可能性があります。リクエストされたレイアウトのフィールドの数を制限、およびコメントを含むフィールドを除外するとレコードのダウンロード時間を短縮できます。

検索条件としてグローバルフィールドを指定することはできません。検索条件でグローバルフィールドを指定すると、エラーメッセージが返されます。代わりに、検索条件の前にグローバルフィールドの値を設定してください。「グローバルフィールドの値の設定」を参照してください。
