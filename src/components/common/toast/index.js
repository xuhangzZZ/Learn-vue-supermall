
import Toast from "./Toast"
export default {
  install(Vue){
    //创建组件
    const constructor=Vue.extend(Toast)
    //实例化组件
    const toast= new constructor()
    //给组件挂载一个元素
    toast.$mount(document.createElement('div'))
    //把组件元素插入到文档里
    document.body.appendChild(toast.$el)
    //导出组件
    Vue.prototype.$toast=toast
  }
}