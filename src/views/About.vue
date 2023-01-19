<template>
  <div class="container mx-auto">
    <div class="row menu">
      <div
        class="
          mt-5
          underline underline-offset-3
          text-center
          mb-4
          text-4xl
          font-extrabold
          leading-none
          tracking-tight
          
          md:text-4xl
          lg:text-5xl
          animate-bounce
        "
      >
        Main Dishes
      </div>
      <div
        class="
          xl:w-auto
          sm:w-3/4
          lg:w-auto
          md:w-3/4
          w-3/4
          m-auto
          h-auto
          mt-5
          grid grid-cols-2
          xl:grid-cols-3
          lg:grid-cols-3
          md:grid-cols-2
          sm:grid-cols-2
          gap-4
          mb-10
        "
      >
        <div
          v-for="(item, index) in 24"
          :key="index"
          class="box-content  ..."
        >
          <div class="overlay">
            <FoodCard />
          </div>
        </div>
      </div>
    </div>
    <div class="row menu">
      <div
        class="
          mt-5
          underline underline-offset-3
          text-center
          mb-4
          text-4xl
          font-extrabold
          leading-none
          tracking-tight
          
          md:text-4xl
          lg:text-5xl
          animate-bounce
        "
      >
        Appetizer
      </div>
      <div
        class="
          xl:w-auto
          sm:w-3/4
          lg:w-auto
          md:w-3/4
          w-3/4
          m-auto
          h-auto
          mt-5
          grid grid-cols-2
          xl:grid-cols-6
          lg:grid-cols-4
          md:grid-cols-2
          sm:grid-cols-2
          gap-4
          mb-10
        "
      >
        <div v-for="n in 24" :key="n" class="box-content border-4 ...">
          <div class="overlay">
            <img
              class="hover:scale-110 transition-all duration-700 cursor-pointer"
              src="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
              alt="image description"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row menu">
      <div
        class="
          mt-5
          underline underline-offset-3
          text-center
          mb-4
          text-4xl
          font-extrabold
          leading-none
          tracking-tight
          
          md:text-4xl
          lg:text-5xl
          animate-bounce
        "
      >
        Drinks
      </div>
      <div
        class="
          xl:w-auto
          sm:w-3/4
          lg:w-auto
          md:w-3/4
          w-3/4
          m-auto
          h-auto
          mt-5
          grid grid-cols-2
          xl:grid-cols-6
          lg:grid-cols-4
          md:grid-cols-2
          sm:grid-cols-2
          gap-4
          mb-10
        "
      >
        <div v-for="n in 24" :key="n" class="box-content border-4 ...">
          <div class="overlay">
            <img
              class="hover:scale-110 transition-all duration-700 cursor-pointer"
              src="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
              alt="image description"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import FoodCard from "../components/FoodCard.vue"
import {HTTPS} from "../axios/http-axios"

export default {
  components: { FoodCard },
  mounted() {
    // HTTPS.get("/menu").then(res => console.log(res))
  },
  methods: {
    ChooseImage(index) {
      (async () => {
        const { value: file } = await Swal.fire({
          title: "Select image",
          input: "file",
          inputAttributes: {
            accept: "image/*",
            "aria-label": "Upload your profile picture",
          },
        });

        if (file) {
          var canvas = document.createElement("canvas");
          const reader = new FileReader();
          reader.onload = (e) => {
            this.$refs.appetizers[index].src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      })();
    },
  },
};
</script>