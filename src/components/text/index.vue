<template>
  <view>
    <view
      v-if="!$slots.content"
      :class="getTextContainerStyle()"
    >
      <view class="content">
        {{ content }}
      </view>
      <view
        v-if="showEllipsis && !isExpand"
        class="ellipsis"
      >
        ...
      </view>
    </view>
    <view
      v-else
      :class="getTextContainerStyle()"
    >
      <view class="text">
        <slot name="content" />
      </view>
    </view>

    <view
      v-if="showEllipsis"
      class="expand"
      @click="handleExpand(!isExpand)"
    >
      {{ isExpand ? collapseText : expandText }}
      <slot name="expand-icon" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { NodeSelector } from '../common/index'

interface IProps {
  content: string
  lineClamp?: number
  baseLineHeight?: number
  expandText?: string
  collapseText?: string
}

const props = withDefaults(defineProps<IProps>(), {
  lineClamp: 1,
  baseLineHeight: 40,
  expandText: '展开',
  collapseText: '收起',
})

const getNode = new NodeSelector()
const showEllipsis = ref<boolean>(false)
const isExpand = ref<boolean>(false)

onMounted(() => {
  const { windowWidth = 0 } = uni.getSystemInfoSync()
  const rpx = windowWidth / 750

  getNode.query('.text', (nodeInfo: any) => {
    const { height } = nodeInfo
    const textHeight = Number.parseInt((height / rpx) as unknown as string)
    const row = Math.round(textHeight / props.baseLineHeight)

    if (row > props.lineClamp) {
      showEllipsis.value = true
    }
  })
})

function handleExpand(status: boolean) {
  isExpand.value = status
}

function getTextContainerStyle() {
  const { lineClamp, baseLineHeight } = props

  if (isExpand.value) return 'of-hidden relative'
  return `of-hidden relative h-${lineClamp * baseLineHeight}`
}
</script>

<style lang="scss" scoped>
  .content {
    @apply text-base color-h1 text;
  }

  .ellipsis {
    @apply absolute bottom-0 right-0;
  }

  .expand {
    @apply flex items-center justify-center mt-8 text-sm color-theme;
  }
</style>
