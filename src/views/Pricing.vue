<template>
  <Wizard
    style="min-height: 100vh"
    squared-tabs
    card-background
    scrollable-tabs
    :nextButton="{
      text: 'Next',
      icon: '',
      hideIcon: true, // default false but selected for sample
      hideText: false, // default false but selected for sample
    }"
    :custom-tabs="[
      {
        title: 'Step 1',
      },
      {
        title: 'Step 2',
      },
    ]"
    :beforeChange="onTabBeforeChange"
    @change="onChangeCurrentTab"
    @complete:wizard="payByCreditCard"
  >
    <form>
      <div v-if="currentTabIndex === 0">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            v-model="email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Email</label
          >
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              v-model="first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >First name</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              v-model="last_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Last name</label
            >
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="floating_phone"
              v-model="phone"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Phone number (123-456-7890)</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_company"
              v-model="company"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_company"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Company (Ex. Google)</label
            >
          </div>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="street_address"
            name="street_address"
            v-model="street"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="street_address"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Street Address</label
          >
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="city"
              v-model="city"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="city"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >City</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="zip_code"
              v-model="zip_code"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="zip_code"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >ZIP CODE</label
            >
          </div>
        </div>
      </div>
      <div v-if="currentTabIndex === 1">
        <div class="card-form grid grid-cols-12 gap-4">
          <div class="mb-6 col-span-3">
            <h4 class="text-3xl text-gray-700 mb-5">Payment Information</h4>
            <Card
              @update:cardnumber="updateCardNumber"
              @update:cardmonth="updateCardMonth"
              @update:cardyear="updateCardYear"
              @update:cvv="updateCardCVV"
            />
          </div>
          <div class="col-span-9 lg:order-last">
            <h4 class="text-3xl text-gray-700 mb-5">Order Summary</h4>
            <div class="p-10 rounded-md shadow-md bg-white">
              <div class="grid">
                <div
                  class="xl:w-auto sm:w-auto lg:w-auto md:w-auto w-auto h-auto mt-5 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2 mb-10"
                >
                  <div v-for="(item, index) in Cart" :key="index">
                    <FoodCard
                      :item_id="item.item_id"
                      :id="item.id"
                      :name="item.item.name"
                      :description="item.item.description"
                      :price="item.item.price"
                      :image="item.item.image"
                      :enableAddToCart="false"
                      :enableRemoveFromCart="true"
                    />
                  </div>
                </div>

                <div class="ml-auto text-xl">
                  Subtotal: ${{ subTotal }}
                  <br />SaleTax: ${{ subTotal * 6 / 100 }}
                  <br />MealTax: ${{ subTotal * 4 / 100 }}
                  <br />Fee: ${{ subTotal * 3 / 100 + 0.3 }}
                  <br />Total: ${{ countTotal }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </Wizard>
</template>
<script>
import "form-wizard-vue3/dist/form-wizard-vue3.css";
import Wizard from "form-wizard-vue3";
import Swal from "sweetalert2";

import Stripe from "stripe";
import FoodCard from "../components/FoodCard.vue";
import { HTTP, HTTPS } from "../axios/http-axios";
import Card from "../components/Card.vue";
export default {
  components: {
    Card,
    FoodCard,
    Wizard,
  },

  data() {
    return {
      isActive: true,
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      company: "",
      street: "",
      city: "",
      zip_code: "",
      item_id: [],
      currentTabIndex: 0,
      Cart: Object,
    };
  },
  mounted() {},
  created() {
    this.emitter.on("cartUpdated", (value) => {
      HTTPS.get("cartByUserId")
        .then((res) => {
          this.Cart = res.data;
          for (var i = 0; i < res.data.length; i++) {
            this.item_id.push(this.Cart[i].item_id);
          }
        })
        .catch((error) => console.log(error));
    });
    HTTPS.get("cartByUserId")
      .then((res) => {
        this.Cart = res.data;
        for (var i = 0; i < res.data.length; i++) {
          this.item_id.push(this.Cart[i].item_id);
        }
      })
      .catch((error) => console.log(error));
  },
  methods: {
    updateCardNumber(cardNumber) {
      this.cardNumber = cardNumber;
    },
    updateCardMonth(cardMonth) {
      this.cardMonth = cardMonth;
    },
    updateCardYear(cardYear) {
      this.cardYear = cardYear;
    },
    updateCardCVV(cardCVV) {
      this.cardCVV = cardCVV;
    },

    payByCreditCard() {
      
      HTTPS.post("/stripe", {
        card_number: this.cardNumber,
        exp_month: this.cardMonth,
        exp_year: this.cardYear,
        card_cvv: this.cardCVV,
        amount: Math.round(this.countTotal * 100),
      })
        .then((res) => {
          if (res.data[0] !== "succeeded") {
            console.log(res);
            Swal.fire("Payment Error", `${res.data.response}`, "error");
          } else {
            Swal.fire(
              "Payment Success",
              "Thank you for choosing our service",
              "success"
            )
              .then(
                HTTPS.post("/remove/cart")
                  .then(() => {
                    this.emitter.emit("removeCart", true);
                  })
                  .then(
                    HTTPS.post("/create/order", {
                      first_name: this.first_name,
                      last_name: this.last_name,
                      phone: this.phone,
                      email: this.email,
                      company: this.company,
                      street: this.street,
                      city: this.city,
                      zip_code: this.zip_code,
                      item_id: this.item_id,
                      total: Math.round(this.countTotal * 100),
                    }).then((res) => {
                      this.emitter.emit("cartUpdated", this.item_id);
                    })
                  )
                  .catch((error) => console.log(error))
              )
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Payment Error !",
            text: error,
          });
        });
    },
    onChangeCurrentTab(index, oldIndex) {
      console.log(index, oldIndex);
      this.currentTabIndex = index;
    },
    onTabBeforeChange() {
      if (this.currentTabIndex === 0) {
        console.log("First Tab");
      }
      console.log("All Tabs");
    },
    wizardCompleted() {},
  },
  computed: {
    subTotal() {
      return this.Cart.reduce((sum, current) => {
        return sum + current.item.price;
      }, 0);
    },
    countTotal(){
      return this.subTotal + this.subTotal * 13 / 100 + 0.3 
    }
    
  },
};
</script>

<style>
@import "../assets/css/card-component.css";
</style>
