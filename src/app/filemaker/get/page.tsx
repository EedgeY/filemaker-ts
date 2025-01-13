import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel';
import {
  getSingleRecord,
  getRangeRecords,
  getFields,
  getSortedRecords,
  getDataWithLimit,
  getImages,
} from './action';
import { Suspense } from 'react';

export default async function GetPage() {
  const [
    singleRecord,
    rangeRecords,
    fields,
    sortedRecords,
    limitedRecords,
    images,
  ] = await Promise.all([
    getSingleRecord(),
    getRangeRecords(),
    getFields(),
    getSortedRecords(),
    getDataWithLimit(),
    getImages(),
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='space-y-4 p-4'>
        <h1 className='text-2xl font-bold'>Get Operations</h1>

        <div className='space-y-4'>
          {/* Single Record */}
          <details className='border rounded-md p-4'>
            <summary className='font-medium cursor-pointer'>
              1. 単一レコード取得 (single)
            </summary>
            <div className='mt-2 space-y-2'>
              <pre className='bg-gray-100 p-2 rounded-md'>
                <code>{`await client.get('blog').single('1').then()`}</code>
              </pre>
              <details>
                <summary className='text-sm text-gray-600 cursor-pointer'>
                  レスポンスを見る
                </summary>
                <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                  <code>{JSON.stringify(singleRecord, null, 2)}</code>
                </pre>
              </details>
            </div>
          </details>

          {/* Range Records */}
          <details className='border rounded-md p-4'>
            <summary className='font-medium cursor-pointer'>
              2. 範囲指定でレコード取得 (range)
            </summary>
            <div className='mt-2 space-y-2'>
              <pre className='bg-gray-100 p-2 rounded-md'>
                <code>{`await client.get('blog').range(1, 3).then()`}</code>
              </pre>
              <details>
                <summary className='text-sm text-gray-600 cursor-pointer'>
                  レスポンスを見る
                </summary>
                <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                  <code>{JSON.stringify(rangeRecords, null, 2)}</code>
                </pre>
              </details>
            </div>
          </details>

          {/* Fields */}
          <details className='border rounded-md p-4'>
            <summary className='font-medium cursor-pointer'>
              3. フィールド情報取得 (fields)
            </summary>
            <div className='mt-2 space-y-2'>
              <pre className='bg-gray-100 p-2 rounded-md'>
                <code>{`await client.get('blog').fields().then()`}</code>
              </pre>
              <details>
                <summary className='text-sm text-gray-600 cursor-pointer'>
                  レスポンスを見る
                </summary>
                <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                  <code>{JSON.stringify(fields, null, 2)}</code>
                </pre>
              </details>
            </div>
          </details>

          {/* Sorted Records */}
          <details className='border rounded-md p-4'>
            <summary className='font-medium cursor-pointer'>
              4. ソート指定でレコード取得 (sort)
            </summary>
            <div className='mt-2 space-y-2'>
              <pre className='bg-gray-100 p-2 rounded-md'>
                <code>{`await client.get('blog').sort({ fieldName: 'id', sortOrder: 'ascend' }).then()`}</code>
              </pre>
              <details>
                <summary className='text-sm text-gray-600 cursor-pointer'>
                  レスポンスを見る
                </summary>
                <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                  <code>{JSON.stringify(sortedRecords, null, 2)}</code>
                </pre>
              </details>
            </div>
          </details>

          {/* Limited Records */}
          <details className='border rounded-md p-4'>
            <summary className='font-medium cursor-pointer'>
              5. レコード数制限 (range)
            </summary>
            <div className='mt-2 space-y-2'>
              <pre className='bg-gray-100 p-2 rounded-md'>
                <code>{`await client.get('blog').range(1, 5).then()`}</code>
              </pre>
              <details>
                <summary className='text-sm text-gray-600 cursor-pointer'>
                  レスポンスを見る
                </summary>
                <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                  <code>{JSON.stringify(limitedRecords, null, 2)}</code>
                </pre>
              </details>
            </div>
          </details>
        </div>
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold'>画像取得</h2>
          <ThreeDPhotoCarousel images={Array.isArray(images) ? images : []} />
        </div>
      </div>
    </Suspense>
  );
}
