import { AlgorithmType, AlgorithmOption } from './types';

export const ALGORITHM_OPTIONS: AlgorithmOption[] = [
  { 
    id: AlgorithmType.MD5, 
    label: 'MD5', 
    description: 'Hızlı ama kriptografik olarak kırılmış. 128-bit.', 
    secure: false 
  },
  { 
    id: AlgorithmType.SHA1, 
    label: 'SHA-1', 
    description: 'Kullanımdan kaldırıldı. 160-bit hash.', 
    secure: false 
  },
  { 
    id: AlgorithmType.SHA256, 
    label: 'SHA-256', 
    description: 'Standart güvenli hash. 256-bit.', 
    secure: true 
  },
  { 
    id: AlgorithmType.SHA384, 
    label: 'SHA-384', 
    description: 'Güvenli hash. 384-bit.', 
    secure: true 
  },
  { 
    id: AlgorithmType.SHA512, 
    label: 'SHA-512', 
    description: 'Çok güvenli. 512-bit hash.', 
    secure: true 
  },
  { 
    id: AlgorithmType.BCRYPT, 
    label: 'Bcrypt', 
    description: 'Yavaş, tuzlanmış, uyarlanabilir. Şifreler için en iyisi.', 
    secure: true 
  },
];