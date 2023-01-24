<script setup>
import Header from "./components/Header.vue";
import Home from "./views/Home.vue";
import Menu from "./views/Menu.vue";
import Login from "./views/Login.vue";

import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="container-fluid" style="position: relative;
    min-height: 100vh;">
    <Header />
    <div style="margin-top:8rem"></div>
    <router-view></router-view>

    <Footer />
  </div>
</template>


