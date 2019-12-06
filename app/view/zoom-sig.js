/**
 * this file is copied from zoom sdk website, which can be optimized with fewer deps.
 */

import * as base64JS from 'js-base64';
import * as hmacSha256 from 'crypto-js/hmac-sha256';
import * as encBase64 from 'crypto-js/enc-base64';

export function generateSignature(data) {
    let signature = '';
    const ts = new Date().getTime();
    try {
        const msg = base64JS.Base64.encode(data.apiKey + data.meetingNumber + ts + data.role);
        const hash = hmacSha256.default(msg, data.apiSecret);
        signature = base64JS.Base64.encodeURI(`${data.apiKey}.${data.meetingNumber}.${ts}.${data.role}.${encBase64.stringify(hash)}`);
    } catch (e) {
         console.log('generateSignature error: ', e);
    }
    return signature;
}
