import type { App, Component } from 'vue'

import verifyCode from '@/components/button/verify-code.vue'

// const components: Component = [
//   verifyCode,
// ]

// const install = function (Vue: any) {
//   components.forEach((component: Component) => {
//     Vue.component(component.name, component)
//   })
// }

// export default install

const componentPlugin = {
  install(app: App) {
    console.log('app:', app)
    app.component(verifyCode.__name as any, verifyCode)
  },
}

export default componentPlugin
