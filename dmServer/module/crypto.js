/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/23
  * Time: 20:26
  * 加密 解密 36位uuid值
  */

const CryptoJS = require('crypto-js');
const uuid = require('node-uuid');
const { secretKey } = require('../config');

module.exports = {
  // 加密
  encrypt (plaintext) {
    return CryptoJS.AES.encrypt(plaintext, secretKey);
  },
  // 解密
  decrypt (ciphertext) {
    let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  },
  // 36位uuid值 记录的唯一标识
  uudi36 () {
    return uuid.v1();
  }
}