function base16Encode(str: string): string {
    return btoa(str);
}

function base16Decode(str: string): string {
    return atob(str);
}

export {
    base16Encode,
    base16Decode
}