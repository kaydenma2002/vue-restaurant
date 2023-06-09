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
import Order from "./views/Order.vue";
import OrderDetails from "./views/OrderDetails.vue";
import { AcademicCapIcon } from "@vue-hero-icons/outline";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import "typeface-montserrat";
import { BingMapsMap, BingMapsPushpin } from 'vue-bing-maps';
/* add icons to the library */
library.add(
  faCartShopping,
  faPlus,
  faMinus,
  faTrash,
  faComment,
  faRobot,
  faPaperPlane,
  faMicrophone,
  faEye,
  faCalendarDays
);

import { createRouter, createWebHistory } from "vue-router";
import VueStripeElements from "vue-stripe-elements-plus";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";
import facebookLogin from "facebook-login-vuejs";
import Chat from "vue3-beautiful-chat";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import App from "./App.vue";
import mitt from "mitt";
import { HTTPS } from "./axios/http-axios";
const emitter = mitt();
const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:catchAll(.*)",
      redirect: "/",
    },
    {
      path: "/",
      name: "Home",
      component: Home,
    },

    //web_id
    {
      path: "/:web_id",
      name: "Restaurant",
      component: Home,
    },
    
    {
      path: "/:web_id/order",

      component: Order,
      meta: { authOnly: true },
    },
    {
      path: "/:web_id/order-item",

      component: OrderDetails,

      meta: { authOnly: true },
    },

    {
      path: "/:web_id/menu",

      component: Menu,
      
    },
    {
      path: "/:web_id/profile",

      component: Profile,
      meta: { authOnly: true },
    },
    {
      path: "/:web_id/services",

      component: Services,
      meta: { authOnly: true },
    },
    {
      path: "/:web_id/pricing",

      component: Pricing,
      meta: { authOnly: true },
      
    },
    { path: "/:web_id/ContactUs", component: ContactUs },
    {
      path: "/:web_id/login",

      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: "/:web_id/SignUp",

      component: SignUp,
      meta: { guestOnly: true },
    },
    {
      path: "/:web_id/forgotpassword",

      component: ForgotPassword,
      meta: { guestOnly: true },
    },
    //end web_id

    {
      path: "/get-started",

      component: getStarted,
    },
    {
      path: "/order",

      component: Order,
      meta: { authOnly: true },
    },
    {
      path: "/order-item",

      component: OrderDetails,
      
      meta: { authOnly: true },
    },

    {
      path: "/menu",

      component: Menu,
      
    },
    {
      path: "/profile",

      component: Profile,
      meta: { authOnly: true },
    },
    {
      path: "/services",

      component: Services,
      meta: { authOnly: true },
    },
    {
      path: "/pricing",

      component: Pricing,
      meta: { authOnly: true },
     
    },
    { path: "/ContactUs", component: ContactUs },
    {
      path: "/login",

      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: "/SignUp",

      component: SignUp,
      meta: { guestOnly: true },
    },
    {
      path: "/forgotpassword",

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
      window.scrollTo(0, 0);
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      window.scrollTo(0, 0);
      next();
    }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      window.scrollTo(0, 0);
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      window.scrollTo(0, 0);
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
app.config.globalProperties.eventEmitter = false;
app.component("font-awesome-icon", FontAwesomeIcon);
app.component('VueDatePicker', VueDatePicker);


app.config.globalProperties.emitter = emitter;
app.mount("#app");
