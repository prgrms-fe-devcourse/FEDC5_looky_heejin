import { aesDecrypt, aesEncrypt, sha256Encrypt } from "@/utils/crypto";
import { describe, it, expect, vi } from "vitest";

// 환경 변수를 모의 처리
const mockCryptoKey = "testKey";
vi.mock("import.meta", () => ({
  env: {
    VITE_CRYPTO_KEY: mockCryptoKey,
  },
}));

describe("Encryption Functions", () => {
  it("should correctly SHA256 encrypt data", () => {
    const data = "testData";
    const hashedData = sha256Encrypt(data);
    expect(hashedData).toBe(
      "ba477a0ac57e10dd90bb5bf0289c5990fe839c619b26fde7c2aac62f526d4113"
    ); // testData의 해시값
  });

  it("should correctly AES encrypt and decrypt data", () => {
    const data = "testData";
    const encryptedData = aesEncrypt(data);
    const decryptedData = aesDecrypt(encryptedData);

    expect(decryptedData).toBe(data);
  });

  it("should return empty string for null input in aesDecrypt", () => {
    const decryptedData = aesDecrypt(null);
    expect(decryptedData).toBe("");
  });
});
