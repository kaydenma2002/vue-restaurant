<template>
  <section class="h-screen">
    <div class="px-6 h-full text-gray-800">
      <div
        class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
      >
        
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form @submit.prevent="TraditionalRegister()">
            <div
              class="flex flex-row items-center justify-center lg:justify-start"
            >
              <p class="text-lg mb-0 mr-4">Sign in with</p>
              <button
                class="inline-block p-3 bg-black text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                <!-- Facebook -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  class="w-4 h-4"
                >
                  <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
              </button>

              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="inline-block p-3 bg-black text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                <!-- Twitter -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="w-4 h-4"
                >
                  <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    fill="currentColor"
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                  />
                </svg>
              </button>

              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="inline-block p-3 bg-black text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                <!-- Linkedin -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="w-4 h-4"
                >
                  <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  />
                </svg>
              </button>
            </div>

            <div
              class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
              <p class="text-center font-semibold mx-4 mb-0">Or</p>
            </div>

            <!-- Email input -->
            <div class="grid grid-cols-3 gap-1">
              <div class="mb-6">
                <input
                  type="text"
                  id="email"
                  v-model="email"
                  class="py-3
                      px-4
                      block
                      w-full
                      border-2 border-gray-200
                      rounded-md
                      text-sm
                      focus:border-black focus:ring-black
                      shadow-sm"
                  placeholder="Email address"
                />
                <div v-for="error of v$.email.$errors" :key="error">
                <p>{{ error.$message }}</p>
              </div>
              </div>
              
              <div class="mb-6">
                <input
                  type="text"
                  id="name"
                  v-model="name"
                  class="py-3
                      px-4
                      block
                      w-full
                      border-2 border-gray-200
                      rounded-md
                      text-sm
                      focus:border-black focus:ring-black
                      shadow-sm"
                  placeholder="Name"
                />
                <div v-for="error of v$.name.$errors" :key="error">
                <p>{{ error.$message }}</p>
              </div>
              </div>
              <div class="mb-6 relative">
                <form @submit.prevent="verifyPhoneNumber">
                  <div class="flex">
                    <input
                      type="number"
                      v-model="phone"
                      :disabled="verifyPhone"
                      class="py-3
                      px-4
                      block
                      w-full
                      border-2 border-gray-200
                      rounded-md
                      text-sm
                      focus:border-black focus:ring-black
                      shadow-sm"
                      placeholder="Mobile number"
                    />

                    <button
                      type="submit"
                      v-if="!verifyPhone"
                      class="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2 dark:bg-black dark:hover:bg-black dark:focus:ring-black"
                    >
                      Verify
                    </button>
                  </div>
                  <div v-for="error of v$.phone.$errors" :key="error">
                    <p>{{ error.$message }}</p>
                  </div>
                </form>

                <input
                  v-if="verifyPhone"
                  type="number"
                  v-model="verify_code"
                  id="helper-text"
                  aria-describedby="helper-text-explanation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
                  placeholder="Enter your verify code send to the number above"
                />
                <div v-for="error of v$.verify_code.$errors" :key="error">
                <p>{{ error.$message }}</p>
              </div>
              </div>
              <div class="mb-6">
                <input
                  type="text"
                  id="street"
                  v-model="street"
                  class="py-3
                      px-4
                      block
                      w-full
                      border-2 border-gray-200
                      rounded-md
                      text-sm
                      focus:border-black focus:ring-black
                      shadow-sm"
                  placeholder="Street"
                />
              </div>
              <div v-for="error of v$.street.$errors" :key="error">
                <p>{{ error.$message }}</p>
              </div>
              <div class="mb-6">
                <input
                  type="text"
                  id="city"
                  v-model="city"
                  class="py-3
                      px-4
                      block
                      w-full
                      border-2 border-gray-200
                      rounded-md
                      text-sm
                      focus:border-black focus:ring-black
                      shadow-sm"
                  placeholder="City"
                />
                <div v-for="error of v$.city.$errors" :key="error">
                <p>{{ error.$message }}</p>
              </div>
              </div>

              <div class="mb-6">
                <input
                  type="text"
                  id="zip_code"
                  v-model="zip_code"
                  class="py-3
                      px-4
                      block
                      w-full
                      border-2 border-gray-200
                      rounded-md
                      text-sm
                      focus:border-black focus:ring-black
                      shadow-sm"
                  placeholder="Zip code"
                />
                <div v-for="error of v$.zip_code.$errors" :key="error">
                <p>{{ error.$message }}</p>
              </div>
              </div>
            </div>
            <!-- Password input -->
            <div class="mb-6">
              <input
                type="password"
                class="py-3
                      px-4
                      block
                      w-full
                      border-2 border-gray-200
                      rounded-md
                      text-sm
                      focus:border-black focus:ring-black
                      shadow-sm"
                id="password"
                placeholder="Password"
                v-model="password"
              />
              <div v-for="error of v$.zip_code.$errors" :key="error">
                <p>{{ error.$message }}</p>
              </div>
            </div>

            <div class="flex justify-between items-center mb-6">
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  id="exampleCheck2"
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="exampleCheck2"
                  >Remember me</label
                >
              </div>
              <a href="/ForgotPassword" class="text-gray-800"
                >Forgot password?</a
              >
            </div>

            <div class="text-center lg:text-left">
              <button
                :disabled="!verifyPhone"
                type="submit"
                :class="{ 'cursor-not-allowed': !verifyPhone }"
                class="inline-block px-7 py-3 bg-black text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out"
              >
                Sign up
              </button>
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                Already had an account ?
                <router-link
                to="/login"
                  class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >Login</router-link
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { HTTP } from "../axios/http-axios";
import useValidate from "@vuelidate/core";
import { required, maxLength, minLength, email } from "@vuelidate/validators";

