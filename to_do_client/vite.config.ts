import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/static/',
  build:{
    outDir: '../to_do_server/static',
    emptyOutDir: true,
  },
  plugins: [react()],
  test:{
    environment:"jsdom"
  }
})