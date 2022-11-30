import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        home: resolve(root, '/pages/home', 'index.html'),
        login: resolve(root, '/pages/login', 'index.html'),
        signup: resolve(root, '/pages/signup', 'index.html'),
      },
    },
  },
})
