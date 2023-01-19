<template>
  <div class="container mx-auto mt-5">
    <div class="text-center text-2xl lg:text-5xl md:text-3xl sm:text-2xl">
      Drive more revenue with tools <br />
      tools to help grow your <br />
      restaurant business online
    </div>
    <div class="text-center text-2xl mt-10">
      <div>Book a free demo today</div>
      <div>
        or call us at
        <p class="underline">571.505.1131</p>
      </div>
    </div>
    <form @submit.prevent="submitForm()" class="w-1/2 mx-auto mt-20 px-2.5 py-10 bg-white rounded py-16">
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          v-model="name"
          id="floating_name"
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
        />
        <label
          for="floating_name"
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
        >
          Your Name</label
        >
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          v-model="restaurant"
          type="text"
          id="floating_restaurant"
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
        />
        <label
          for="floating_restaurant"
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
          >Your Company / Restaurant</label
        >
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          v-model="zip_code"
          id="floating_zip_code"
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
        />
        <label
          for="floating_zip_code"
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
          >Zip Code</label
        >
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="text"
            v-model="phone"
            id="floating_phone"
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
            >Phone</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="text"
            v-model="email"
            id="email"
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
            >Email Address</label
          >
        </div>
      </div>
      <div class="w-100 text-center">
        <button
          type="submit"
          class="
            w-1/2
            text-white
            bg-indigo-500
            hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
        >
          Get My Free Demo
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      restaurant: "",
      phone: "",
      zip_code: "",
    };
  },
   methods: {
    submitForm() {
      this.v$.$validate() // checks all 
      console.log(this.v$)
      if (!this.v$.$error) {
        // if ANY fail validation
        alert('Form successfully submitted.')
      } else {
        console.log(this.v$)
      }
    },
  },
  validations() {
    return {
      name: { required },
      email: { required },
      restaurant: { required },
      phone: { required },
      zip_code: { required },
    };
  },
};
</script>