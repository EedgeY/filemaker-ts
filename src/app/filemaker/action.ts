'use server';

import { getFileMakerClient } from '@/lib/filemaker/createToken';
import { FileMakerModifyResponse } from '@/lib/filemaker/FileMakerClient';
import { FMDatabase } from '@/types/filemaker/schema';

export async function createEntry(value: {
  fieldData: FMDatabase['Table']['blog']['create']['fieldData'];
}): Promise<FileMakerModifyResponse> {
  const filemaker = getFileMakerClient();

  const response = await filemaker
    .post('blog', {
      fieldData: value.fieldData,
    })
    .dateformat(1)
    .then();

  return response;
}

export async function updateEntry(
  recordId: string,
  value: {
    fieldData: FMDatabase['Table']['blog']['update']['fieldData'];
  }
): Promise<FileMakerModifyResponse> {
  const filemaker = getFileMakerClient();

  const response = await filemaker
    .patch('blog', recordId, {
      fieldData: value.fieldData,
    })
    .then();

  return response;
}

export async function deleteEntry(
  recordId: string
): Promise<FileMakerModifyResponse> {
  const filemaker = getFileMakerClient();

  const response = await filemaker.delete('blog', recordId).then();

  return response;
}
