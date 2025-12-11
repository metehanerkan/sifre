export enum AlgorithmType {
  MD5 = 'MD5',
  SHA1 = 'SHA-1',
  SHA256 = 'SHA-256',
  SHA384 = 'SHA-384',
  SHA512 = 'SHA-512',
  BCRYPT = 'Bcrypt',
}

export interface HashResult {
  algorithm: AlgorithmType;
  hash: string;
  loading: boolean;
  error?: string;
}

export interface AlgorithmOption {
  id: AlgorithmType;
  label: string;
  description: string;
  secure: boolean;
}