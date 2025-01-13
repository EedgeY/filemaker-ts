import Link from 'next/link';

export default function FileMakerPage() {
  return (
    <div className='space-y-4 p-4'>
      <h1 className='text-2xl font-bold'>FileMaker Operations</h1>
      <div className='flex flex-col space-y-2'>
        <Link
          href='/filemaker/get'
          className='text-blue-500 hover:text-blue-700'
        >
          Get Operations
        </Link>
        <Link
          href='/filemaker/find'
          className='text-blue-500 hover:text-blue-700'
        >
          Find Operations
        </Link>
        <Link
          href='/filemaker/post'
          className='text-blue-500 hover:text-blue-700'
        >
          Post Operations
        </Link>
      </div>
    </div>
  );
}
