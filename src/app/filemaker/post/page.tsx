import CreateForm from './components/create-form';
import PDFScript from './components/pdf-script';

export default async function PostPage() {
  return (
    <div className='space-y-8 p-4'>
      <h1 className='text-2xl font-bold'>Post Operations</h1>
      <PDFScript />

      <div className='grid md:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-xl font-semibold mb-4'>新規作成</h2>
          <CreateForm />
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-4'>編集</h2>
        </div>
      </div>
    </div>
  );
}
