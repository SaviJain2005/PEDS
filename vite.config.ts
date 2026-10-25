import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the built `dist/` folder runs from any location:
  // USB stick, Desktop, sub-folder hosting, or double-clicked index.html.
  base: "./",
})
