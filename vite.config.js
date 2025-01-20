import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/medication-manager/',
  build: {
    sourcemap: false, // This will disable source maps in production
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Ensure clean asset file names without hashes
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js'
      }
    }
  }
})
