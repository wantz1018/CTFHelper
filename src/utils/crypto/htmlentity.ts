function htmlEntityDecode(text: string): string {
    // 创建一个临时元素来利用浏览器的内置解码功能
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
}
export default htmlEntityDecode;