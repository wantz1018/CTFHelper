function baconDecode(text: string): string {
    // 定义Bacon密码的映射表
    const baconMap: { [key: string]: string } = {
        'AAAAA': 'A', 'AAAAB': 'B', 'AAABA': 'C', 'AAABB': 'D', 'AABAA': 'E',
        'AABAB': 'F', 'AABBA': 'G', 'AABBB': 'H', 'ABAAA': 'I', 'ABAAB': 'J',
        'ABABA': 'K', 'ABABB': 'L', 'ABBAA': 'M', 'ABBAB': 'N', 'ABBBA': 'O',
        'ABBBB': 'P', 'BAAAA': 'Q', 'BAAAB': 'R', 'BAABA': 'S', 'BAABB': 'T',
        'BABAA': 'U', 'BABAB': 'V', 'BABBA': 'W', 'BABBB': 'X', 'BBAAA': 'Y',
        'BB AAB': 'Z'
    };

    // 将文本转换为二进制表示
    let binaryText = '';
    for (const char of text.toLowerCase()) {
        binaryText += /[a-z]/.test(char) ? 'A' : 'B';
    }

    // 将二进制文本按5个字符分组解码
    let result = '';
    for (let i = 0; i < binaryText.length; i += 5) {
        const group = binaryText.slice(i, i + 5);
        if (group.length === 5) {
            result += baconMap[group] || '';
        }
    }

    return result;
}

export default baconDecode;
