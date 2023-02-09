<template>
  <section class="h-screen">
    <div class="px-6 h-full text-gray-800">
      <div
        class="
          flex
          xl:justify-center
          lg:justify-between
          justify-center
          items-center
          flex-wrap
          h-full
          g-6
        "
      >
        <div
          class="
            grow-0
            shrink-1
            md:shrink-0
            basis-auto
            xl:w-6/12
            lg:w-6/12
            md:w-9/12
            mb-12
            md:mb-0
          "
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="w-full"
            alt="Sample image"
          />
        </div>
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form @submit.prevent="submitFormDebounced()">
            <div
              class="flex flex-row items-center justify-center lg:justify-start"
            >
              <GoogleLogin :callback="callback" />

              <div
                class="fb-login-button"
                data-width=""
                data-size="large"
                data-button-type="continue_with"
                data-layout="default"
                data-auto-logout-link="false"
                data-use-continue-as="false"
              ></div>

              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="
                  inline-block
                  p-3
                  bg-blue-600
                  text-white
                  font-medium
                  text-xs
                  leading-tight
                  uppercase
                  rounded-full
                  shadow-md
                  hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700
                  focus:shadow-lg
                  focus:outline-none
                  focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out
                  mx-1
                "
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
              class="
                flex
                items-center
                my-4
                before:flex-1
                before:border-t
                before:border-gray-300
                before:mt-0.5
                after:flex-1 after:border-t after:border-gray-300 after:mt-0.5
              "
            >
              <p class="text-center font-semibold mx-4 mb-0">Or</p>
            </div>

            <!-- Email input -->
            <div class="mb-6">
              <input
                type="text"
                id="email"
                v-model="email"
                class="
                  form-control
                  block
                  w-full
                  px-4
                  py-2
                  text-xl
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                placeholder="Email address"
              />
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <input
                type="password"
                class="
                  form-control
                  block
                  w-full
                  px-4
                  py-2
                  text-xl
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                id="password"
                placeholder="Password"
                v-model="password"
              />
            </div>

            <div class="flex justify-between items-center mb-6">
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="
                    form-check-input
                    appearance-none
                    h-4
                    w-4
                    border border-gray-300
                    rounded-sm
                    bg-white
                    checked:bg-blue-600 checked:border-blue-600
                    focus:outline-none
                    transition
                    duration-200
                    mt-1
                    align-top
                    bg-no-repeat bg-center bg-contain
                    float-left
                    mr-2
                    cursor-pointer
                  "
                  id="exampleCheck2"
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="exampleCheck2"
                  >Remember me</label
                >
              </div>
              <a href="#!" class="text-gray-800">Forgot password?</a>
            </div>

            <div class="text-center lg:text-left">
              <button
                type="submit"
                :disabled="submitting"
                class="
                  inline-block
                  px-7
                  py-3
                  bg-blue-600
                  text-white
                  font-medium
                  text-sm
                  leading-snug
                  uppercase
                  rounded
                  shadow-md
                  hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700
                  focus:shadow-lg
                  focus:outline-none
                  focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out
                "
              >
                {{ submitting ? "Login..." : "Login" }}
              </button>
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                Don't have an account?
                <a
                  href="/SignUp"
                  class="
                    text-red-600
                    hover:text-red-700
                    focus:text-red-700
                    transition
                    duration-200
                    ease-in-out
                  "
                  >Register</a
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
import { debounce } from 'lodash';

import { HTTP } from "../axios/http-axios";
import Swal from "sweetalert2";

import {
  localStorageImport,
  localStorageExport,
} from "../localStorage/local-storage";
import { decodeCredential } from "vue3-google-login";

export default {
  data() {
    return {
      email: "",
      password: "",
      submitting: false,
    };
  },

  methods: {
    async TraditionalLogin() {
      this.submitting = true;
      try {
        HTTP.post("/login", {
          email: this.email,
          password: this.password,
        })
          .then((res) => {
            console.log(res)
            localStorageImport("jwtToken", res.data.token);

            Swal.fire("Logged In successfully", "Welcome back", "success").then(
              (res) => {
                this.emitter.emit("login", true);
                this.$router.push("/");
              }
            );
          })
          .catch((error) => {
            
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,

              // footer: '<a href="">Why do I have this issue?</a>',
            });
          });
      } finally {
        this.submitting = false;
      }
    },
    callback: function (response) {
      const userData = decodeCredential(response.credential);
      console.log("Handle the userData", userData);
    },
    submitFormDebounced: debounce(function(){
      this.TraditionalLogin();
    },500),
  },
};
</script>