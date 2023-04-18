<template>
  <div
    href="#"
    class="
      flex flex-col
      items-center
      bg-white
      shadow-md
      md:flex-row md:max-w-xl
      hover:bg-gray-100
      h-full h-auto
    "
  >
    <img
      class="
        object-cover
        w-full
        rounded-t-lg
        h-96
        md:h-auto md:w-48 md:rounded-none md:rounded-l-lg
      "
      @click="imageOnClick"
      v-bind:src="image"
      alt=""
    />
    <div class="flex flex-col justify-between p-4 leading-normal w-full">
      <div @click="editContent">
        <h5
          class="
            mb-2
            text-2xl
            font-bold
            tracking-tight
            text-gray-900
            dark:text-white
          "
        >
          {{ name }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ description }}
        </p>
        <p class="text-lg text-gray-700 dark:text-gray-400">${{ price }}</p>
      </div>
      <div class="ml-auto">
        
        <button v-if="enableAddToCart" @click.prevent="addToCart(id)">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>

        <button v-if="enableRemoveFromCart" @click.prevent="RemoveFromCart(id)">
          <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { numeric } from "@vuelidate/validators";
import { HTTPS } from "../axios/http-axios"
export default {
  props: {
    id: String,
    name: String,
    category: String,
    price: String,
    description: String,
    image: String,
    imageOnClick: Function,
    editContent: Function,
    enableAddToCart: {
      type: Boolean,
      default: true
    },
    enableRemoveFromCart:{
      type:Boolean,
      default: false
    }

  },
  methods: {
    imageOnClick() {
      this.$emit("imageOnClick");
    },
    editContent() {
      this.$emit("editContent");
    },
    addToCart(item_id) {
      
      HTTPS.post("/create/cart",{
        item_id: item_id
      }).then(res => {
        console.log(res)
        this.emitter.emit("cartUpdated");
      }).catch(error => {
        console.log(error)
      })
    },
    RemoveFromCart(id) {
      
      HTTPS.post("/removeCartById", {
        id: id
      }).then(res => {
        console.log((res))
        this.emitter.emit("cartUpdated");
      }).catch(error => {
        console.log(error)
      })
    },
  },
};
</script>