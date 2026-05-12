import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:7001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  define: {
    __API_BASE_URL__: JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'https://emotionaltracker-api.onrender.com/api'
        : '/api'
    )
  }
})