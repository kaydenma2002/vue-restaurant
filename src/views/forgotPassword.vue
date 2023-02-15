<template>
  <form @submit.prevent="validateStep2">
    <main id="content" role="main" class="w-full max-w-md mx-auto p-6">
      <div class="
          mt-7
          bg-white
          rounded-xl
          shadow-lg
          dark:bg-gray-800 dark:border-gray-700
        ">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <a class="text-blue-600 decoration-2 hover:underline font-medium" href="/Login">
                Login here
              </a>
            </p>
          </div>

          <div v-if="step === 1" class="mt-5">
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                <div class="relative">
                  <input type="email" v-model="email" id="email" name="email" class="
                      py-3
                      px-4
                      block
                      w-full
                      border-2 border-gray-200
                      rounded-md
                      text-sm
                      focus:border-blue-500 focus:ring-blue-500
                      shadow-sm
                    " aria-describedby="email-error" />
                  <div v-if="v$.email.$error">
                    {{ v$.email.$errors[0].$message }}
                  </div>
                  
                </div>
              </div>
              <button type="button" @click.prevent="validateStep1()" class="
                  py-3
                  px-4
                  inline-flex
                  justify-center
                  items-center
                  gap-2
                  rounded-md
                  border border-transparent
                  font-semibold
                  bg-blue-500
                  text-white
                  hover:bg-blue-600
                  focus:outline-none
                  focus:ring-2 
                  focus:ring-blue-500
                  focus:ring-offset-2
                  transition-all
                  text-sm
                  dark:focus:ring-offset-gray-800
                ">
                Send verify code to my email
              </button>
            </div>
          </div>
          <div v-if="step == 2" class="mt-5">
            <div class="grid gap-y-4">
              <div>
                <label for="verify_code" class="
                    block
                    mb-2
                    text-sm
                    font-medium
                    text-gray-900
                    dark:text-white
                  ">Verification code</label>
                <div class="relative mb-6">
                  <input type="text" v-model="verify_code_input" id="verify_code" name="verify_code" class="
                      bg-gray-50
                      border border-gray-300
                      text-gray-900 text-sm
                      rounded-lg
                      focus:ring-blue-500 focus:border-blue-500
                      block
                      w-full
                      p-2.5
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-blue-500
                      dark:focus:border-blue-500
                    " aria-describedby="verify_code-error" />
                  <div v-if="v$.verify_code_input.$error">
                    {{ v$.verify_code_input.$errors[0].$message }}
                  </div>
                </div>
                <div class="mb-6">
                  <label for="password" class="
                      block
                      mb-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-white
                    ">Your new password</label>
                  <input v-model="new_password" type="password" id="new_password" class="
                      bg-gray-50
                      border border-gray-300
                      text-gray-900 text-sm
                      rounded-lg
                      focus:ring-blue-500 focus:border-blue-500
                      block
                      w-full
                      p-2.5
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-blue-500
                      dark:focus:border-blue-500
                    " />
                  <div v-if="v$.new_password.$error">
                    {{ v$.new_password.$errors[0].$message }}
                  </div>
                </div>
                <div class="mb-6">
                  <label for="confirm_password" class="
                      block
                      mb-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-white
                    ">Confirm new password</label>
                  <input type="password" v-model="confirm_password" id="confirm_password" class="
                      bg-gray-50
                      border border-gray-300
                      text-gray-900 text-sm
                      rounded-lg
                      focus:ring-blue-500 focus:border-blue-500
                      block
                      w-full
                      p-2.5
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-blue-500
                      dark:focus:border-blue-500
                    " />
                  <div v-if="v$.confirm_password.$error">
                    {{ v$.confirm_password.$errors[0].$message }}
                  </div>
                </div>
              </div>
              <button type="submit" class="
                  py-3
                  px-4
                  inline-flex
                  justify-center
                  items-center
                  gap-2
                  rounded-md
                  border border-transparent
                  font-semibold
                  bg-blue-500
                  text-white
                  hover:bg-blue-600
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:ring-offset-2
                  transition-all
                  text-sm
                  dark:focus:ring-offset-gray-800
                ">
                Reset password
              </button>
            </div>
          </div>
        </div>
      </div>

      <p class="
          mt-3
          flex
          justify-center
          items-center
          text-center
          divide-x divide-gray-300
          dark:divide-gray-700
        ">
        <a class="
            pr-3.5
            inline-flex
            items-center
            gap-x-2
            text-sm text-gray-600
            decoration-2
            hover:underline hover:text-blue-600
            dark:text-gray-500 dark:hover:text-gray-200
          " href="#" target="_blank">
          <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            viewBox="0 0 16 16">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          View Github
        </a>
        <a class="
            pl-3
            inline-flex
            items-center
            gap-x-2
            text-sm text-gray-600
            decoration-2
            hover:underline hover:text-blue-600
            dark:text-gray-500 dark:hover:text-gray-200
          " href="#">
          Contact us!
        </a>
      </p>
    </main>
  </form>
</template>
<script>
import { HTTP } from "../axios/http-axios";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import useValidate from "@vuelidate/core";
import {
  required,
  between,
  email,
  numeric,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      email: "",
      verify_code: Math.floor(Math.random() * 1000000 + 1),
      verify_code_input: "",
      confirm_password: "",
      new_password: "",
      step: 1,
    };
  },

  methods: {
    validateStep1: function () {
      this.v$.email.$touch();
      if (!this.v$.email.$invalid) {
        HTTP.post("/forgot-password/email", {
          email: this.email,
          verify_code: this.verify_code,
        })
          .then(
            emailjs
              .send(
                "service_lnr3us6",
                "template_n6q3khp",
                {
                  to_email: this.email,
                  reply_to: this.email,
                  verify_code: this.verify_code,
                  message: "Here is your verification code to reset password: ",
                },
                "Iom4YE3o-4Fl5HhpZ"
              )
              .then((this.step = 2))
              .catch((error) => {
                console.log(error);
              })
          )
          .catch((error) => {
            console.log(error);
          });
      }
    },
    validateStep2: function () {
      this.v$.verify_code_input.$touch();
      this.v$.new_password.$touch();
      this.v$.confirm_password.$touch();

      if (
        !this.v$.verify_code_input.$invalid &&
        !this.v$.new_password.$invalid &&
        !this.v$.confirm_password.$invalid
      ) {
        HTTP.post("/forgot-password/reset-password", {
          email: this.email,
          verify_code: this.verify_code_input,
          new_password: this.new_password,
        })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: res.data.message,
              confirmButtonText: "Ok",
            });
            this.$router.push("/login");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response.data.message,
              confirmButtonText: "Ok",
            });
          });
      } else {
        console.log(this.v$);
      }
    },
  },
  validations() {
    return {
      email: { required, minLengthValue: minLength(10), email },
      verify_code_input: {
        required,
        minLengthValue: minLength(6),
        maxLengthValue: maxLength(6),
      },
      new_password: { required, minLengthValue: minLength(8) },
      confirm_password: { required, sameAsPassword: sameAs(this.new_password) },
    };
  },
};
</script>