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
      v-bind:src=image
      alt=""
    />
    <div @click="editContent" class="flex flex-col justify-between p-4 leading-normal">
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
      <p class="text-lg  text-gray-700 dark:text-gray-400">
        ${{ price }}
      </p>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
  props: {
    name: String,
    category: String,
    price: String,
    description: String,
    image: String,
    imageOnClick: Function,
    editContent: Function
  },
  methods:{
    imageOnClick(){
      this.$emit('imageOnClick')
    },
    editContent(){
      this.$emit('editContent')
    }
  }
};
</script>