"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var order_id = 'brooke';
var generated_signature = '';
var num = 0;
var zero_num = 4;
function countLeadingZeros(str) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === '0') {
            count++;
        }
        else {
            break;
        }
    }
    return count;
}
while (countLeadingZeros(generated_signature.toString()) < zero_num) {
    generated_signature = CryptoJS.HmacSHA256(order_id + num.toString(), 'secret').toString(CryptoJS.enc.Hex);
    num++;
}
console.log("The result is ".concat(generated_signature));
