import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto';

let name = 'brooke';
let hash = '';
let nonce = 0;
let zero_num = 4;

interface KeyPair {
    publicKey: string;
    PrivateKey: string;
}

function generateKey(): KeyPair {
    const { publicKey, privateKey} = crypto.generateKeyPairSync('rsa',  {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });

    return { publicKey: publicKey.toString(), PrivateKey: privateKey.toString() };
}


function countLeadingZeros(ans: string): number {
    let count = 0;
    for (let i = 0; i < ans.length; i++) {
        if (ans[i] === '0') {
            count++;
        } else {
            break;
        }
    }
    return count;
}

function signHash(name: string, nonce: string, privateKey: string): string {
    const data = `${name}${nonce}`;
    hash = crypto.createHash('sha256').update(data).digest('hex');
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(hash);
    const signature = sign.sign(privateKey, 'hex');

    return signature;
}

function verifySignature(publicKey: string, hash: string, signature: string): boolean {
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(hash);

    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(hash);

    const isValid = verify.verify(publicKey, signature, 'hex');
    return isValid;
}

function calculateNonce(name: string): string {
    while (countLeadingZeros(hash.toString()) < zero_num) {
        hash = CryptoJS.HmacSHA256(name + nonce.toString(), 'secret').toString   (CryptoJS.enc.Hex);
        nonce++;
    }
    console.log(`The result is ${hash}`);

    return nonce.toString();
}

function main(){
    const nonce = calculateNonce(name);
    const keypair = generateKey();
    const publickey = keypair.publicKey;
    const privatekey = keypair.PrivateKey;
    const signature = signHash(name, nonce, privatekey);
    const isvalid = verifySignature(publickey, hash, signature);

    console.log(`nonce is ${nonce}\n`);
    console.log(`${publickey}\n`);
    console.log(`${privatekey}\n`);
    console.log(`hash after sign is ${signature}\n`);
    console.log(`Is the signature valid? ${isvalid}\n`);

}

main();