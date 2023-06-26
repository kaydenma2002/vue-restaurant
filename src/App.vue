<script>
import Header from "./components/Header.vue";
import Chatbot from "./components/Chatbot.vue";
import Chat from "./components/Chat.vue";
import Footer from "./components/Footer.vue";
import { HTTP } from "./axios/http-axios"

export default {
  data() {
    return {
      showFooter: true,
    };
  },
  created(){
    if (this.$route.params.web_id) {
      HTTP.post("restaurant/find", { web_id: this.$route.params.web_id })
        .then((res) => {
          if (res.data.length != 0) {
            
            console.log(res);
          }else{
            this.$router.push("/");
            
          }
        })
        .catch((error) => {
          this.$router.push("/");
          
        });
    }
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
  <div class="container-fluid bg-white" style="position: relative">
    <Header />
    <div style="margin-top: 8rem"></div>
    <Chat v-if="$route.meta.authOnly == true" />
    <Chatbot v-if="$route.meta.authOnly == true" />
    <Footer />
    <router-view></router-view>

    
  </div>
</template>
