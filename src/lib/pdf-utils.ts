export function base64ToPdfBlob(base64Pdf: string): Blob {
  // base64データをBlobに変換
  const byteCharacters = atob(base64Pdf.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: 'application/pdf' });
}

export function openPdfInNewTab(blob: Blob): void {
  // BlobからURLを作成
  const url = URL.createObjectURL(blob);

  // 新しいタブでPDFを開く
  window.open(url, '_blank');

  // メモリリーク防止のためにURLを解放
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
