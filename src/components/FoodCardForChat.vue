<template>
    <div href="#" class="
              flex flex-col
              items-center
              bg-white
              shadow-md
              md:flex-row md:max-w-xl
              h12
              hover:bg-gray-100
            ">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <img class="rounded-t-lg" v-bind:src="image" alt="" />

            <div class="p-5">

                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ name }} </h5>

                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>
                <p class="text-sm text-gray-700 dark:text-gray-400">${{ price }}</p>
                <div class="ml-auto">
                    <button v-if="enableAddToCart" @click="addToCart(id)">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                    </button>
                    <button v-if="enableRemoveFromCart" @click="RemoveFromCart(id)">
                        <font-awesome-icon icon="fa-solid fa-minus" />
                    </button>
                </div>
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
        enableRemoveFromCart: {
            type: Boolean,
            default: false
        }

    },

};
</script>