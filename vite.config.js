import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置 element+ 组件按需加载
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: path.resolve(_dirname, 'index.html'),
  //       preview_pptx: path.resolve(_dirname, 'pptx_iframe.html'),
  //     }
  //   }
  // },
  plugins: [
    vue(),
    AutoImport({
      // element+ 组件按需加载
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(
          // 按需定制主题配置 通知ElementPlus使用sass
          { importStyle: 'sass' }
        )
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // alias:[{
      //   find: '@',
      //   replacement: path.resolve(_dirname, 'src')
      // }]
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `
      }
    }
  }
})
