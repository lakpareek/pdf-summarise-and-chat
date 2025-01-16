import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Import the path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: { // Ensure resolve is used for alias
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
