import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// Mendapatkan __dirname dalam modul ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Inisialisasi FlatCompat untuk kompatibilitas dengan aturan lama
const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  // Mengimpor aturan dari konfigurasi lama
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.ts', '**/*.tsx'], // Berlaku untuk file TypeScript
    rules: {
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
]

export default eslintConfig
