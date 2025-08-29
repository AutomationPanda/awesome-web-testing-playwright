import { createServer } from './backend/index';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue';
import pluginEnv from 'vite-plugin-vue-env';
import tsconfigPaths from 'vite-tsconfig-paths'
import constants from './constants'

const { APP, SERVER } = constants

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    vue(),
    svgLoader(),
    pluginEnv(),
    istanbul({
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.vue'],
      include: 'src/*'
    }),
    createServer(),
    tsconfigPaths({ extensions: ['.ts', '.d.ts'] })
  ],
  server: {
    port: APP,
    proxy: {
      '^/api/.*': {
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        target: `http://localhost:${SERVER}`
      },
      '^/socket.io/.*': {
        changeOrigin: true,
        target: `http://localhost:${SERVER}`,
      }
    }
  }
});