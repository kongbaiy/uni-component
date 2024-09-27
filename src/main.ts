import { createSSRApp } from 'vue'

// import vubc from '../lib/vue/index'
import vubc from 'vubc'
import App from './App.vue'

import '../lib/vue/style.css'

export function createApp() {
  const app = createSSRApp(App)

  app.use(vubc, 'zs')
  return {
    app,
  }
}
