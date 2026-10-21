import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages publica este proyecto bajo /INFOSERC-MANAGER/.
  base: '/INFOSERC-MANAGER/',
  plugins: [react()],
})