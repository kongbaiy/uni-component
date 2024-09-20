export function getMapValue(mapData: any[], keys: string[]) {
  let str: string = ''

  mapData.forEach((item, index) => {
    const blank: string = index > 0 ? ' ' : ''

    if (!keys?.length) {
      for (const i in item) {
        const value = item[i]
        str += blank + value
      }
      return
    }

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = item[key]
      if (value) str += blank + value
    }
  })

  return str
}
