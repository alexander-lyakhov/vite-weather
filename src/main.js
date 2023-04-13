import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/reset.css'
import './styles/main.scss'

const app = createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
