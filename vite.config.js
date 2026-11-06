import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Project site on GitHub Pages: https://sahilm4711-cyber.github.io/Portfolio-/
// so all built asset paths must live under /Portfolio-/.
export default defineConfig({
  base: "/Portfolio-/",
  plugins: [react()],
})
