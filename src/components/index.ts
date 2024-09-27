import type { App, Component } from 'vue'

import button from './button/button.vue'
import verifyCode from './verify-code/verify-code.vue'
import popover from './popover/popover.vue'
import 'uno.css'
import '../assets/css/var.css'
import './index.scss'

export {
  button,
  verifyCode,
  popover,
}

const components: Component = [
  verifyCode,
  button,
  popover,
]

const componentPlugin = {
  install(app: App, prefix: string) {
    components.forEach((component: Component | any) => {
      const name = prefix ? `${prefix}-${component.__name}` : component.__name
      app.component(name, component)
    })
  },
}

export default componentPlugin
