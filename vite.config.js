import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { createServer } = require('vite')
const { readFileSync } = require('fs')

const sslCertificate = {
  key: readFileSync('./domain.pem'),
  cert: readFileSync('./certificate.pem')
}

export default ({ command }) => {
  let host = '127.0.0.1'
  if (command === 'build') {
    host = 'ehl.ai'
  }

  return defineConfig({
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tagName => {
              return tagName === 'vue-advanced-chat' || tagName === 'emoji-picker'
            }
          }
        }
      })
    ],
    server: {
      https: sslCertificate,
      port: 3000,
      host
    }
  })
}