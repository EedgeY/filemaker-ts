'use server';

import { getFileMakerClient } from '@/lib/filemaker/createToken';
import { FMDatabase } from '@/types/filemaker/schema';

const layoutName = 'blog';

type BlogUpdateInput = Partial<
  FMDatabase['Table']['blog']['update']['fieldData']
>;

export async function createRecord(
  data: FMDatabase['Table']['blog']['create']['fieldData']
) {
  const client = getFileMakerClient();

  return await client.createWithImage(
    layoutName,
    data,
    data.image
      ? {
          fieldName: 'image',
          data: data.image,
          fileName: 'image.jpg',
        }
      : undefined
  );
}

export async function updateRecord(recordId: string, data: BlogUpdateInput) {
  const client = getFileMakerClient();
  return await client.patch(layoutName, recordId, { fieldData: data }).then();
}

export async function deleteRecord(recordId: string) {
  const client = getFileMakerClient();
  return await client.delete(layoutName, recordId).then();
}

export async function createRecordWithPDF(
  data: FMDatabase['Table']['blog']['create']['fieldData']
) {
  const client = getFileMakerClient();

  try {
    const { base64: pdfUrl } = await client
      .createWithScriptPDF(layoutName, data)
      .script('server_pdf')
      .scriptparam('pdf|1')
      .then();

    // FileMakerのトークンを取得
    const filemakerToken = await client.auth.getFileMakerToken(
      client.getCurrentDatabase()
    );

    // PDFをフェッチ
    const response = await fetch(pdfUrl, {
      headers: {
        Authorization: `Bearer ${filemakerToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('PDFの取得に失敗しました');
    }

    // PDFをbase64に変換
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    // base64データを返す
    return `data:application/pdf;base64,${base64}`;
  } catch (error) {
    console.error('PDF生成エラー:', error);
    throw error;
  }
}
