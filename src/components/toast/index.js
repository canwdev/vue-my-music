// https://juejin.im/post/5af55f906fb9a07aae153c1c

import Vue from 'vue'
import toastComponent from './toast'

// 返回一个扩展实例构造器
const ToastConstructor = Vue.extend(toastComponent)

// 定义toast组件的函数
function showToast(text, duration = 3000) {
  // 实例化一个toast
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data: ()=>({
      text,
      show: true
    })
  })

  // 把实例化的toast添加到body里
  document.body.appendChild(toastDom.$el)

  // 过了时间后隐藏
  setTimeout(()=>{
    toastDom.show = false
    setTimeout(()=>{ document.body.removeChild(toastDom.$el)}, 1000)
  }, duration)
}

// 注册为全局组件的函数
function registryToast() {
  Vue.prototype.$toast = showToast
}

export default registryToast