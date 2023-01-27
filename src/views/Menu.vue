<template>
  <div class="container mx-auto">
    <button
      @click="redirectToPayment()"
      style="position: fixed; bottom: 20rem; right: 1rem"
      type="button"
      class="
        text-white
        bg-gradient-to-r
        from-blue-500
        via-blue-600
        to-blue-700
        hover:bg-gradient-to-br
        focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:focus:ring-blue-800
        shadow-lg shadow-blue-500/50
        dark:shadow-lg dark:shadow-blue-800/80
        font-medium
        rounded-lg
        text-sm
        px-10
        py-5
        text-center
        mr-2
        mb-2
      "
    >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
  Save
    </button>

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
          sm:w-auto
          lg:w-auto
          md:w-auto
          w-auto
          m-auto
          h-auto
          mt-5
          grid grid-cols-2
          xl:grid-cols-3
          lg:grid-cols-2
          md:grid-cols-2
          sm:grid-cols-2
          gap-4
          mb-10
        "
      >
        <div
          v-for="(item, index) in MainDish"
          :key="index"
          class="box-content ..."
        >
          <div class="overlay">
            <FoodCard
              ref="MainDish"
              @editContent="editContent(item)"
              @imageOnClick="ChooseImage(item)"
              :name="item.name"
              :description="item.description"
              :price="item.price"
              :image="item.image"
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
        Side Order
      </div>
      <div
        class="
          xl:w-auto
          sm:w-auto
          lg:w-auto
          md:w-auto
          w-auto
          m-auto
          h-auto
          mt-5
          grid grid-cols-2
          xl:grid-cols-3
          lg:grid-cols-2
          md:grid-cols-2
          sm:grid-cols-2
          gap-4
          mb-10
        "
      >
        <div
          v-for="(item, index) in SideOrder"
          :key="index"
          ref="sideOrder"
          class="box-content ..."
        >
          <div class="overlay">
            <FoodCard
              @editContent="editContent(item)"
              @imageOnClick="ChooseImage(item)"
              :name="item.name"
              :description="item.description"
              :price="item.price"
              :image="item.image"
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
          sm:w-auto
          lg:w-auto
          md:w-auto
          w-auto
          m-auto
          h-auto
          mt-5
          grid grid-cols-2
          xl:grid-cols-3
          lg:grid-cols-2
          md:grid-cols-2
          sm:grid-cols-2
          gap-4
          mb-10
        "
      >
        <div
          v-for="(item, index) in Drink"
          :key="index"
          class="box-content ..."
        >
          <div class="overlay">
            <FoodCard
              @editContent="editContent(item)"
              @imageOnClick="ChooseImage(item)"
              :name="item.name"
              :description="item.description"
              :price="item.price"
              :image="item.image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import FoodCard from "../components/FoodCard.vue";
import { HTTPS } from "../axios/http-axios";
import {
  localStorageImport,
  localStorageExport,
} from "../localStorage/local-storage";
import { editContent } from "../changeType/menu-item";
export default {
  components: { FoodCard },
  data() {
    return {
      item: String,
    };
  },
  created() {
    this.emitter.on("login", () => {
      this.isLoggedIn = true;
    });
    this.isLoggedIn = !!localStorageExport("jwtToken");
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      HTTPS.get("/menu").then((res) => {
        this.item = res.data.item;
        console.log(this.item);
      });
    }
  },
  methods: {
    ChooseImage(item) {
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
            item.image = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      })();
    },
    redirectToPayment(){
      this.$router.push("/Pricing")
    },
    editContent,
  },
  computed: {
    MainDish: function () {
      return Object.values(this.item).filter((i) => i.food_type == 0);
    },
    SideOrder: function () {
      return Object.values(this.item).filter((i) => i.food_type == 1);
    },
    Drink: function () {
      return Object.values(this.item).filter((i) => i.food_type == 2);
    },
  },
};
</script>