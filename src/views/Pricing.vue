<template>
  <Wizard
    style="min-height: 100vh"
    squared-tabs
    card-background
    scrollable-tabs
    :nextButton="{
      text: 'Next',
      icon: '',
      hideIcon: false, // default false but selected for sample
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
    @complete:wizard="wizardCompleted"
  >
    <form @submit.prevent="payByCreditCard()">
      <h5 v-if="currentTabIndex === 0">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            v-model="email"
            class="
              block
              py-2.5
              px-0
              w-full
              text-sm text-gray-900
              bg-transparent
              border-0 border-b-2 border-gray-500
              appearance-none
              dark:text-white dark:border-gray-600 dark:focus:border-blue-500
              focus:outline-none focus:ring-0 focus:border-blue-600
              peer
            "
            placeholder=" "
            required
          />
          <label
            for="email"
            class="
              peer-focus:font-medium
              absolute
              text-sm text-gray-500
              dark:text-gray-400
              duration-300
              transform
              -translate-y-6
              scale-75
              top-3
              -z-10
              origin-[0]
              peer-focus:left-0
              peer-focus:text-blue-600
              peer-focus:dark:text-blue-500
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6
            "
            >Email</label
          >
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              v-model="first_name"
              class="
                block
                py-2.5
                px-0
                w-full
                text-sm text-gray-900
                bg-transparent
                border-0 border-b-2 border-gray-300
                appearance-none
                dark:text-white dark:border-gray-600 dark:focus:border-blue-500
                focus:outline-none focus:ring-0 focus:border-blue-600
                peer
              "
              placeholder=" "
              required
            />
            <label
              for="floating_first_name"
              class="
                peer-focus:font-medium
                absolute
                text-sm text-gray-500
                dark:text-gray-400
                duration-300
                transform
                -translate-y-6
                scale-75
                top-3
                -z-10
                origin-[0]
                peer-focus:left-0
                peer-focus:text-blue-600
                peer-focus:dark:text-blue-500
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-6
              "
              >First name</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              v-model="last_name"
              class="
                block
                py-2.5
                px-0
                w-full
                text-sm text-gray-900
                bg-transparent
                border-0 border-b-2 border-gray-300
                appearance-none
                dark:text-white dark:border-gray-600 dark:focus:border-blue-500
                focus:outline-none focus:ring-0 focus:border-blue-600
                peer
              "
              placeholder=" "
              required
            />
            <label
              for="floating_last_name"
              class="
                peer-focus:font-medium
                absolute
                text-sm text-gray-500
                dark:text-gray-400
                duration-300
                transform
                -translate-y-6
                scale-75
                top-3
                -z-10
                origin-[0]
                peer-focus:left-0
                peer-focus:text-blue-600
                peer-focus:dark:text-blue-500
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-6
              "
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
              class="
                block
                py-2.5
                px-0
                w-full
                text-sm text-gray-900
                bg-transparent
                border-0 border-b-2 border-gray-300
                appearance-none
                dark:text-white dark:border-gray-600 dark:focus:border-blue-500
                focus:outline-none focus:ring-0 focus:border-blue-600
                peer
              "
              placeholder=" "
              required
            />
            <label
              for="floating_phone"
              class="
                peer-focus:font-medium
                absolute
                text-sm text-gray-500
                dark:text-gray-400
                duration-300
                transform
                -translate-y-6
                scale-75
                top-3
                -z-10
                origin-[0]
                peer-focus:left-0
                peer-focus:text-blue-600
                peer-focus:dark:text-blue-500
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-6
              "
              >Phone number (123-456-7890)</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_company"
              v-model="company"
              class="
                block
                py-2.5
                px-0
                w-full
                text-sm text-gray-900
                bg-transparent
                border-0 border-b-2 border-gray-300
                appearance-none
                dark:text-white dark:border-gray-600 dark:focus:border-blue-500
                focus:outline-none focus:ring-0 focus:border-blue-600
                peer
              "
              placeholder=" "
              required
            />
            <label
              for="floating_company"
              class="
                peer-focus:font-medium
                absolute
                text-sm text-gray-500
                dark:text-gray-400
                duration-300
                transform
                -translate-y-6
                scale-75
                top-3
                -z-10
                origin-[0]
                peer-focus:left-0
                peer-focus:text-blue-600
                peer-focus:dark:text-blue-500
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-6
              "
              >Company (Ex. Google)</label
            >
          </div>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="street_address"
            name="street_address"
            v-model="street"
            class="
              block
              py-2.5
              px-0
              w-full
              text-sm text-gray-900
              bg-transparent
              border-0 border-b-2 border-gray-300
              appearance-none
              dark:text-white dark:border-gray-600 dark:focus:border-blue-500
              focus:outline-none focus:ring-0 focus:border-blue-600
              peer
            "
            placeholder=" "
            required
          />
          <label
            for="street_address"
            class="
              peer-focus:font-medium
              absolute
              text-sm text-gray-500
              dark:text-gray-400
              duration-300
              transform
              -translate-y-6
              scale-75
              top-3
              -z-10
              origin-[0]
              peer-focus:left-0
              peer-focus:text-blue-600
              peer-focus:dark:text-blue-500
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6
            "
            >Street Address</label
          >
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="city"
              v-model="city"
              class="
                block
                py-2.5
                px-0
                w-full
                text-sm text-gray-900
                bg-transparent
                border-0 border-b-2 border-gray-300
                appearance-none
                dark:text-white dark:border-gray-600 dark:focus:border-blue-500
                focus:outline-none focus:ring-0 focus:border-blue-600
                peer
              "
              placeholder=" "
              required
            />
            <label
              for="city"
              class="
                peer-focus:font-medium
                absolute
                text-sm text-gray-500
                dark:text-gray-400
                duration-300
                transform
                -translate-y-6
                scale-75
                top-3
                -z-10
                origin-[0]
                peer-focus:left-0
                peer-focus:text-blue-600
                peer-focus:dark:text-blue-500
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-6
              "
              >City</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="zip_code"
              v-model="zip_code"
              class="
                block
                py-2.5
                px-0
                w-full
                text-sm text-gray-900
                bg-transparent
                border-0 border-b-2 border-gray-300
                appearance-none
                dark:text-white dark:border-gray-600 dark:focus:border-blue-500
                focus:outline-none focus:ring-0 focus:border-blue-600
                peer
              "
              placeholder=" "
              required
            />
            <label
              for="zip_code"
              class="
                peer-focus:font-medium
                absolute
                text-sm text-gray-500
                dark:text-gray-400
                duration-300
                transform
                -translate-y-6
                scale-75
                top-3
                -z-10
                origin-[0]
                peer-focus:left-0
                peer-focus:text-blue-600
                peer-focus:dark:text-blue-500
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-6
              "
              >ZIP CODE</label
            >
          </div>
        </div>
      </h5>
      <h5 v-if="currentTabIndex === 1">
        <div class="mb-6">
          <Card
            @update:cardnumber="updateCardNumber"
            @update:cardmonth="updateCardMonth"
            @update:cardyear="updateCardYear"
            @update:cvv="updateCardCVV"
          />
        </div>
      </h5>
      <button type="submit" :class="[currentTabIndex == 0 ? 'hidden' : 'block', 'card-form__button']">Submit</button>
    </form>
  </Wizard>
