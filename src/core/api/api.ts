import axios from 'axios'

// Configuração da API com fallback para desenvolvimento local
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333"

// Logs de debug para verificar a configuração
console.log('🔧 API Configuration:')
console.log('  - VITE_API_URL:', import.meta.env.VITE_API_URL)
console.log('  - API_URL (final):', API_URL)
console.log('  - NODE_ENV:', import.meta.env.NODE_ENV)

export const api = axios.create({
  baseURL: API_URL
})