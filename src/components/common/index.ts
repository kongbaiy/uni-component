import { type ComponentInternalInstance, getCurrentInstance } from 'vue'

/**
 * 获取节点
 */
export class NodeSelector {
  private instance: ComponentInternalInstance | null
  constructor() {
    this.instance = getCurrentInstance()
  }

  query(name: string, callback: (result: UniApp.NodeInfo | UniApp.NodeInfo[] | any) => void) {
    const query = uni.createSelectorQuery().in(this.instance)
    query.select(name).boundingClientRect(callback).exec()
  }

  queryScrollOffset(name: string, callback: (result: UniApp.NodeInfo | UniApp.NodeInfo[]) => void) {
    const query = uni.createSelectorQuery().in(this.instance)

    query.select(name).scrollOffset(callback).exec()
  }
}

/**
 * hex 转 rgba
 *
 * @param {string} str
 * @param {number} alpha
 */
export function hexToRgba(str: string, alpha: number = 1) {
  const reg = /^#(?:[0-9A-F]{3}|[0-9A-F]{6})$/i

  if (!reg.test(str)) return ''

  let newString = (str.toLowerCase()).replace(/#/g, '')
  if (newString.length === 3) {
    let t = ''

    for (let i = 0; i < newString.length; i++) {
      t += newString.slice(i, i + 1).concat(newString.slice(i, i + 1))
    }
    newString = t
  }

  const rgbaArray = [] // 将字符串分隔，两个两个的分隔
  for (let i = 0; i < 6; i = i + 2) {
    const s = newString.slice(i, i + 2)
    rgbaArray.push(Number.parseInt(`0x${s}`))
  }

  return `rgba(${rgbaArray.join(',')},${alpha})`
}

/**
 * 获取系统导航高度
 *
 * @return {number}
 */
export function getSystemNavHeight(): number {
  const { statusBarHeight = 0 } = uni.getSystemInfoSync() // 状态栏高度
  const { top, height } = uni.getMenuButtonBoundingClientRect() // 胶囊高度
  const navbarHeight = (top - statusBarHeight) * 2 + height // 导航栏高度

  return navbarHeight + statusBarHeight
}

/**
 * 判断是否为空
 *
 * @export
 * @param {object} obj
 * @return {boolean}
 */
export function isNull(obj: any): boolean {
  if (
    Object.prototype.toString.call(obj) === '[object Object]'
    && !Reflect.ownKeys(obj).length
  ) { return true
  }

  if (Array.isArray(obj) && !obj.length) return true

  if (!(obj instanceof Object)
    && (obj === undefined || obj === null || obj === '')
  ) { return true
  }

  return false
}
