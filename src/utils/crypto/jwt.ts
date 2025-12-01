interface JWTPayload {
    iss?: string;
    sub?: string;
    aud?: string | string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
}

interface JWTHeader {
    alg: string;
    typ?: string;
}


function jwtDecode(token: string): { header: JWTHeader; payload: JWTPayload; signature: string } | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT format');
        }

        const header = JSON.parse(atob(parts[0])) as JWTHeader;
        const payload = JSON.parse(atob(parts[1])) as JWTPayload;
        const signature = parts[2];

        return {
            header,
            payload,
            signature
        };
    } catch (error) {
        console.error('JWT decode error:', error);
        return null;
    }
}

export { jwtDecode };