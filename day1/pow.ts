import * as CryptoJS from 'crypto-js';

let order_id = 'brooke';
let generated_signature = '';
let num = 0;
let zero_num = 4;

function countLeadingZeros(str: string): number {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '0') {
            count++;
        } else {
            break;
        }
    }
    return count;
}

while (countLeadingZeros(generated_signature.toString()) < zero_num) {
    generated_signature = CryptoJS.HmacSHA256(order_id + num.toString(), 'secret').toString(CryptoJS.enc.Hex);
    num++;
}

console.log(`The result is ${generated_signature}`);
