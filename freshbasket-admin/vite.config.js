// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   plugins: [ tailwindcss()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react({
//     jsxRuntime:'classic'
//   })],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       'react/jsx-runtime': 'react/jsx-runtime.js',
//       'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js'
//     }
//   },
//   build: {
//     outDir: "dist"
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./",   // 👈 Add this
  build: { outDir: "dist" }
});
