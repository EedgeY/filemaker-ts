import Image from 'next/image';
import { getFileMakerClient } from '@/lib/filemaker/createToken';
import { FileMakerDataResponse } from '@/lib/filemaker/FileMakerClient';
import { FMDatabase } from '@/types/filemaker/schema';
import React from 'react';

export default async function BlogList({
  blogs,
}: {
  blogs?: FileMakerDataResponse<
    FMDatabase['Table']['blog']['read']['fieldData']
  >;
}) {
  //blogsDataのimageをgetContainerImageに渡して、imageのURLを取得する
  const client = getFileMakerClient();
  const imageUrls = await Promise.all(
    blogs?.response.data?.map(async (blog) => {
      return blog.fieldData.image
        ? await client.getContainerFieldAsBase64(blog.fieldData.image)
        : '';
    }) ?? []
  );

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              ID
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Title
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Content
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Image
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {blogs?.response.data?.map((blog, index) => (
            <tr key={blog.recordId}>
              <td className='px-6 py-4 whitespace-nowrap'>
                {blog.fieldData.id ?? ''}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {blog.fieldData.title ?? ''}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {blog.fieldData.content ?? ''}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {imageUrls[index] ? (
                  <Image
                    src={imageUrls[index]}
                    alt='Blog Image'
                    width={100}
                    height={100}
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button>編集</button>
                <button>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
