import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // 외부에서도 접근 가능하게 설정
    historyApiFallback: true,  // 이 옵션을 추가하여 모든 경로를 index.html로 리디렉션
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',  // 필요한 경우 추가
    },
  },
})
