<template>
  <div v-if="cardComponent" class="mb-6">
    <Card
      :fields="fields"
      :labels="formData"
      :isCardNumberMasked="isCardNumberMasked"
      :randomBackgrounds="randomBackgrounds"
      :backgroundImage="backgroundImage"
    />
    <div class="text-center text-2xl">OR</div>
    <div id="paypal-button-container" class="text-center"></div>
  </div>
</template>
<script>
import Card from "../components/Card.vue";
export default {
  directives: {
    "number-only": {
      bind(el) {
        function checkValue(event) {
          event.target.value = event.target.value.replace(/[^0-9]/g, "");
          if (event.charCode >= 48 && event.charCode <= 57) {
            return true;
          }
          event.preventDefault();
        }
        el.addEventListener("keypress", checkValue);
      },
    },
    "letter-only": {
      bind(el) {
        function checkValue(event) {
          if (event.charCode >= 48 && event.charCode <= 57) {
            event.preventDefault();
          }
          return true;
        }
        el.addEventListener("keypress", checkValue);
      },
    },
  },
  props: {
    total: Number,
    formData: {
      type: Object,
      default: () => {
        return {
          cardName: "",
          cardNumber: "",
          cardMonth: "",
          cardYear: "",
          cardCvv: "",
        };
      },
    },
    backgroundImage: [String, Object],
    randomBackgrounds: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Card,
  },
  data() {
    return {
      cardComponent: true,
      fields: {
        cardNumber: "v-card-number",
        cardName: "v-card-name",
        cardMonth: "v-card-month",
        cardYear: "v-card-year",
        cardCvv: "v-card-cvv",
      },
      minCardYear: new Date().getFullYear(),
      isCardNumberMasked: true,
      mainCardNumber: this.cardNumber,
      cardNumberMaxLength: 19,
    };
  },
  computed: {
    minCardMonth() {
      if (this.formData.cardYear === this.minCardYear)
        return new Date().getMonth() + 1;
      return 1;
    },
  },
  watch: {
    cardYear() {
      if (this.formData.cardMonth < this.minCardMonth) {
        this.formData.cardMonth = "";
      }
    },
  },
  mounted() {
    this.maskCardNumber();
    if (this.cardComponent === true) {
      this.$emit("handle-card");
    }
    paypal
      .Buttons({
        style: {
          color: "gold",
          shape: "pill",
          layout: "horizontal",
        },
        createOrder: (data, actions) => {
          const createOrderPayload = {
            purchase_units: [
              {
                amount: {
                  value: "4000.0",
                },
              },
            ],
          };
          return actions.order.create(createOrderPayload);
        },
        onApprove: (data, actions) => {
          const captureOrderHandler = (details) => {
            const payerName = details.payer.name.given_name;
            console.log("Transaction completed");
          };
          return actions.order.capture().then(captureOrderHandler);
        },
        onError: (err) => {
          console.error(
            "An error prevented the buyer from checking out with PayPal"
          );
        },
      })
      .render("#paypal-button-container");
  },
  methods: {
    generateMonthValue(n) {
      return n < 10 ? `0${n}` : n;
    },
    changeName(e) {
      this.formData.cardName = e.target.value;
      this.$emit("input-card-name", this.formData.cardName);
    },
    changeNumber(e) {
      this.formData.cardNumber = e.target.value;
      let value = this.formData.cardNumber.replace(/\D/g, "");
      // american express, 15 digits
      if (/^3[47]\d{0,13}$/.test(value)) {
        this.formData.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        this.cardNumberMaxLength = 17;
      } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
        // diner's club, 14 digits
        this.formData.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        this.cardNumberMaxLength = 16;
      } else if (/^\d{0,16}$/.test(value)) {
        // regular cc number, 16 digits
        this.formData.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
          .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
        this.cardNumberMaxLength = 19;
      }
      // eslint-disable-next-line eqeqeq
      if (e.inputType == "deleteContentBackward") {
        let lastChar = this.formData.cardNumber.substring(
          this.formData.cardNumber.length,
          this.formData.cardNumber.length - 1
        );
        // eslint-disable-next-line eqeqeq
        if (lastChar == " ") {
          this.formData.cardNumber = this.formData.cardNumber.substring(
            0,
            this.formData.cardNumber.length - 1
          );
        }
      }
      this.$emit("input-card-number", this.formData.cardNumber);
    },
    changeMonth() {
      this.$emit("input-card-month", this.formData.cardMonth);
    },
    changeYear() {
      this.$emit("input-card-year", this.formData.cardYear);
    },
    changeCvv(e) {
      this.formData.cardCvv = e.target.value;
      this.$emit("input-card-cvv", this.formData.cardCvv);
    },
    invaildCard() {
      let number = this.formData.cardNumber;
      let sum = 0;
      let isOdd = true;
      for (let i = number.length - 1; i >= 0; i--) {
        let num = number.charAt(i);
        if (isOdd) {
          sum += num;
        } else {
          num = num * 2;
          if (num > 9) {
            num = num.toString().split("").join("+");
          }
          sum += num;
        }
        isOdd = !isOdd;
      }
      if (sum % 10 !== 0) {
        alert("invaild card number");
      }
    },
    blurCardNumber() {
      if (this.isCardNumberMasked) {
        this.maskCardNumber();
      }
    },
    maskCardNumber() {
      this.mainCardNumber = this.formData.cardNumber;
      let arr = this.formData.cardNumber.split("");
      arr.forEach((element, index) => {
        if (index > 4 && index < 14 && element.trim() !== "") {
          arr[index] = "*";
        }
      });
      this.formData.cardNumber = arr.join("");
    },
    unMaskCardNumber() {
      this.formData.cardNumber = this.mainCardNumber;
    },
    focusCardNumber() {
      this.unMaskCardNumber();
    },
    toggleMask() {
      this.isCardNumberMasked = !this.isCardNumberMasked;
      if (this.isCardNumberMasked) {
        this.maskCardNumber();
      } else {
        this.unMaskCardNumber();
      }
    },
    finishPayment() {
      this.$emit("change-parent");
    },
  },
};
</script>

<style>
@import "../assets/css/card-component.css";
</style>