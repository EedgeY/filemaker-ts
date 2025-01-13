'use client';

import { useState } from 'react';
import { createRecord } from '../action';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface FormData {
  title: string;
  content: string;
  image: string | null;
  creator_pk: string;
  id: number;
}

export default function CreateForm() {
  const randomId = Math.floor(Math.random() * 1000000);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    image: '',
    creator_pk: '',
    id: randomId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRecord(formData);

      alert('作成しました');
    } catch (error) {
      console.error('送信エラー:', error);
      alert('作成に失敗しました');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file') {
      const file = e.target.files?.[0];
      if (file) {
        // FileをBase64に変換
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        setFormData({ ...formData, image: base64 });
      }
    } else {
      setFormData({ ...formData, image: e.target.value });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label htmlFor='title' className='block mb-1'>
          タイトル
        </label>
        <input
          type='text'
          id='title'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <div>
        <label htmlFor='content' className='block mb-1'>
          内容
        </label>
        <textarea
          id='content'
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className='w-full p-2 border rounded'
          rows={4}
          required
        />
      </div>

      <div className='space-y-2'>
        <label className='block mb-1'>画像</label>
        <div className='space-y-4'>
          {formData.image && typeof formData.image === 'string' && (
            <div>
              {/* fileの画像を表示 */}
              <Image
                src={formData.image ?? ''}
                alt='image'
                width={500}
                height={500}
              />
            </div>
          )}

          <div>
            <Input
              type='file'
              id='imageFile'
              accept='image/*'
              onChange={handleImageChange}
              className='w-full p-2 border rounded'
            />
          </div>
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
    >
      {pending ? '作成中...' : '作成'}
    </button>
  );
}
