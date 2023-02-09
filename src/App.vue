<script >
import Header from "./components/Header.vue";
import Home from "./views/Home.vue";
import Menu from "./views/Menu.vue";
import Login from "./views/Login.vue";

import Footer from "./components/Footer.vue";
export default {
  data() {
    return {
      showFooter: true,
    };
  },
  components: {
    Header,
    Home,
    Menu,
    Login,
    Footer,
  },
  
};
</script>
<template>
  <div class="container-fluid" style="position: relative; min-height: 100vh">
    <Header />
    <div style="margin-top: 8rem"></div>
    <router-view></router-view>

    <Footer v-if="$route.name !== 'Profile'"  />
  </div>
</template>


