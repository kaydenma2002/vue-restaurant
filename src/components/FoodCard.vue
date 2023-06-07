<template>
  <div
    @click="
      confirmAddToCart(id);
      showPopup = true;
    "
    class="flex flex-col items-center bg-white shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 h-full h-auto"
  >
    <img
      class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
      :src="`/src/img/menu/${image}`"
      alt=""
    />
    <div class="flex flex-col justify-between p-4 leading-normal w-full">
      <div>
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ name }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ description }}
        </p>
        <p class="text-lg text-gray-700 dark:text-gray-400">${{ price }}</p>
        <div
          v-if="quantityConfirmPricing != null"
          class="flex mb-2 px-16 mt-2 justify-between"
        >
          <button
            :class="{
              'cursor-not-allowed': quantityConfirmPricing <= 1,
              'focus:outline-none': true,
            }"
            :disabled="quantityConfirmPricing <= 1"
            @click.stop.prevent="confirmDecreaseQuantity(id)"
          >
            <font-awesome-icon
              class="text-gray-900 bg-gray-300 hover:bg-gray-400 rounded p-2 transition duration-250"
              :icon="['fas', 'minus']"
            />
          </button>
          <div class="">{{ quantityConfirmPricing }}</div>
          <button
            @click.stop.prevent="confirmIncreaseQuantity(id)"
            :class="{ 'focus:outline-none': true }"
          >
            <font-awesome-icon
              class="text-gray-900 bg-gray-300 hover:bg-gray-400 rounded p-2 transition duration-250"
              :icon="['fas', 'plus']"
            />
          </button>
        </div>
        <div class="text-right">
          <button
            v-if="quantityConfirmPricing != null"
            @click.stop.prevent="deleteItemFromCart(id)"
            :class="{ 'focus:outline-none': true }"
          >
            <font-awesome-icon
              class="text-red-600 bg-gray-300 hover:bg-gray-400 rounded p-2 transition duration-250"
              :icon="['fas', 'trash']"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="showPopup && quantity == null"
    tabindex="-1"
    class="popup-modal-container fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0"
  >
    <div class="relative w-full max-w-md max-h-full popup-modal py-4">
      <div class="relative bg-white py-4 rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click="closePopUp()"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="text-center">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style="width: 100%; height: 3rem; text-align: center"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            ></path>
          </svg>
          <h4>Add this product?</h4>
          <br />
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ nameConfirm }}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ descriptionConfirm }}
          </p>
          <p class="text-lg text-gray-700 dark:text-gray-400">
            ${{ priceConfirm }}
          </p>
          <div class="flex justify-center mb-2 mt-2">
            <button
              :class="{ 'cursor-not-allowed': quantityConfirm <= 0 }"
              :disabled="quantityConfirm <= 0"
              @click.stop.prevent="decreaseQuantity"
            >
              <font-awesome-icon
                class="text-white bg-black rounded p-2 hover:bg-gray-700 transition duration-250"
                :icon="['fas', 'minus']"
              />
            </button>
            <div class="px-2">{{ quantityConfirm }}</div>
            <button @click.stop.prevent="increaseQuantity">
              <font-awesome-icon
                class="text-white bg-black rounded p-2 hover:bg-gray-700 transition duration-250"
                :icon="['fas', 'plus']"
              />
            </button>
          </div>
          <button
            @click.stop.prevent="
              addToCart(id, restaurant_id, quantityConfirm);
              closePopUp();
            "
            type="button"
            class="text-white bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 mt-2"
          >
            Add to cart
          </button>
          <button
            @click="closePopUp()"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { numeric } from "@vuelidate/validators";
import { HTTP, HTTPS } from "../axios/http-axios";
import {
  localStorageExport,
  localStorageImport,
  localStorageRemove,
} from "../localStorage/local-storage";

export default {
  props: {
    id: Number,
    restaurant_id: Number,
    name: String,
    category: String,
    price: Number,
    description: String,
    image: String,
    quantity: String,
    enableAddToCart: {
      type: Boolean,
      default: true,
    },
    enableRemoveFromCart: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showPopup: false,
      restaurant: null,
      nameConfirm: null,
      priceConfirm: null,
      quantityConfirm: 1,
      quantityConfirmPricing: null,
      descriptionConfirm: null,
    };
  },
  created() {
    console.log(this.id);
    if (this.checkRoute(this.$route.fullPath) == true) {
      this.quantityConfirmPricing = this.quantity;
    }
  },

  methods: {
    checkRoute(route) {
      const pattern = /^\/[^/]+\/pricing$/;

      // Test the sentence against the pattern
      return pattern.test(route);
    },
    deleteItemFromCart(id) {
      HTTPS.post("removeCartById", {
        id: id,
      }).then((res) => {
        console.log(res);
        this.emitter.emit("cartUpdated");
      });
    },
    closePopUp() {
      this.quantityConfirm = 1;
      this.showPopup = false;
    },
    confirmIncreaseQuantity(id) {
      this.quantityConfirmPricing++;
      HTTPS.post("updateCartById", {
        id: id,
        type: "increase",
        quantity: this.quantityConfirmPricing,
      })
        .then((res) => {
          this.emitter.emit("cartUpdated");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    confirmDecreaseQuantity(id) {
      this.quantityConfirmPricing--;
      HTTPS.post("updateCartById", {
        id: id,
        type: "increase",
        quantity: this.quantityConfirmPricing,
      })
        .then((res) => {
          this.emitter.emit("cartUpdated");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    decreaseQuantity() {
      this.$nextTick(() => {
        this.quantityConfirm -= 1;
      });
    },
    increaseQuantity() {
      this.$nextTick(() => {
        this.quantityConfirm += 1;
      });
    },
    confirmAddToCart(id) {
      const url = window.location.pathname;
      const match = url.match(/^\/([^/]+)/);
      const pathParam = match ? match[1] : null;
      HTTPS.get("itemById", {
        params: {
          id: id,
          web_id: pathParam,
        },
      }).then((res) => {
        this.nameConfirm = res.data.title;
        this.descriptionConfirm = res.data.description;
        this.priceConfirm = res.data.price;
      });
    },
    addToCart(item_id, restaurant_id, quantity) {
      const url = window.location.pathname;
      const match = url.match(/^\/([^/]+)/);
      const pathParam = match ? match[1] : null;

      if (pathParam) {
        HTTP.post("restaurant/find", { web_id: pathParam })
          .then((res) => {
            console.log(res);
            if (res.data.length != 0) {
              HTTPS.post("/create/cart", {
                restaurant_id: parseInt(restaurant_id),
                item_id: item_id,
                quantity: quantity,
              })
                .then((res) => {
                  this.emitter.emit("isRestaurant", true);
                  localStorageImport("isRestaurant", true);
                  this.isRestaurant = localStorageExport("isRestaurant");
                  this.emitter.emit("cartUpdated");
                })
                .catch((error) => {
                  this.emitter.emit("cartUpdated");
                  console.log(error);
                });
            } else {
              console.log(80);
            }
          })
          .catch((error) => {
            this.$nextTick(() => {
              localStorageRemove("isRestaurant");
            });
          });
      } else {
        this.$nextTick(() => {
          localStorageRemove("isRestaurant");
        });
      }
    },
    RemoveFromCart(id) {
      HTTPS.post("/removeCartById", {
        id: id,
      })
        .then((res) => {
          console.log(res);
          this.emitter.emit("cartUpdated");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style>
.popup-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.popup-modal {
  position: relative;
  max-width: 30%;
  width: 90%;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
