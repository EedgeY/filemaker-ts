import React from 'react';
import { FileMakerRecord } from '@/lib/filemaker/FileMakerClient';

export default function Test({ data }: { data: FileMakerRecord[] }) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
