type GenerateSignatureOptions = {
    apiKey: string,
    apiSecret: string,
    meetingNumber: number | string,
    role: 0 | 1,
};

export function generateSignature(data: GenerateSignatureOptions): string;
