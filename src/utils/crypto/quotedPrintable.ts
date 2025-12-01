function quotedPrintableDecode(text: string): string {
    // 处理软换行（行末的=）
    text = text.replace(/=\r?\n/g, '');
    
    // 将=XX转换为字节
    const bytes: number[] = [];
    text.replace(/=([0-9A-Fa-f]{2})/g, (_, hex) => {
        bytes.push(parseInt(hex, 16));
        return '';
    });
    
    // 使用TextDecoder解码UTF-8字节序列
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(new Uint8Array(bytes));
}
export { quotedPrintableDecode };