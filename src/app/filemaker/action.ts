'use server';

import { getFileMakerClient } from '@/lib/filemaker/createToken';
import { FileMakerModifyResponse } from '@/lib/filemaker/FileMakerClient';
import { FMDatabase } from '@/types/filemaker/schema';

export async function test(value: {
  fieldData: FMDatabase['Table']['entry']['create']['fieldData'];
  portalData: FMDatabase['Table']['entry']['create']['portalData'];
}): Promise<FileMakerModifyResponse> {
  const filemaker = getFileMakerClient();

  const response = await filemaker
    .post('entry', {
      fieldData: value.fieldData,
      portalData: value.portalData,
    })
    .dateformat(1)
    .script('test', 'test')
    .then();

  return response;
}
