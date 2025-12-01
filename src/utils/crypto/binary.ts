function binaryToString(binary: string): string {
    // 验证输入是否只包含0和1
    if (!/^[01]*$/.test(binary)) {
        throw new Error('Invalid binary string: must contain only 0 and 1');
    }

    // 确保长度是8的倍数，不足的补0
    const paddedBinary = binary.padEnd(Math.ceil(binary.length / 8) * 8, '0');

    // 使用TextDecoder来正确处理UTF-8编码
    const bytes = new Uint8Array(paddedBinary.length / 8);
    for (let i = 0; i < paddedBinary.length; i += 8) {
        const byte = paddedBinary.slice(i, i + 8);
        bytes[i / 8] = parseInt(byte, 2);
    }

    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
}

export default binaryToString;

