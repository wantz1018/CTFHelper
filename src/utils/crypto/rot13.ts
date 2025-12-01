function rot13Decode(text: string): string {
    return text.replace(/[a-zA-Z]/g, char => {
        const start = char <= 'Z' ? 65 : 97;  // 'A'或'a'的ASCII码
        const code = char.charCodeAt(0);
        return String.fromCharCode(((code - start + 13) % 26) + start);
    });
}
export default rot13Decode;