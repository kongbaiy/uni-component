<template>
  <scroll-view
    scroll-x
    :style="restyle"
    :scroll-left="scrollLeft"
    enable-passive
    scroll-anchoring
    scroll-with-animation
    :show-scrollbar="showScrollbar"
    :enhanced="showScrollbar"
    :class="`scroll-tab ${className}`"
  >
    <view
      v-for="item, index in data"
      :key="item[dataKey!]"
      class="slot-content"
      @click="handleSlotContent(index)"
    >
      <slot
        :current-data="item"
        :current-index="index"
      />
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { NodeSelector } from '../common/index'

interface IProps {
  data?: any[]
  dataKey?: string
  className?: string
  restyle?: string | object
  showScrollbar?: boolean
}

defineProps<IProps>()
const scrollLeft = ref<number>(0)
const getNode = new NodeSelector()
const scrollTabWidth = ref<number>(0)

onMounted(() => {
  getNode.query('.scroll-tab', (nodeInfo: any) => scrollTabWidth.value = nodeInfo.width)
})

function handleSlotContent(currentIndex: number) {
  getNode.query('.slot-content', (nodeInfo: any) => {
    scrollLeft.value = getScrollTabValue(nodeInfo.width, currentIndex)
  })
}

function getScrollTabValue(cellWidth: number, currentIndex: number): number {
  const index = currentIndex + 1
  const baseIndex = Number((scrollTabWidth.value / 2) / cellWidth)
  let value = 0

  if (index >= baseIndex) value = cellWidth * (index - baseIndex)

  return value
}
</script>

<style lang="scss" scoped>
  .scroll-tab {
    @apply font-size-0 ws-nowrap v-baseline;
  }

  .slot-content {
    @apply of-hidden inline-block;
  }
</style>
