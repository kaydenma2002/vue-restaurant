import { createApp, h } from "vue";
import './style.css'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Services from './views/Services.vue'
import Pricing from './views/Pricing.vue'
import ContactUs from './views/ContactUs.vue'
import Login from './views/Login.vue'
import SignUp from './views/Signup.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import { createRouter, createWebHistory } from 'vue-router'



import App from './App.vue'
import mitt from 'mitt';
const emitter = mitt();
const vuetify = createVuetify({
    components,
    directives,
  })

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home', name: 'Home', component: Home, meta: { authOnly: true }
        },
        
        { path: '/about', name: 'About', component: About },
        { path: '/services', name: 'Services', component: Services },
        { path: '/pricing', name: 'Pricing', component: Pricing },
        { path: '/contactus', name: 'ContactUs', component: ContactUs },
        {
            path: '/login', name: 'Login', component: Login, meta: { guestOnly: true }
        },
        {
            path: '/SignUp', name: 'Register', component: SignUp, meta: { guestOnly: true }
        },
    ]
})
function isLoggedIn() {
    return localStorage.getItem("jwtToken");
}
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({
                path: "/home",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});
const app = createApp({
    render: () => h(App),
  });
app.use(router).use(vuetify)
app.config.globalProperties.emitter = emitter;
app.mount('#app')

