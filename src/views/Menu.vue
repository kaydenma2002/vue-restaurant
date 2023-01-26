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
              :name="MainDish[index].name"
              :description="MainDish[index].description"
              :price="MainDish[index].price"
              :image="MainDish[index].image"
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
          @click="ChooseImage(index)"
          ref="sideOrder"
          class="box-content ..."
        >
          <div class="overlay">
            <FoodCard
              :name="SideOrder[index].name"
              :description="SideOrder[index].description"
              :price="SideOrder[index].price"
              :image="SideOrder[index].image"
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
              :name="Drink[index].name"
              :description="Drink[index].description"
              :price="Drink[index].price"
              :image="Drink[index].image"
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
    console.log(this.isLoggedIn)
    if (this.isLoggedIn) {
      
      HTTPS.get("/menu").then(res => {
        this.item = res.data.item;
        console.log(this.item)
      });
    }
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
            this.$refs.sideOrder[index].image = e.target.result;
            console.log(e)
          };
          reader.readAsDataURL(file);
        }
      })();
    },
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