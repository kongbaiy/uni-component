<template>
  <view
    class="slide-action-box"
    @touchstart="handleTouchstart"
    @touchmove="handleTouchmove"
    @touchend="handleTouchEnd"
  >
    <view
      :style="slideActionContentStyle"
      class="slide-action-content"
    >
      <view class="slide-action-slot">
        <slot />
      </view>
      <view
        class="slide-action"
      >
        <slot name="action" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { NodeSelector } from '../common/index'

const getNode = new NodeSelector()
const slideActionContentStyle = ref()
const currentXOffset = ref<number>(0)
const open = ref<boolean>(false)
const slideActionWidth = ref<number>(0)
let _startX = 0
let _moveX = 0

onLoad(() => {
  getNode.query('.slide-action', (res) => {
    slideActionWidth.value = res.width
  })
})

function handleTouchstart(e: TouchEvent) {
  const { pageX = 0 } = e.changedTouches?.[0] || {}

  _startX = pageX
}

function handleTouchmove(e: TouchEvent) {
  const { pageX = 0 } = e.changedTouches?.[0] || {}
  let addOffset: number = 0

  if (!slideActionWidth.value) return
  _moveX = pageX

  if (open.value) addOffset = slideActionWidth.value
  currentXOffset.value = _startX - _moveX

  if (currentXOffset.value > 0) {
    setSlideActionContentStyle({
      transform: `translate3d(-${currentXOffset.value + addOffset}px, 0, 0)`,
    })
  }
}

function handleTouchEnd() {
  if (currentXOffset.value < 60) {
    currentXOffset.value = 0
    closeSlideAction(() => {
      open.value = false
    })

    return
  }

  startSlideAction(() => {
    open.value = true
  })
}

function setSlideActionContentStyle(style: Partial<CSSStyleDeclaration>) {
  slideActionContentStyle.value = style
}

async function startSlideAction(callback?: () => void) {
  await setSlideActionContentStyle({
    transform: `translate3d(-${slideActionWidth.value}px, 0, 0)`,
    transitionDuration: '300ms',
  })
  callback?.()
}

async function closeSlideAction(callback?: () => void) {
  await setSlideActionContentStyle({
    transform: `translate3d(0, 0, 0)`,
    transitionDuration: '300ms',
  })
  callback?.()
}

defineExpose({
  startSlideAction,
  closeSlideAction,
})
</script>

  <style lang="scss" scoped>
  .slide-action-box {
    @apply of-hidden relative;
  }

  .slide-action-content {
    @apply flex transition-property-transform transition-duration-0 transition-ease-out;
  }

  .slide-action-slot {
    @apply min-w-full;
  }

  .slide-action {
    @apply min-h-full;
  }
  </style>
