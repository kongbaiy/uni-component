<template>
  <view :class="getContainerClass(newLayout as Layout)">
    <view
      :style="{ width: newLabelWidth }"
      class="text-base text-h1"
    >
      {{ label }}
      <text v-if="required" class="color-error">
        *
      </text>
    </view>
    <view>
      <slot />
    </view>
  </view>
  <view class="text-base text-error">
    <text v-if="message.length">
      {{ message }}
    </text>
  </view>
</template>

<script lang="ts" setup>
import { type ComponentInternalInstance, getCurrentInstance, ref } from 'vue'
import type { Layout } from './index.vue'

interface IProps {
  prop?: string
  label?: string
  required?: boolean
  layout?: Layout
  labelClass?: string
  labelWidth?: string | number
}

const props = withDefaults(defineProps<IProps>(), {
  layout: 'left',
  labelWidth: 'auto',
})
const instance: ComponentInternalInstance | any = getCurrentInstance()
const { exposed } = instance.parent || {}
const newLayout: IProps['layout'] = (exposed?.layout || props.layout) as Layout
const newLabelWidth: IProps['labelWidth'] = (exposed?.labelWidth || props.labelWidth)
const message = ref<string>('')

function getContainerClass(layout: Layout) {
  const _unocss = {
    left: 'flex',
    right: 'flex text-right',
    top: 'flex flex-col',
  }

  return `${_unocss[layout]} ${props.labelClass || ''}`
}

defineExpose({
  ...props,
  setErrorMessage(text: string) {
    message.value = text
  },
})
</script>
