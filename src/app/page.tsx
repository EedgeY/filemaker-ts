import { GradientButton } from '@/components/ui/gradient-button';
import { Iphone16Pro } from '@/components/ui/iphone-16-pro';
import Link from 'next/link';

export default function FileMakerPage() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>FileMaker データ</h1>
      <div className='grid gap-4'>
        <GradientButton asChild variant='variant'>
          <Link href='/login'>FileMaker</Link>
        </GradientButton>
        <Iphone16Pro />
      </div>
    </div>
  );
}
