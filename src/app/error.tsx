'use client';

export default function Error({}: { error: Error & { digest?: string } }) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='text-center space-y-4'>
        <h2 className='text-2xl font-bold text-red-600'>
          エラーが発生しました
        </h2>
        <p className='text-gray-600'>
          申し訳ありません。予期せぬエラーが発生しました。
          <br />
          リロードしてください。
        </p>
      </div>
    </div>
  );
}
