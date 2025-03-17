import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path' // Use * as path

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    cors: {
    origin: "https://pdf-summarise-and-chat.onrender.com", // Your backend URL
    credentials: true, // Allow cookies
  },
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

