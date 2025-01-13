import { basicFind, rangedFind, sortedFind } from './action';

export default async function FindPage() {
  const [basicFindData, sortedFindData, rangedFindData] = await Promise.all([
    basicFind(),
    sortedFind(),
    rangedFind(),
  ]);

  return (
    <div className='space-y-4 p-4'>
      <h1 className='text-2xl font-bold'>Get Operations</h1>

      <div className='space-y-4'>
        {/* Single Record */}

        {/* 条件検索 */}
        <details className='border rounded-md p-4'>
          <summary className='font-medium cursor-pointer'>
            1. 条件検索 (find)
          </summary>
          <div className='mt-2 space-y-2'>
            <pre className='bg-gray-100 p-2 rounded-md'>
              <code>{`await client.find('blog').eq({ title: 'F' }).then()`}</code>
            </pre>
            <details>
              <summary className='text-sm text-gray-600 cursor-pointer'>
                レスポンスを見る
              </summary>
              <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                <code>{JSON.stringify(basicFindData, null, 2)}</code>
              </pre>
            </details>
          </div>
        </details>

        {/* ソート検索 */}
        <details className='border rounded-md p-4'>
          <summary className='font-medium cursor-pointer'>
            2. ソート検索 (find)
          </summary>
          <div className='mt-2 space-y-2'>
            <pre className='bg-gray-100 p-2 rounded-md'>
              <code>{`await client.find('blog').sort({ fieldName: 'id', sortOrder: 'descend' }).then()`}</code>
            </pre>
            <details>
              <summary className='text-sm text-gray-600 cursor-pointer'>
                レスポンスを見る
              </summary>
              <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                <code>{JSON.stringify(sortedFindData, null, 2)}</code>
              </pre>
            </details>
          </div>
        </details>

        {/* 範囲検索 */}
        <details className='border rounded-md p-4'>
          <summary className='font-medium cursor-pointer'>
            3. 範囲検索 (find)
          </summary>
          <div className='mt-2 space-y-2'>
            <pre className='bg-gray-100 p-2 rounded-md'>
              <code>{`await client.find(layoutName).eq({ title: 'F' }).limit(3).offset(1).then();`}</code>
            </pre>
            <details>
              <summary className='text-sm text-gray-600 cursor-pointer'>
                レスポンスを見る
              </summary>
              <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                <code>{JSON.stringify(rangedFindData, null, 2)}</code>
              </pre>
            </details>
          </div>
        </details>
      </div>
    </div>
  );
}
