<script>
import Header from "./components/Header.vue";
import Chatbot from "./components/Chatbot.vue";
import Chat from "./components/Chat.vue";
import Footer from "./components/Footer.vue";
export default {
  data() {
    return {
      showFooter: true,
    };
  },
  mounted() {},

  components: {
    Header,
    Footer,
    Chat,
    Chatbot
  },
};
</script>
<template>
  <div class="container-fluid" style="position: relative; min-height: 100vh">
    <Header />
    <div style="margin-top: 8rem"></div>
    <Chat v-if="$route.meta.authOnly == true" />
    <Chatbot v-if="$route.meta.authOnly == true" />
    <router-view></router-view>

    <Footer v-if="$route.name !== 'Profile'" />
  </div>
</template>
