import path from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import dts from 'vite-plugin-dts'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default async () => {
  const UnoCSS = (await import('unocss/vite')).default
  const presetWeapp = (await import('unocss-preset-weapp')).default
  const transformerDirective = (await import('@unocss/transformer-directives')).default

  return defineConfig({
    plugins: [
      uni(),
      UnoCSS({
        presets: [
          presetWeapp({
            // whRpx: false,
          }),
          presetWeappAttributify(),
        ],
        transformers: [
          transformerAttributify(),
          transformerClass(),
          transformerDirective(),

        ],
        shortcuts: {
          // 宽高满屏
          'wh-full': 'w-full h-full',
          // position 满屏
          'pos-full': 'fixed top-0 left-0 right-0 bottom-0',
          // position 水平居中 horizontal
          'pos-h-center': 'absolute left-50% transform -translate-x-50%',
          // flex 水平居中 horizontal
          'flex-h-center': 'flex justify-center',
          // position 垂直居中 vertical
          'pos-v-center': 'absolute top-50% transform -translate-y-50%',
          // flex 垂直居中 vertical
          'flex-v-center': 'flex items-center',
          // position 水平垂直居中
          'pos-center': 'absolute top-50% left-50% transform -translate-50%',
          // flex 水平垂直居中
          'flex-center': 'flex justify-center items-center',
        },
        theme: {
          fontSize: {
            'xs': ['20rpx', '32rpx'],
            'sm': ['24rpx', '36rpx'],
            'base': ['28rpx', '40rpx'],
            'lg': ['32rpx', '44rpx'],
            'xl': ['36rpx', '48rpx'],
            '2xl': ['40rpx', '52rpx'],
          },
          colors: {
            theme: 'var(--color-primary)',
            secondary: 'var(--color-secondary)',

            success: 'var(--color-success)',
            warning: 'var(--color-warning)',
            error: 'var(--color-error)',
            info: 'var(-color-info)',

            h1: 'var(--color-text-primary)',
            h2: 'var(--color-text-regular)',
            h3: 'var(--color-text-secondary)',

            /* placeholder: 'var(--color-text-placeholder)', */
            /* disabled: 'var(--color-text-disabled)', */
            /* link: 'var(--color-text-link)', */
          },
          backgroundColor: {
            base: 'var(--background-color-base)',
          },
          borderColor: {
            light: 'var(--border-color-light)',
            lighter: 'var(--border-color-lighter)',
          },
        },
        rules: [
          [/^m-(\d+)$/, ([, d]: any) => ({ margin: `${d}rpx` })],
          [/^mt-(\d+)$/, ([, d]: any) => ({ 'margin-top': `${d}rpx` })],
          [/^mb-(\d+)$/, ([, d]: any) => ({ 'margin-bottom': `${d}rpx` })],
          [/^ml-(\d+)$/, ([, d]: any) => ({ 'margin-left': `${d}rpx` })],
          [/^mr-(\d+)$/, ([, d]: any) => ({ 'margin-right': `${d}rpx` })],
          [/^mx-(\d+)$/, ([, d]: any) => ({ margin: `0 ${d}rpx` })],
          [/^my-(\d+)$/, ([, d]: any) => ({ margin: `${d}rpx 0` })],
          [/^m-x-(\d+)$/, ([, d]: any) => ({ 'margin-left': `${d}rpx`, 'margin-right': `${d}rpx` })],
          [/^m-y-(\d+)$/, ([, d]: any) => ({ 'margin-top': `${d}rpx`, 'margin-bottom': `${d}rpx` })],

          [/^p-(\d+)$/, ([, d]: any) => ({ padding: `${d}rpx` })],
          [/^pl-(\d+)$/, ([, d]: any) => ({ 'padding-left': `${d}rpx` })],
          [/^pr-(\d+)$/, ([, d]: any) => ({ 'padding-right': `${d}rpx` })],
          [/^pt-(\d+)$/, ([, d]: any) => ({ 'padding-top': `${d}rpx` })],
          [/^pb-(\d+)$/, ([, d]: any) => ({ 'padding-bottom': `${d}rpx` })],
          [/^px-(\d+)$/, ([, d]: any) => ({ padding: `0 ${d}rpx` })],
          [/^py-(\d+)$/, ([, d]: any) => ({ padding: `${d}rpx 0` })],
          [/^p-y-(\d+)$/, ([, d]: any) => ({ 'padding-top': `${d}rpx`, 'padding-bottom': `${d}rpx` })],
          [/^p-x-(\d+)$/, ([, d]: any) => ({ 'padding-left': `${d}rpx`, 'padding-right': `${d}rpx` })],

          [/^w-(\d+)$/, ([, d]: any) => ({ width: `${d}rpx` })],
          [/^h-(\d+)$/, ([, d]: any) => ({ height: `${d}rpx` })],

          [/^top-(\d+)$/, ([, d]: any) => ({ top: `${d}rpx` })],
          [/^bottom-(\d+)$/, ([, d]: any) => ({ bottom: `${d}rpx` })],
          [/^left-(\d+)$/, ([, d]: any) => ({ left: `${d}rpx` })],
          [/^right-(\d+)$/, ([, d]: any) => ({ right: `${d}rpx` })],

          [/^rd-(\d+)$/, ([, d]: any) => ({ 'border-radius': `${d}rpx` })],
          [/^lh-(\d+)$/, ([, d]: any) => ({ 'line-height': `${d}rpx` })],

          [/^gap-(\d+)$/, ([, d]: any) => ({ gap: `${d}rpx` })],
          [/^gap-y-(\d+)$/, ([, d]: any) => ({ gap: `${d}rpx 0` })],
          [/^gap-x-(\d+)$/, ([, d]: any) => ({ gap: `0 ${d}rpx` })],

          [/^rd-t-(\d+)$/, ([, d]: any) => ({ 'border-top-left-radius': `${d}rpx`, 'border-top-right-radius': `${d}rpx` })],
          [/^rd-b-(\d+)$/, ([, d]: any) => ({ 'border-bottom-left-radius': `${d}rpx`, 'border-bottom-right-radius': `${d}rpx` })],
        ],
      }),

      dts({
        rollupTypes: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    build: {
      outDir: 'lib/vue', // 输出文件名
      // 库编译模式配置
      lib: {
        entry: path.resolve(__dirname, './src/components/index.ts'), // 指定组件编译入口文件
        name: 'index',
        fileName: 'index',
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue', 'unocss'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  })
}
