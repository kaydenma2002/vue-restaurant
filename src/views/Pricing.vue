<template>
  <div class="container mx-auto">
    <form @submit.prevent="payByCreditCard">
      <div class="card-form grid grid-cols-12 bg-white px-16">
        <div class="mb-6 col-span-4">
          <h4 class="text-3xl text-gray-700 mb-5">Payment Information</h4>
          <Card
            @update:cardnumber="updateCardNumber"
            @update:cardmonth="updateCardMonth"
            @update:cardyear="updateCardYear"
            @update:cvv="updateCardCVV"
          />
        </div>
        <div class="col-span-8 ml-8 lg:order-last">
          <h4 class="text-3xl text-gray-700 mb-5">Order Summary</h4>
          <div class="p-10 rounded-md shadow-md bg-white">
            <div class="grid">
              <div
                class="xl:w-auto sm:w-auto lg:w-auto md:w-auto w-auto h-auto mt-5 grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2 mb-10"
              >
                <div v-for="(item, index) in Cart" :key="index">
                  <FoodCard
                    :item_id="item.item_id"
                    :id="item.id"
                    :name="item.item.title"
                    :description="item.item.description"
                    :price="item.item.price"
                    :image="item.item.image"
                    :enableAddToCart="false"
                    :enableRemoveFromCart="true"
                  />
                </div>
              </div>
              <div class="ml-auto w-full">
                <textarea v-model="note" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Note"></textarea>
              </div>
              <div class="ml-auto text-xl">
                Subtotal: ${{ subTotal }} <br />SaleTax: ${{
                  subTotal * 6 / 100
                }}
                <br />MealTax: ${{ (subTotal * 4) / 100 }} <br />Fee: ${{
                  (subTotal * 3) / 100 + 0.3
                }}
                <br />Total: ${{ countTotal }}
              </div>
              <button
                type="submit"
                :disabled="submitting"
                class="focus:outline-none text-white bg-black hover:bg-black focus:ring-4 focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-black dark:hover:bg-black dark:focus:ring-black"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
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
      submitting: false,
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
      note: "",
      currentTabIndex: 0,
      Cart: Object,
      Order: [],
    };
  },
  mounted() {
    
  },
  created() {
    
    this.emitter.on("cartUpdated", () => {
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

    async payByCreditCard() {
      if (!this.submitting) {
        this.submitting = true;
        try {
          const res1 = await HTTPS.get("cartByUserId");
          this.Order = res1.data;
          console.log(this.Order, this.Order.length);
          const res2 = await HTTPS.post("/stripe", {
            card_number: this.cardNumber,
            exp_month: this.cardMonth,
            exp_year: this.cardYear,
            card_cvv: this.cardCVV,
            amount: Math.round(this.countTotal * 100),
          });
          if (res2.data[0] !== "succeeded") {
            console.log(res2);
            Swal.fire("Payment Error", `${res2.data.response}`, "error");
          } else {
            Swal.fire(
              "Payment Success",
              "Thank you for choosing our service",
              "success"
            ).then(() => {
              HTTPS.post("/remove/cart")
                .then(() => {
                  this.emitter.emit("removeCart", true);
                })
                .then(() => {
                  HTTPS.post("/create/order", {
                    total: Math.round(this.countTotal * 100),
                    note: this.note
                  })
                    .then((res3) => {
                      console.log(res3);
                      const promises = [];
                      for (let i = 0; i < this.Order.length; i++) {
                        promises.push(
                          HTTPS.post("create/order-item", {
                            item_id: this.Order[i].item_id,
                            quantity: this.Order[i].quantity,
                            price: this.Order[i].item.price,
                            order_id: res3.data.id,
                          })
                        );
                      }
                      Promise.all(promises).then(() => {
                        this.emitter.emit("cartUpdated");
                        this.$router.push("/");
                      });
                    })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Payment Error !",
            text: error,
          });
        } finally {
          this.submitting = false;
        }
      }
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
        return sum + parseFloat(current.item.price);
      }, 0);
    },
    countTotal() {
      return this.subTotal + (this.subTotal * 13) / 100;
    },
  },
};
</script>

<style>
@import "../assets/css/card-component.css";
</style>
