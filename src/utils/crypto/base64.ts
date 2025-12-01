function base64Encode(str: string): string {
    return btoa(encodeURIComponent(str));
}

function base64Decode(str: string): string {
    return decodeURIComponent(atob(str));
}

export { base64Encode, base64Decode };