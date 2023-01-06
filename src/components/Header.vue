<template>
  <nav
    class="
      transition
      duration-700
      ease-in-out
      bg-white
      px-2
      sm:px-4
      py-2.5
      dark:bg-gray-900
      sticky
      w-full
      z-20
      top-0
      left-0
      border-b border-gray-200
      dark:border-gray-600
    "
  >
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <a href="https://flowbite.com/" class="flex items-center">
        <h1>Your site Logo</h1>
      </a>
      <div class="flex space-x-4 items-center md:order-3">
        <router-link to="/Login" class="text-gray-800 text-sm"
          >LOGIN</router-link
        >
        <router-link
          to="/SignUp"
          class="
            bg-indigo-600
            px-4
            py-2
            rounded
            text-white
            hover:bg-indigo-500
            text-sm
          "
          >SIGNUP</router-link
        >
        <button @click="Logout()">Logout</button>
      </div>
      <div class="flex md:order-2">
        <button
          class="
            transition
            ease-in-out
            delay-150
            hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500
            duration-300
            px-8
            py-3
            rounded-lg
          "
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </button>
        <button
          data-collapse-toggle=""
          type="button"
          class="
            inline-flex
            items-center
            p-2
            text-sm text-gray-500
            rounded-lg
            md:hidden
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-gray-200
            dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600
          "
          aria-controls=""
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="
          items-center
          justify-between
          hidden
          w-full
          text-white
          md:flex md:w-auto md:order-1
        "
        id=""
      >
        <ul
          class="
            flex flex-col
            p-4
            mt-4
            border border-gray-100
            rounded-lg
            md:flex-row
            md:space-x-8
            md:mt-0
            md:text-sm
            md:font-medium
            md:border-0
            dark:bg-gray-800
            md:dark:bg-gray-900
            dark:border-gray-700
          "
        >
          <li>
            <router-link
              to="/home"
              class="
                block
                py-2
                pl-3
                pr-4
                rounded
                md:hover:bg-transparent
                md:border-0
                md:hover:text-blue-700
                md:p-0
                text-gray-700
                md:dark:hover:text-white md:dark:hover:bg-transparent
              "
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/About"
              class="
                block
                py-2
                pl-3
                pr-4
                text-gray-700
                rounded
                hover:bg-gray-100
                md:hover:bg-transparent
                md:border-0
                md:hover:text-blue-700
                md:p-0
                dark:text-gray-400
                md:dark:hover:text-white
                dark:hover:bg-gray-700 dark:hover:text-white
                md:dark:hover:bg-transparent
              "
              aria-current="page"
              >About</router-link
            >
          </li>
          <li>
            <router-link
              to="/Services"
              class="
                block
                py-2
                pl-3
                pr-4
                text-gray-700
                rounded
                hover:bg-gray-100
                md:hover:bg-transparent
                md:border-0
                md:hover:text-blue-700
                md:p-0
                dark:text-gray-400
                md:dark:hover:text-white
                dark:hover:bg-gray-700 dark:hover:text-white
                md:dark:hover:bg-transparent
              "
              aria-current="page"
              >Services</router-link
            >
          </li>
          <li>
            <router-link
              to="/Pricing"
              class="
                block
                py-2
                pl-3
                pr-4
                text-gray-700
                rounded
                hover:bg-gray-100
                md:hover:bg-transparent
                md:border-0
                md:hover:text-blue-700
                md:p-0
                dark:text-gray-400
                md:dark:hover:text-white
                dark:hover:bg-gray-700 dark:hover:text-white
                md:dark:hover:bg-transparent
              "
              aria-current="page"
              >Pricing</router-link
            >
          </li>
          <li>
            <router-link
              to="/ContactUs"
              class="
                block
                py-2
                pl-3
                pr-4
                text-gray-700
                rounded
                hover:bg-gray-100
                md:hover:bg-transparent
                md:border-0
                md:hover:text-blue-700
                md:p-0
                dark:text-gray-400
                md:dark:hover:text-white
                dark:hover:bg-gray-700 dark:hover:text-white
                md:dark:hover:bg-transparent
              "
              aria-current="page"
              >Contact Us</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

  


<script>
import axios from "axios";
import { localStorageExport } from "../localStorage/local-storage";

export default {
  data() {
    return { scrollPosition: null };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    Logout() {
      axios
        .post("http://127.0.0.1:8000/api/logout", {
          headers: {
            Authorization: 'Bearer' + localStorageExport("jwtToken") ,
          },
        })
        .then((res) => console.log(res))
        
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>

<style scoped>
.change_color {
  background-color: black;
}
.change_color_nav {
  color: white;
}
.change_color_nav:hover {
  color: rgb(59 130 246 / var(--tw-bg-opacity));
}
</style>