import { createApp, h } from "vue";
import "./style.css";
import Home from "./views/Home.vue";

import Menu from "./views/Menu.vue";
import Services from "./views/Services.vue";
import Pricing from "./views/Pricing.vue";
import ContactUs from "./views/ContactUs.vue";
import Profile from "./views/Profile.vue";
import Login from "./views/Login.vue";
import getStarted from "./views/getStarted.vue";
import SignUp from "./views/Signup.vue";
import ForgotPassword from "./views/forgotPassword.vue";
import Order from "./views/Order.vue"

import { AcademicCapIcon } from "@vue-hero-icons/outline";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

/* add icons to the library */
library.add(faCartShopping, faPlus, faMinus, faComment, faRobot, faPaperPlane, faMicrophone);

import { createRouter, createWebHistory } from "vue-router";
import VueStripeElements from "vue-stripe-elements-plus";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";
import facebookLogin from "facebook-login-vuejs";
import Chat from "vue3-beautiful-chat";

import App from "./App.vue";
import mitt from "mitt";
const emitter = mitt();
const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { authOnly: true },
    },
    {
      path: "/get-started",
      name: "getStarted",
      component: getStarted,
      meta: { authOnly: true },
    },
    {
      path: "/order",
      name: "Order",
      component: Order,
      meta: { authOnly: true },
    },
    {
      path: "/menu",
      name: "Menu",
      component: Menu,
      meta: { authOnly: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: { authOnly: true },
    },
    {
      path: "/services",
      name: "Services",
      component: Services,
      meta: { authOnly: true },
    },
    {
      path: "/pricing",
      name: "pricing",
      component: Pricing,
      meta: { authOnly: true },
    },
    { path: "/contactus", name: "ContactUs", component: ContactUs },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: "/SignUp",
      name: "Register",
      component: SignUp,
      meta: { guestOnly: true },
    },
    {
      path: "/forgotpassword",
      name: "ForgotPassword",
      component: ForgotPassword,
      meta: { guestOnly: true },
    },
  ],
});
function isLoggedIn() {
  return localStorage.getItem("jwtToken");
}
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
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
app
  .use(router)
  .use(VueStripeElements)
  .use(pinia)
  .use(vue3GoogleLogin, {
    clientId:
      "178409542204-l33r0orgtr7st0blomdqpbv99f7iqr94.apps.googleusercontent.com",
  })
  .use(Chat);
app.component("font-awesome-icon", FontAwesomeIcon);

app.config.globalProperties.emitter = emitter;
app.mount("#app");