import Swal from "sweetalert2";
import emailjs from "emailjs-com";

export default {
  data() {
    return {
      v$: useValidate(),
      email: "",
      password: "",
      name: "",
      street: "",
      city: "",
      zip_code: "",
      phone: null,
      verify_code: "",
      verifyPhone: false,
    };
  },
  validations() {
    return {
      email: { required, minLengthValue: minLength(8), email },
      name: { required },
      password: { required, minLengthValue: minLength(8) },
      street: { required },
      city: { required },
      zip_code: { required },
      phone: { required },
      verify_code: { required}
    };
  },
  methods: {
    verifyPhoneNumber: function () {
      this.v$.phone.$touch();
      if (!this.v$.phone.$invalid) {
        this.verifyPhone = true;
        HTTP.post("/verify-mobile-register", {
          phone: this.phone,
        }).then((res) => {
          console.log(res);
        }).catch(error => {
          console.log(error)
        });
      } else {
        this.phone_error = true;
      }
    },
    TraditionalRegister: function () {
      this.v$.$validate();
      if (!this.v$.$error) {
        HTTP.post("/register", {
          email: this.email,
          password: this.password,
          phone: this.phone,
          name: this.name,
          street: this.street,
          city: this.city,
          zip_code: this.zip_code,
          verify_code: this.verify_code,
          status: 0,
        })
          .then((res) => {
            if(res.data.success != false){
              emailjs
              .send(
                "service_lnr3us6",
                "template_xvqoh6d",
                {
                  to_name: this.name,
                  to_email: this.email,
                  reply_to: this.email,
                  message:
                    "Thank you for being a part of us. Here is your link to: ",
                },
                "Iom4YE3o-4Fl5HhpZ"
              )
              .then(
                Swal.fire(
                  "Email sent!",
                  "Please Open your Email to verify your account",
                  "success"
                ).then((res) => {
                  this.$router.push("/login");
                })
              );
            }else{
              Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.data.message,
              // footer: '<a href="">Why do I have this issue?</a>',
            });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
              // footer: '<a href="">Why do I have this issue?</a>',
            });
          });
      }
    },
  },
};
</script>
