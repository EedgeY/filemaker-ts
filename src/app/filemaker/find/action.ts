'use server';

import { getFileMakerClient } from '@/lib/filemaker/createToken';

const layoutName = 'blog';

export async function basicFind() {
  const client = getFileMakerClient();
  try {
    return await client.find(layoutName).eq({ title: 'F' }).then();
  } catch (error) {
    console.error(error);
  }
}

export async function sortedFind() {
  const client = getFileMakerClient();
  try {
    return await client
      .find(layoutName)
      .eq({ title: 'F' })
      .sort({ fieldName: 'id', sortOrder: 'descend' })
      .then();
  } catch (error) {
    console.error(error);
  }
}

export async function rangedFind() {
  const client = getFileMakerClient();
  try {
    return await client
      .find(layoutName)
      .eq({ title: 'F' })
      .limit(3)
      .offset(1)
      .then();
  } catch (error) {
    console.error(error);
  }
}
