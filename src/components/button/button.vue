<template>
  <view
    :class="getButtonBoxClass()"
  >
    <button
      :open-type="openType"
      :form-type="formType"
      :disabled="disabled"
      :loading="loading"
      :style="getButtonStyle()"
      :class="getButtonClass()"
      hover-class="button__hover"
      @getphonenumber="handleGetPhoneNumber"
      @getuserinfo="handleGetUserInfo"
      @chooseavatar="handleChooseavatar"
      @click="handleClick"
    >
      <slot />
    </button>
  </view>
</template>

<script lang="ts">
import { type ComponentInternalInstance, getCurrentInstance, ref } from 'vue'
import { getMapValue } from '../common'
import { heightMap, sizeMap, typeMap } from './map'

export default {
  behaviors: ['wx://form-field-button'],
}
</script>

<script lang="ts" setup>
type Type = 'primary' | 'success' | 'warning' | 'danger' | 'stop'

type FormType = 'submit' | 'reset'

type Size = 'mini' | 'small' | 'normal' | 'large'

interface IProps {
  type?: Type
  size?: Size
  block?: boolean
  plain?: boolean
  shadow?: string
  color?: string
  borderColor?: string
  background?: string
  radius?: string
  restyle?: AnyObject | string
  disabled?: boolean
  className?: string
  loading?: boolean
  openType?: string
  formType?: FormType
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'small',
})
const emits = defineEmits(['getphonenumber', 'getuserinfo', 'chooseavatar', 'submit', 'reset'])
const instance: ComponentInternalInstance | any = getCurrentInstance()

const newButtonClass = ref<string>(
  getMapValue([
    sizeMap,
    heightMap,
    typeMap,
  ], [props.size, props.type as string]),
)

function handleGetPhoneNumber(e: CustomEventInit) {
  emits('getphonenumber', e)
}

function handleGetUserInfo(e: CustomEventInit) {
  emits('getuserinfo', e)
}

function handleChooseavatar(e: CustomEventInit) {
  emits('chooseavatar', e)
}

function handleClick() {
  const { formType } = props
  const { exposed } = instance.parent || {}

  switch (formType) {
    case 'submit':
      exposed?.validate?.((formValue: any) => emits('submit', formValue))
      break

    case 'reset':
      exposed?.resetForm?.()
      break
  }
}

function getButtonBoxClass() {
  const { block, loading } = props
  const classNames = ['v-top']

  if (!block) classNames.push('inline-block')
  if (loading) classNames.push('pointer-events-none')

  return classNames.join(' ')
}

function getButtonStyle(): string | AnyObject {
  const { radius, size, color, borderColor, background, shadow, restyle } = props

  if (restyle) return restyle

  const height: number = heightMap[size]?.replace(/h|-/g, '')
  const defaultRadius = `${height / 2 + 1}rpx`
  const style: AnyObject = {
    borderRadius: radius || defaultRadius,
  }

  if (color) style.color = color
  if (borderColor) style.borderColor = borderColor
  if (background) style.background = background
  if (shadow) style.boxShadow = shadow

  return style
}

function getButtonClass(): string {
  const { restyle, plain, disabled, className = '' } = props
  if (restyle) return ''

  const plainClass = plain ? `plain plain-${props.type}` : ''
  const disabledClass = disabled ? 'button__disabled' : ''

  return `button ${newButtonClass.value} ${plainClass} ${disabledClass} ${className}`
}
</script>

<style lang="scss" scoped>
.button {
  @apply flex items-center justify-center px-36;
}

.primary {
  @apply text-white bg-theme;
}

.danger {
  color: #fff;
  background: var(--color-error);
}

.stop {
  color: #fff;
  background: var(--color-stop);
}

.plain {
  @apply bg-transparent;
}

.plain-primary {
  @apply color-[var(--color-primary)] b-1 b-solid b-[var(--color-primary)];
}

.plain-danger {
  @apply color-[var(--color-error)] b-1 b-solid b-[var(--color-error)];
}

.plain-stop {
  @apply color-[var(--color-stop)] b-1 b-solid b-[var(--color-stop)];
}

.button__hover {
  @apply important-op-60;
}

.button__disabled {
  @apply b-transparent;
}
</style>
