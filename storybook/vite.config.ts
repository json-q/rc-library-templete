import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import vitePluginImp from 'vite-plugin-imp';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    // sb 打包时，由于组件库为本地目录，sb 找不到路径会打包错误，需使用 alias 指向正确路径
    alias: {
      'rclt-components': fileURLToPath(new URL('../packages/components', import.meta.url)),
    },
  },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'rclt-components',
          style: (name) => `rclt-components/es/${name}/style/index.css`,
        },
      ],
    }),
  ],
});
