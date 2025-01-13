'use client';

import { Button } from '@/components/ui/button';
import { createRecordWithPDF } from '../action';
import { base64ToPdfBlob, openPdfInNewTab } from '@/lib/pdf-utils';

export default function PDFScript() {
  const randomId = Math.random().toString(36).substring(2, 15);
  const data = {
    title: 'DEVから',
    content: 'あいうえお',
    id: randomId,
  } as any;

  const handleClick = async () => {
    try {
      const base64Pdf = await createRecordWithPDF(data);
      const pdfBlob = base64ToPdfBlob(base64Pdf);
      openPdfInNewTab(pdfBlob);
    } catch (error) {
      console.error('PDF生成エラー:', error);
      alert('PDFの生成に失敗しました');
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>PDFScript</Button>
    </div>
  );
}
