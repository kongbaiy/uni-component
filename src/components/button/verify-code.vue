<template>
  <default-button
    type="primary"
    size="small"
    class-name="h-52"
    :loading="loading"
    :disabled="disabled"
    @tap="handleTap"
  >
    {{ buttonText }}
  </default-button>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import DefaultButton from './index.vue'

interface IProps {
  title?: string
  delay?: number
}

const props = withDefaults(defineProps<IProps>(), {
  title: '获取验证码',
  delay: 60,
})
const emits = defineEmits(['start'])

const loading = ref<boolean>(false)
const disabled = ref<boolean>(false)
const time = ref<number>(props.delay)
let interval: NodeJS.Timeout | null

const buttonText = computed(() => {
  if (time.value === props.delay) return props.title
  return `${time.value}s`
})

function next() {
  loading.value = true
  startInterval()
}

function handleTap() {
  emits('start', next)
}

function startInterval() {
  if (interval) return

  interval = setInterval(() => {
    if (loading.value) loading.value = false

    if (time.value > 1) {
      time.value -= 1
      disabled.value = true
    }
    else {
      clearInterval(interval as NodeJS.Timeout)
      interval = null
      time.value = props.delay
      disabled.value = false
    }
  }, 1000)
}
</script>
