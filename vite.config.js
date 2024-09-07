import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Book-Store/',
  server: {
    port: 5174, // Change this to the desired port
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react'; // Separate React into its own chunk
            }
            if (id.includes('react-router-dom')) {
              return 'react-router'; // Separate React Router into its own chunk
            }
            // You can split other libraries here similarly
            return 'vendor'; // All other libraries go into 'vendor' chunk
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase the chunk size limit to 1000 KB if needed
  }
})

