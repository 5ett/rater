import { createApp } from 'vue'
import './style.css'
import router from './router/index'
import App from './App.vue'
import './index.css'

createApp(App).use(router).mount('#app')
