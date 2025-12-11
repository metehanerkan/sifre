import { AlgorithmType } from '../types';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

// Convert ArrayBuffer to Hex String
const bufferToHex = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export const generateHash = async (
  text: string,
  algorithm: AlgorithmType
): Promise<string> => {
  if (!text) return '';

  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  switch (algorithm) {
    case AlgorithmType.MD5:
      return CryptoJS.MD5(text).toString();
      
    case AlgorithmType.SHA1:
      // Using Web Crypto for SHA-1 if available, though deprecated
      const sha1Buffer = await window.crypto.subtle.digest('SHA-1', data);
      return bufferToHex(sha1Buffer);

    case AlgorithmType.SHA256:
      const sha256Buffer = await window.crypto.subtle.digest('SHA-256', data);
      return bufferToHex(sha256Buffer);

    case AlgorithmType.SHA384:
      const sha384Buffer = await window.crypto.subtle.digest('SHA-384', data);
      return bufferToHex(sha384Buffer);

    case AlgorithmType.SHA512:
      const sha512Buffer = await window.crypto.subtle.digest('SHA-512', data);
      return bufferToHex(sha512Buffer);

    case AlgorithmType.BCRYPT:
      // bcryptjs is synchronous or async. Using async version to not block UI.
      // Salt rounds = 10 is standard.
      return await bcrypt.hash(text, 10);

    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
};

export const verifyHash = async (
  password: string,
  hash: string,
  algorithm: AlgorithmType
): Promise<boolean> => {
  if (!password || !hash) return false;

  try {
    // Trim whitespace from hash
    const cleanHash = hash.trim();

    if (algorithm === AlgorithmType.BCRYPT) {
      // bcrypt.compare extracts the salt from the hash automatically
      return await bcrypt.compare(password, cleanHash);
    }

    // For other algorithms, re-compute and compare strings
    const computed = await generateHash(password, algorithm);
    
    // Case-insensitive comparison for hex strings
    return computed.toLowerCase() === cleanHash.toLowerCase();
  } catch (error) {
    console.error("Verification error:", error);
    return false;
  }
};