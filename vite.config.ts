import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
    base: '/PM-Portfolio-Dashboard/', // <-- repo name here, e.g. /product-portfolio-dashboard/
  server: {
    port: 5173,
    open: true,
  },
})