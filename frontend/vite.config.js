import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // API Gateway (기본 9000). .env.development 에서 덮어쓰기 가능.
  const gwTarget = env.API_PROXY_TARGET || 'http://localhost:9000'

  return {
    plugins: [vue()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: gwTarget,
          changeOrigin: true,
        },
        '/sourcing': {
          target: gwTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
