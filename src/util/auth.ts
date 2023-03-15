import * as Crypto from 'crypto';


const key = "This is the private key used by developers."

//임시패스워드 생성
export function createTemporaryPassword(): string {
    var randomstring = Math.random().toString(36).slice(-8);

    return randomstring
}

//encrypt
export function encrypt(plain: string): string {
    const encryptKey = Buffer.from(key, "utf-8").subarray(0, 32)
    console.log(encryptKey.byteLength)
    
    const iv = Buffer.from(encryptKey.subarray(0, 16));
    console.log(iv.length)

    const cipher = Crypto.createCipheriv('aes-256-cbc', encryptKey, iv)

    let encryptText = cipher.update(plain, 'utf-8', 'base64')
    encryptText += cipher.final('base64')
    return encryptText
}

//decrypt
export function decrypt(encryptText: string): string {

    const decryptKey = Buffer.from(key, "utf-8")
    const iv = Buffer.from(decryptKey.subarray(0, 16))
    const cipher = Crypto.createCipheriv('aes-256-cbc', decryptKey, iv)

    let plain = cipher.update(encryptText, 'base64', 'utf-8')
    plain += cipher.final('utf-8')
    return plain
}


