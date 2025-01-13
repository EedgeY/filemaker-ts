'use client';
import { FileMakerDataResponse } from '@/lib/filemaker/FileMakerClient';
import { useState } from 'react';
import { createEntry } from '../action';
import { FMDatabase } from '@/types/filemaker/schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: FileMakerDataResponse<
    FMDatabase['Table']['users']['read']['fieldData']
  >;
}

export default function Test({ data }: Props) {
  const [res, setRes] = useState<any>();

  const [random, setRandom] = useState<number>(
    Math.floor(Math.random() * 10000000000)
  );

  const damyData = {
    fieldData: {
      title: 'test',
      content: 'test',
      image:
        'https://pbs.twimg.com/media/GhF3AVwWwAAVKCO?format=jpg&name=small',
      creator_pk: 'test',
      id: random,
    },
  } as FMDatabase['Table']['blog']['create'];

  const handleTest = async () => {
    const response = await createEntry(damyData);
    if (response.messages[0].message !== 'OK') {
      console.log(response.messages[0].message);
      alert(response.messages[0].message);
      return;
    }
    setRes(response);

    setRandom(Math.floor(Math.random() * 10000000000));
  };

  return (
    <div className='space-y-4'>
      <button onClick={handleTest}>test</button>
      <div className='border rounded-md overflow-x-auto'>
        <pre className='p-4'>{JSON.stringify(res, null, 2)}</pre>
      </div>
      <div className='border rounded-md'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.response?.data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.fieldData.id}</TableCell>
                <TableCell>{item.fieldData.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
