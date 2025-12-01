interface MatchRule {
    pattern: RegExp;
    type: string;
}

const matchRules: MatchRule[] = [
    { pattern: /^\\x[0-9A-Fa-f]{2,4}$/, type: "ascii" },
    { pattern: /^Zmxh/, type: "base64" },
    { pattern: /^[a-zA-Z]{5,}$/, type: "bacon" },
    { pattern: /=([0-9A-Fa-f]{2})/g, type: "quotedPrintable" },
    { pattern: /^[><+\-.,\\[\]]+$/, type: "brainfuck" },
    { pattern: /^base32decode|b32d/i, type: "base32decode" },
    { pattern: /^base32|base32encode|b32e/i, type: "base32encode" },
    { pattern: /^base16decode|b16d/i, type: "base16decode" },
    { pattern: /^base16|base16encode|b16e/i, type: "base16encode" },
    { pattern: /^base85decode|b85d/i, type: "base85decode" },
    { pattern: /^base85|base85encode|b85e/i, type: "base85encode" },
    { pattern: /^base64decode|b64d/i, type: "base64decode" },
    { pattern: /^base64|base64encode|b64e/i, type: "base64encode" },
    { pattern: /&[a-zA-Z]+;|&#\d+;|&#x[0-9a-fA-F]+;/g, type: "htmlentity" },
    { pattern: /^rot13/i, type: "rot13" },
    { pattern: /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/, type: "jwt" },
    { pattern: /^[01]+$/, type: "binary" },
    { pattern: /^[0-9a-fA-F]+$/, type: "hex" },
    { pattern: /^md5/i, type: "md5" },
    { pattern: /^([.-]+(\s|$))+$/, type: "morse"},
    { pattern: /^[1-9]\d{9}(\d{3})?$/, type: "timestamp" },
    { pattern: /\\u[0-9a-fA-F]{4}/, type: "unicode" },
    { pattern: /%[0-9a-fA-F]{2}/g, type: "url" }
];

function matcher(str: string): string[] {
    return matchRules.filter(rule => rule.pattern.test(str)).map(rule => rule.type);
}

export default matcher;
