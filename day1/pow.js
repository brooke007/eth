"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var crypto = require("crypto");
var name = 'brooke';
var hash = '';
var nonce = 0;
var zero_num = 4;
function generateKey() {
    var _a = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    }), publicKey = _a.publicKey, privateKey = _a.privateKey;
    return { publicKey: publicKey.toString(), PrivateKey: privateKey.toString() };
}
function countLeadingZeros(ans) {
    var count = 0;
    for (var i = 0; i < ans.length; i++) {
        if (ans[i] === '0') {
            count++;
        }
        else {
            break;
        }
    }
    return count;
}
function signHash(name, nonce, privateKey) {
    var data = "".concat(name).concat(nonce);
    hash = crypto.createHash('sha256').update(data).digest('hex');
    var sign = crypto.createSign('RSA-SHA256');
    sign.update(hash);
    var signature = sign.sign(privateKey, 'hex');
    return signature;
}
function verifySignature(publicKey, hash, signature) {
    var sign = crypto.createSign('RSA-SHA256');
    sign.update(hash);
    var verify = crypto.createVerify('RSA-SHA256');
    verify.update(hash);
    var isValid = verify.verify(publicKey, signature, 'hex');
    return isValid;
}
function calculateNonce(name) {
    while (countLeadingZeros(hash.toString()) < zero_num) {
        hash = CryptoJS.HmacSHA256(name + nonce.toString(), 'secret').toString(CryptoJS.enc.Hex);
        nonce++;
    }
    console.log("The result is ".concat(hash));
    return nonce.toString();
}
function main() {
    var nonce = calculateNonce(name);
    var keypair = generateKey();
    var publickey = keypair.publicKey;
    var privatekey = keypair.PrivateKey;
    var signature = signHash(name, nonce, privatekey);
    var isvalid = verifySignature(publickey, hash, signature);
    console.log("nonce is ".concat(nonce, "\n"));
    console.log("".concat(publickey, "\n"));
    console.log("hash after sign is ".concat(signature, "\n"));
    console.log("Is the signature valid? ".concat(isvalid, "\n"));
}
main();
