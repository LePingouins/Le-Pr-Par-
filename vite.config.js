import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-oxc'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 5174,
  },
})
