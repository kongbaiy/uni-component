import { createSSRApp } from 'vue'

import App from './App.vue'
import 'uno.css'
import './assets/css/var.css'
import './components/index.scss'
import zs from './components/index.ts'

export function createApp() {
  const app = createSSRApp(App)
  app.use(zs)

  return {
    app,
  }
}
