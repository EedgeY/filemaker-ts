import Link from 'next/link';

export default function FileMakerPage() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>FileMaker データ</h1>
      <div className='grid gap-4'>
        <Link href='/login'>FileMaker</Link>
      </div>
    </div>
  );
}
