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
              <a class="text-black decoration-2 hover:underline font-medium" href="/Login">
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
                      focus:border-black focus:ring-black
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
                  bg-black
                  text-white
                  hover:bg-black
                  focus:outline-none
                  focus:ring-2 
                  focus:ring-black
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
                      focus:ring-black focus:border-black
                      block
                      w-full
                      p-2.5
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-black
                      dark:focus:border-black
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
                      focus:ring-black focus:border-black
                      block
                      w-full
                      p-2.5
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-black
                      dark:focus:border-black
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
                      focus:ring-black focus:border-black
                      block
                      w-full
                      p-2.5
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-black
                      dark:focus:border-black
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
                  bg-black
                  text-white
                  hover:bg-black
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black
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
            pl-3
            inline-flex
            items-center
            gap-x-2
            text-sm text-gray-600
            decoration-2
            hover:underline hover:text-black
            dark:text-gray-500 dark:hover:text-gray-200
          " href="/ContactUs">
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