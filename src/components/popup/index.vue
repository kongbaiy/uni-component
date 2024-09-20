<template>
  <view
    v-if="show"
    :style="{
      width,
      height,
      background,
    }"
    :class="[
      'popup'!,
      `popup-${position}`,
      active ? `popup-${position}__active` : '',
    ]"
    @transitionend="handleTransitionend"
  >
    <view
      v-if="!$slots.header"
      class="popup-header"
    >
      {{ title }}
      <img
        src="@/assets/images/delete@2x.png"
        alt="关闭"
        class="popup-close"
        @click="handleClose"
      >
    </view>

    <slot v-else name="header" />

    <view class="popup-content">
      <slot v-if="active" />
    </view>
  </view>

  <view
    v-if="showMask && show"
    :class="[
      'popup-mask'!,
      active ? 'popup-mask__active' : '',
    ]"
    catchtouchmove="emptyFunction"
    @click="clickClose && handleClose()"
  />
</template>

<script lang="ts" setup name="Popup">
import { type Ref, ref, watch } from 'vue'
import { NodeSelector } from '../common/index'

type Position = 'top' | 'bottom' | 'center' | 'right' | 'left'

interface IProps {
  modelValue: Ref<boolean>
  title?: string
  clickClose?: boolean
  position?: Position
  width?: string
  height?: string
  background?: string
  showMask?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  clickClose: false,
  showMask: false,
  position: 'bottom',
})
const emits = defineEmits<(e: 'update:modelValue', value: boolean) => void>()

const show = ref<boolean>(false)
const active: Ref = ref<boolean>(false)
const getNode = new NodeSelector()

watch(props, (newProps: IProps) => {
  if (newProps.modelValue) {
    show.value = true
    getNode.query('.popup', () => {
      active.value = newProps.modelValue
    })
  } else {
    active.value = false
  }
}, {
  deep: true,
})

function handleClose() {
  emits('update:modelValue', false)
}

function handleTransitionend() {
  if (!props.modelValue && !active.value) show.value = false
}
</script>

  <style lang="scss" scoped>
  .popup-mask {
    @apply opacity-0 fixed top-0 left-0 z-30 w-full h-full bg-[rgba(0,0,0,0.3)] transition-all-200;
  }

  .popup-mask__active {
    @apply opacity-100;
  }

  .popup {
    @apply of-hidden flex-col fixed z-32 transition-all-200;
  }

  .popup-header {
    @apply relative mt-40 text-xl text-center color-h1;
  }

  .popup-bottom {
    @apply left-0 bottom-0 translate-y-100% w-full bg-white rd-t-32 transition-all-200;
  }

  .popup-bottom__active {
    @apply translate-y-0;
  }

  .popup-content {
    @apply flex-1 overflow-y-scroll mt-32 px-56;
    -webkit-overflow-scrolling: touch;
  }

  .popup-close {
    @apply absolute top-[-14] right-32 w-36 h-36;
  }
  </style>
