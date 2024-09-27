<template>
  <view class="text-sm">
    view
  </view>

  <zs-verify-code
    :delay="60"
    @start="handleCodeButtonStart"
  />

  <zs-popover
    :show-mask="true"
    :guide="true"
    :block="false"
    position="right"
  >
    <view>
      popover
    </view>
    <template #actions>
      <view>adc</view>
    </template>
  </zs-popover>
<!--
  <delete>
    <view>消息</view>
  </delete>

  <expand-text
    :line-clamp="1"
    content="sadfasfdasfafdasfasfafdsafsdfsafasfdsafsafsafsadfsdafsasadfasfdasfafdasfasfafdsafsdfsafasfdsafsafsafsadfsdafsa"
  />

  <popup
    v-model="visiblePopup"
    show-mask
  >
    dada
  </popup> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import verifyCode from '@/components/button/verify-code.vue'
// import popover from '@/components/popover/index.vue'
// import Delete from '@/components/slide/delete.vue'
// import popup from '@/components/popup/index.vue'
// import ExpandText from '@/components/text/index.vue'

const loading = ref<boolean>(true)
const visiblePopup = ref<boolean>(false)

setTimeout(() => {
  loading.value = false
  visiblePopup.value = true
}, 2000)

function handleCodeButtonStart(next: () => void) {
  next()
}
</script>

<style>
.custom-button {
  @apply color-[var(--color-primary)] b-1 b-solid b-[var(--color-primary)] bg-transparent;
}
</style>
