function base32Encode(input: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    let output = '';

    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        const binary = charCode.toString(2).padStart(8, '0');
        bits += binary;
    }
    while (bits.length >= 5) {
        const chunk = bits.slice(0, 5);
        const index = parseInt(chunk, 2);
        output += alphabet[index];
        bits = bits.slice(5);
    }

    return output;
}

function base32Decode(input: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    let output = '';

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const index = alphabet.indexOf(char);
        const binary = index.toString(2).padStart(5, '0');
        bits += binary;
    }

    while (bits.length >= 8) {

        const chunk = bits.slice(0, 8);
        const charCode = parseInt(chunk, 2);
        output += String.fromCharCode(charCode);
        bits = bits.slice(8);

    }
    return output;
}

export { base32Encode, base32Decode };