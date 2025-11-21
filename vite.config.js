// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          'ui-vendor': ['antd', '@ant-design/icons'],
          'chart-vendor': ['apexcharts', 'react-apexcharts', 'recharts'],
          'editor-vendor': ['react-quill'],
          'icons-vendor': ['react-icons'],
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase limit if needed
  }
})