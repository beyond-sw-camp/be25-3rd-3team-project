import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // 개발 서버에서는 /gateway 요청을 실제 Gateway로 프록시해 CORS를 우회합니다.
  const apiProxyTarget = env.VITE_API_PROXY_TARGET || 'http://100.119.201.17:9000'

  return {
    plugins: [vue()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
        },
        '/sourcing': {
          target: apiProxyTarget,
          changeOrigin: true,
        },
        '/gateway': {
          target: apiProxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gateway/, ''),
        },
      },
    },
  }
})
