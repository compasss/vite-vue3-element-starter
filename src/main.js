import { createApp } from 'vue'
import App from './App.vue'
import { components, plugins } from './ui'
import './assets/scss/main.scss'

// import ElementPlus from 'element-plus'
// import 'element-plus/packages/theme-chalk/src/base.scss'
// import 'element-plus/lib/theme-chalk/index.css'
// createApp(App).use(ElementPlus).mount('#app')

const app = createApp(App)
components.forEach(component => {
  app.component(component.name, component)
})

plugins.forEach(plugin => {
  app.use(plugin)
})

app.mount('#app')
