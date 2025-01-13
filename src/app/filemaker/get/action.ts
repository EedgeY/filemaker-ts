'use server';

import { getFileMakerClient } from '@/lib/filemaker/createToken';

const layoutName = 'blog';

export async function getSingleRecord() {
  const client = getFileMakerClient();
  return await client.get(layoutName).single('1').then();
}

export async function getRangeRecords() {
  const client = getFileMakerClient();
  return await client.get(layoutName).range(1, 3).then();
}

export async function getFields() {
  const client = getFileMakerClient();
  return await client.get(layoutName).fields().then();
}

export async function getSortedRecords() {
  const client = getFileMakerClient();
  return await client
    .get(layoutName)
    .sort({ fieldName: 'id', sortOrder: 'ascend' })
    .then();
}

export async function getDataWithLimit() {
  const client = getFileMakerClient();
  return await client.get(layoutName).range(1, 5).then();
}

export async function getImages(): Promise<string[]> {
  const client = getFileMakerClient();
  const data = await client.get(layoutName).range(1, 5).then();

  if (data.response.data?.[0]?.fieldData?.image) {
    const images = await Promise.all(
      data.response.data.map((recordId) =>
        recordId.fieldData.image
          ? client.getContainerFieldAsBase64(recordId.fieldData.image)
          : Promise.resolve('')
      )
    );
    return images.filter((image): image is string => image !== null);
  }
  return [];
}
