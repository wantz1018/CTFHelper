function hexDecode(hex: string): string {
    // 移除所有空格
    hex = hex.replace(/\s/g, '');

    // 检查是否是有效的十六进制字符串
    if (!/^[0-9A-Fa-f]*$/.test(hex)) {
        throw new Error('Invalid hex string');
    }

    // 将十六进制字符串转换为字节数组
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.slice(i, i + 2), 16));
    }

    // 使用 TextDecoder 处理 UTF-8 编码
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(new Uint8Array(bytes));
}



export {
    hexDecode,
}