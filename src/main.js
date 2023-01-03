import { createApp } from 'vue'
import './style.css'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Services from './views/Services.vue'
import Pricing from './views/Pricing.vue'
import ContactUs from './views/ContactUs.vue'
import {createRouter, createWebHistory} from 'vue-router'

import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/',name: 'Home',component: Home},
        {path: '/About',name: 'About',component: About},
        {path: '/Services',name: 'Services',component: Services},
        {path: '/Pricing',name: 'Pricing',component: Pricing},
        {path: '/ContactUs',name: 'ContactUs',component: ContactUs}
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
