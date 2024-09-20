import path from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
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
          [/^m-(\d+)$/, ([, d]) => ({ margin: `${d}rpx` })],
          [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}rpx` })],
          [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}rpx` })],
          [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}rpx` })],
          [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d}rpx` })],
          [/^mx-(\d+)$/, ([, d]) => ({ margin: `0 ${d}rpx` })],
          [/^my-(\d+)$/, ([, d]) => ({ margin: `${d}rpx 0` })],
          [/^m-x-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}rpx`, 'margin-right': `${d}rpx` })],
          [/^m-y-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}rpx`, 'margin-bottom': `${d}rpx` })],

          [/^p-(\d+)$/, ([, d]) => ({ padding: `${d}rpx` })],
          [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}rpx` })],
          [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${d}rpx` })],
          [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}rpx` })],
          [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d}rpx` })],
          [/^px-(\d+)$/, ([, d]) => ({ padding: `0 ${d}rpx` })],
          [/^py-(\d+)$/, ([, d]) => ({ padding: `${d}rpx 0` })],
          [/^p-y-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}rpx`, 'padding-bottom': `${d}rpx` })],
          [/^p-x-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}rpx`, 'padding-right': `${d}rpx` })],

          [/^w-(\d+)$/, ([, d]) => ({ width: `${d}rpx` })],
          [/^h-(\d+)$/, ([, d]) => ({ height: `${d}rpx` })],

          [/^top-(\d+)$/, ([, d]) => ({ top: `${d}rpx` })],
          [/^bottom-(\d+)$/, ([, d]) => ({ bottom: `${d}rpx` })],
          [/^left-(\d+)$/, ([, d]) => ({ left: `${d}rpx` })],
          [/^right-(\d+)$/, ([, d]) => ({ right: `${d}rpx` })],

          [/^rd-(\d+)$/, ([, d]) => ({ 'border-radius': `${d}rpx` })],
          [/^lh-(\d+)$/, ([, d]) => ({ 'line-height': `${d}rpx` })],

          [/^gap-(\d+)$/, ([, d]) => ({ gap: `${d}rpx` })],
          [/^gap-y-(\d+)$/, ([, d]) => ({ gap: `${d}rpx 0` })],
          [/^gap-x-(\d+)$/, ([, d]) => ({ gap: `0 ${d}rpx` })],

          [/^rd-t-(\d+)$/, ([, d]) => ({ 'border-top-left-radius': `${d}rpx`, 'border-top-right-radius': `${d}rpx` })],
          [/^rd-b-(\d+)$/, ([, d]) => ({ 'border-bottom-left-radius': `${d}rpx`, 'border-bottom-right-radius': `${d}rpx` })],
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
}
