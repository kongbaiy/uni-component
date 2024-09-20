<template>
  <form>
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { type ComponentInternalInstance, getCurrentInstance } from 'vue'
import { type IFormValidatorOptions, formValidator } from '../form/validator'

export type PromptMode = 'toast' | 'message'
export type Layout = 'left' | 'right' | 'top'

interface IProps extends Pick<IFormValidatorOptions, 'rules'> {
  layout?: Layout
  modelValue: any
  promptMode: PromptMode
}

const props = withDefaults(defineProps<IProps>(), {
  promptMode: 'message',
})
const emits = defineEmits<(e: 'update:modelValue', value: any) => void>()
const instance: ComponentInternalInstance | any = getCurrentInstance()

defineExpose({
  ...props,
  validate: (callback: <T>(data: T) => void) => {
    const { rules, modelValue: formData = {} } = props
    const children = instance.proxy?.$children

    children.forEach((item: any) => item?.setErrorMessage?.(''))

    formValidator({
      formData,
      rules,
    }).then(callback).catch((error) => {
      const { currentRule } = error

      if (props.promptMode === 'toast') {
        uni.showToast({
          title: currentRule.message,
          icon: 'none',
        })
        return
      }

      const { setErrorMessage } = children.find((item: any) => item.prop === error.key) || {}
      setErrorMessage?.(currentRule.message)
    })
  },
  resetForm: () => {
    emits('update:modelValue', {})
  },
})
</script>
