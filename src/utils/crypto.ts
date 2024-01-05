const { VITE_CRYPTO_KEY } = import.meta.env;
import CryptoJS, { SHA256 } from "crypto-js";

export const sha256Encrypt = (data: string) => {
  return SHA256(data).toString();
};

export const aesEncrypt = (data: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), VITE_CRYPTO_KEY).toString();
};

export const aesDecrypt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, VITE_CRYPTO_KEY);
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decrypted;
};
