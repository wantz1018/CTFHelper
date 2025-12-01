function base85Encode(input: string): string {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~';
    let encoded = '';
    let buffer = 0;
    let bufferLength = 0;

    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        buffer = (buffer << 8) | charCode;
        bufferLength += 8;

        while (bufferLength >= 35) {
            const index = (buffer >> (bufferLength - 35)) & 0x7FFFFFF;
            encoded += alphabet[index];
            bufferLength -= 35;
            buffer &= (1 << bufferLength) - 1;
        }

    }
    if (bufferLength > 0) {
        encoded += alphabet[(buffer << (35 - bufferLength)) & 0x7FFFFFF];

    }
    return encoded;
}

function base85Decode(input: string): string {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~';
    let decoded = '';
    let buffer = 0;
    let bufferLength = 0;

    for (let i = 0; i < input.length; i++) {

        const index = alphabet.indexOf(input[i]);
        if (index === -1) {
            throw new Error('Invalid character in input');
        }
        buffer = (buffer << 35) | index;
        bufferLength += 35;

        while (bufferLength >= 8) {

            const charCode = (buffer >> (bufferLength - 8)) & 0xFF;
            decoded += String.fromCharCode(charCode);
            bufferLength -= 8;
            buffer &= (1 << bufferLength) - 1;

        }

    }
    return decoded;
}

export { base85Encode, base85Decode };