</template>
<script>
import "form-wizard-vue3/dist/form-wizard-vue3.css";
import Wizard from "form-wizard-vue3";
import Swal from "sweetalert2";

import Stripe from "stripe";

import { HTTP } from "../axios/http-axios";
import Card from "../components/Card.vue";
export default {
  components: {
    Card,
    Wizard,
  },

  data() {
    return {
      isActive:true,
      first_name:"",
      last_name:"",
      phone:"",
      email:"",
      company:"",
      street:"",
      city:"",
      zip_code:"",
      currentTabIndex: 0,
    };
  },
  mounted() {},
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
      HTTP.post("/stripe", {
        card_number: this.cardNumber,
        exp_month: this.cardMonth,
        exp_year: this.cardYear,
        card_cvv: this.cardCVV,
        amount: 50,
      })
        .then((res) => {
          if (res.data[0] !== "succeeded") {
            Swal.fire("Payment Error", `${res.data.response}`, "error");
          } else {
            Swal.fire(
              "Payment Success",
              "Thank you for choosing our service",
              "success"
            ).then(HTTP.post("/create/order",{
              first_name: this.first_name,
              last_name: this.last_name,
              phone: this.phone,
              email: this.email,
              company: this.company,
              street: this.street,
              city: this.city,
              zip_code: this.zip_code,
              total: 50
            })).then(res => console.log(res)).catch(error => console.log(error));
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
    wizardCompleted() {
      alert("Thanks you for purchasing ");
      console.log("Wizard Completed");
    },
  },
};
</script>

<style>
@import "../assets/css/card-component.css";
</style>