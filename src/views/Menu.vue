<template>
  <div class="container mx-auto">
    <div
      class="mt-5   text-center mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl"
    >
    Our Menu
  </div>
    <div v-for="(category, index) in categories" :key="index" class="row menu">
      <div
        class="mt-5  text-center mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl"
        v-if="items.some((item) => item.category === category)"
      >
        {{ category }}
      </div>
      <div
        class="xl:w-auto sm:w-auto lg:w-auto md:w-auto w-auto m-auto h-auto mt-5 grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 mb-10"
      >
        <div
          v-for="(item, index) in filteredItems(category)"
          :key="index"
          class="box-content ..."
        >
          <div class="overlay h-full h-auto">
            <FoodCard
              @editContent="editContent(item)"
              @imageOnClick="ChooseImage(item)"
              :id="item.id"
              :name="item.title"
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
      items: String,
      categories: [],
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
        console.log(res);
        this.items = res.data;
        for (var i = 0; i < this.items.length; i++) {
          this.categories.push(this.items[i].category);
        }
        this.categories = [...new Set(this.categories)];
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
    editContent,
  },
  computed: {
    filteredItems() {
      return (category) =>
        this.items.filter((item) => item.category == category);
    },
  },
};
</script>
