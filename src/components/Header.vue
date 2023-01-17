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
        <router-link
          v-if="!isLoggedIn"
          to="/Login"
          class="text-gray-800 text-sm"
          >LOGIN</router-link
        >
        <router-link
          v-if="!isLoggedIn"
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
        <button
          v-if="isLoggedIn"
          class="
            bg-indigo-600
            px-4
            py-2
            rounded
            text-white
            hover:bg-indigo-500
            text-sm
          "
        >
          {{ user.email }}
        </button>
        <a
          class="nav-item nav-link"
          v-if="isLoggedIn"
          @click.prevent="Logout"
          href="#"
          >Logout</a
        >
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
import Swal from "sweetalert2";
export default {
  data() {
    return {
      scrollPosition: null,
      isLoggedIn: false,
      user: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    Logout() {
      Swal.fire({
        title: "Are you sure to logout ?",
        
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log out my account",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(
            "http://127.0.0.1:8000/api/logout",
            {
              key: "value",
            },
            {
              headers: {
                Authorization: `Bearer ${localStorageExport("jwtToken")}`,
              },
            }
          );
          Swal.fire("", "User logged out!", "success");
          localStorage.removeItem("jwtToken");
          this.isLoggedIn = false;
          this.$router.push("/login");
        }
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
    this.emitter.on("login", () => {
      this.isLoggedIn = true;
    });
    this.isLoggedIn = !!localStorage.getItem("jwtToken");
    if (this.isLoggedIn) {
      axios
        .get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${localStorageExport("jwtToken")}`,
          },
        })
        .then((res) => {

          this.user.name = res.data.name;
          this.user.email = res.data.email;
        }).catch(error => {
          this.$router.push("/login") ;localStorage.removeItem("jwtToken"); });
        ;
    }
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