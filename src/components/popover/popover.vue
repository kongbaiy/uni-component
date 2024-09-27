<template>
  <view
    :class="[
      'popover'!,
      `popover-position__${positionY}`,
      `popover-position__${positionX}`,
      block ? 'popover-block' : '',
      show && guide ? 'popover-guid' : '',

    ]"
  >
    <view
      :class="{
        'popover-content-guide': guide,
      }"
      @click="handlePopoverContent"
    >
      <slot />
    </view>

    <view
      v-if="show"
      :class="{
        'popover-list': true!,
        'popover-list__active': active,
      }"
      @transitionend="handleTransitionend"
    >
      <view v-if="$slots.actions">
        <slot
          name="actions"
          :close-popover="closePopover"
        />
      </view>

      <view v-else>
        <view
          v-for="item, index in options"
          :key="item[optionsKey || fieldNames?.value]"
          :class="{
            'popover-list-item': true!,
            'popover-list-item__disabled': item.disabled,
            'popover-list-item__active': activePopoverIndex === index,
          }"
          @click="handlePopoverListItem(item, index)"
        >
          {{ item?.[fieldNames?.label] }}
        </view>
      </view>
    </view>
  </view>

  <view
    v-if="show"
    :class="{
      'popover-mask': true!,
      'popover-mask__active': active,
      'popover-mask__show': (showMask || guide),
    }"
    catchtouchmove="emptyFunction"
    @click="closePopover"
  />
</template>

<script lang="ts" setup>
import { ref, watchPostEffect } from 'vue'
import { NodeSelector } from '../common/index'

  type Filter<Union, Exclude> = Union extends Exclude ? never : Union

  type Position = 'top' | 'bottom' | 'left' | 'right'

  type PositionY = Filter<Position, 'left' | 'right'>

  type PositionX = Filter<Position, 'top' | 'bottom'>

interface IOptions {
  disabled?: boolean
  [key: string]: any
}

interface IFieldNames {
  label: string
  value: any
}

interface IProps {
  boundaryOffset?: number
  options?: IOptions[]
  optionsKey?: string
  fieldNames?: IFieldNames
  modelValue?: any
  showMask?: boolean
  guide?: boolean
  position?: Position
  offsetY?: string
  offsetX?: string
  block?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  fieldNames: () => ({
    label: 'label',
    value: 'value',
  }),
  block: true,
})
const emits = defineEmits(['update:modelValue', 'popover', 'open'])

const { windowWidth = 0, windowHeight = 0 } = uni.getSystemInfoSync()
const show = ref<boolean>(false)
const active = ref<boolean>(false)
const getNode = new NodeSelector()
const positionY = ref<PositionY>(getPropPositionY())
const positionX = ref<PositionX>(getPropPositionX())
const isSetPosition = ref<boolean>(false)
const activePopoverIndex = ref<number>(-1)

watchPostEffect(() => {
  if (show.value) {
    getNode.query('.popover-list', async (plRes) => {
      if (!isSetPosition.value) {
        isSetPosition.value = true

        await getNode.query('.popover', (pRes) => {
          const { boundaryOffset = 0, position } = props
          const popperListOffsetLeft = plRes.left + plRes.width
          const popperListOffsetTop = pRes.top + pRes.height + plRes.height

          if (popperListOffsetLeft > windowWidth - boundaryOffset) positionX.value = 'right'
          else if (!position) positionX.value = 'left'

          if (popperListOffsetTop > windowHeight - boundaryOffset) positionY.value = 'top'
          else if (!position) positionY.value = 'bottom'
        })
      }

      active.value = true
    })
  }

  emits('open', show.value)
})

function handlePopoverContent() {
  if (!show.value) {
    show.value = true
  }
}

function handleTransitionend() {
  if (!active.value) show.value = false
}

function handlePopoverListItem(currentData: IOptions, currentIndex: number) {
  if (currentData.disabled) return

  const { fieldNames } = props
  const value = currentData?.[fieldNames.value]

  activePopoverIndex.value = currentIndex

  closePopover()
  emits('update:modelValue', value)
  emits('popover', currentData, currentIndex)
}

function getPropPositionY() {
  const { position } = props

  if (position === 'top' || position === 'bottom') return position
  return 'bottom'
}

function getPropPositionX() {
  const { position } = props

  if (position === 'left' || position === 'right') return position
  return 'left'
}

function getOffsetY(): string {
  const { offsetY } = props

  return offsetY || '20px'
}

function getOffsetX(): string {
  const { offsetX } = props

  return offsetX || '0'
}

function closePopover() {
  active.value = false
}

defineExpose({
  closePopover,
})
</script>

<style lang="scss" scoped>
  .popover {
    --offset-y: v-bind(getOffsetY());
    --offset-x: v-bind(getOffsetX());
    @apply relative inline-block vertical-middle;
  }

  .popover-block {
    @apply block;
  }

  .popover-guide {
    @apply z-62;
  }

  .popover-content-guide {
    @apply relative z-90 bg-white;
  }

  .popover-list {
    @apply opacity-0 absolute z-62 p-16 bg-white rd-16 translate-y-0 transition-all-200;
  }

  .popover-list-item {
      @apply p-y-10 p-x-36 text-base text-h1;
      &:nth-child(n + 2) {
        @apply mt-8;
      }
  }

  .popover-list-item__active {
      @apply color-theme bg-[rgba(64,158,255,0.08)];
  }

  .popover-position__top .popover-list {
      @apply bottom-80%;
  }

  .popover-position__top .popover-list::after {
      content: "";
      @apply absolute top-99% w-0 h-0 b-14 b-solid b-transparent b-t-white;
  }

  .popover-position__bottom .popover-list {
      @apply top-80%;
  }

  .popover-position__bottom .popover-list::after {
      content: "";
      @apply absolute bottom-99% w-0 h-0 b-14 b-solid b-transparent b-b-white;
  }

  .popover-position__left .popover-list {
      @apply left-[var(--offset-x)];
  }

  .popover-position__left .popover-list::after {
      @apply left-20;
  }

  .popover-position__right .popover-list {
      @apply right-[var(--offset-x)];
  }

  .popover-position__right .popover-list::after {
      @apply right-20;
  }

  .popover-position__top .popover-list__active {
    --y: calc(var(--offset-y) * -1);
      @apply opacity-100 translate-y-[var(--y)];
  }

  .popover-position__bottom .popover-list__active {
      @apply opacity-100 translate-y-[var(--offset-y)];
  }

  .popover-list-item__disabled {
    @apply opacity-30;
  }

  .popover-mask {
      @apply opacity-0 fixed top-0 left-0 z-60 w-full h-full transition-all-200;
  }

  .popover-mask__active {
      @apply opacity-100;
  }

  .popover-mask__show {
      @apply bg-[rgba(0,0,0,0.3)];
  }
  </style>
