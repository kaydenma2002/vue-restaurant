import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { createServer } = require('vite')
const { readFileSync } = require('fs')

const sslCertificate = {
  key: readFileSync('./domain.pem'),
  cert: readFileSync('./certificate.pem')
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: tagName => {
            return tagName === 'vue-advanced-chat' || tagName === 'emoji-picker'
          }
        }
      }
    })
  ],server: {
    https: sslCertificate,
    port: 3000,
  },
})
