import type { App, Component } from 'vue'

type TInstall = Component & any

export function installComponent(component: TInstall) {
  return component.install = (app: App, prefix?: string) => {
    const name = prefix ? `${prefix}-${component.__name}` : component.__name

    app.component(name, component)
    return app
  }
}
