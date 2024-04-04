import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "tailwindcss/tailwind.css"
import { router } from './routers/index'



const app = createApp(App)
app.use(router).mount('#app')
