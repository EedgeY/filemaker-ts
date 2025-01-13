'use client';

import { useState, useEffect } from 'react';
import { updateRecord } from '../action';
import { useFormStatus } from 'react-dom';
import { FMDatabase } from '@/types/filemaker/schema';

export default function EditForm({
  data,
}: {
  data: FMDatabase['Table']['blog']['update'];
}) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateRecord(data.recordId, {
      title: formData.fieldData.title,
      content: formData.fieldData.content,
      image: formData.fieldData.image,
      creator_pk: formData.fieldData.creator_pk,
      id: formData.fieldData.id,
    });
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
          value={formData.fieldData.title ?? ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              fieldData: { ...formData.fieldData, title: e.target.value },
            })
          }
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
          value={formData.fieldData.content ?? ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              fieldData: { ...formData.fieldData, content: e.target.value },
            })
          }
          className='w-full p-2 border rounded'
          rows={4}
          required
        />
      </div>

      <div>
        <label htmlFor='image' className='block mb-1'>
          画像URL
        </label>
        <input
          type='url'
          id='image'
          value={formData.fieldData.image ?? ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              fieldData: { ...formData.fieldData, image: e.target.value },
            })
          }
          className='w-full p-2 border rounded'
        />
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
      {pending ? '更新中...' : '更新'}
    </button>
  );
}
