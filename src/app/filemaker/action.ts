'use server';

import { getFileMakerClient } from '@/lib/filemaker/createToken';
import {
  FileMakerModifyResponse,
  FileMakerRecord,
} from '@/lib/filemaker/FileMakerClient';

export async function test(
  value: FileMakerRecord
): Promise<FileMakerModifyResponse> {
  const filemaker = getFileMakerClient();

  const response = await filemaker
    .post('entry', {
      fieldData: value.fieldData,
      portalData: value.portalData,
    })
    .dateformat(1)
    .script('test', 'test');

  return response;
}
