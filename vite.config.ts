import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'


const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  plugins: [
    Vue(),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false
              }
            }
          }
        ]
        // exclude: [
        //   path.resolve(__dirname, 'src/assets/logo/**'), // 排除 logo 目录
        //   path.resolve(__dirname, 'src/assets/svgIcons/**') // 排除需要 symbol 模式的目录
        // ]
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: true,
      dirs: ['src/**'],
      resolvers: [ElementPlusResolver({importStyle: 'sass'})],
    }),
    Inspect(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element-vars.scss" as *;
                          @use "@/assets/styles/vars.scss" as *;`
      }
    }
  },

})
