type DrawerMethodType = {
  methodName: string
  method: Function
}
class DrawerType {
  data: {
    [key: string]: DrawerMethodType[]
  } = {}
  constructor() {}
  addDrawerMethod(key: string, methods: DrawerMethodType[]) {
    this.data[key] = methods
  }
}
export { DrawerType, type DrawerMethodType }
