import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 
export default defineConfig({
  plugins: [react()],
  build: {
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          'antd-core': ['antd'],
          'apexcharts': ['apexcharts'],
          'react-apexcharts': ['react-apexcharts'],
          'recharts': ['recharts'],
          'editor-vendor': ['react-quill'],
          'icons-vendor': ['react-icons'],
          'utils': ['dayjs', 'jwt-decode', 'localforage'],
          'form-utils': ['react-hook-form', 'react-toastify', 'sweetalert2']
        }
      }
    },
    chunkSizeWarningLimit: 1600
  }
})