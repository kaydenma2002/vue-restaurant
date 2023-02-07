<template>
  <div class="bg-gray-100">
    <nav
      class="
        container-fluid
        px-6
        py-8
        mx-auto
        md:flex md:justify-between md:items-center
        bg-white
        dark:bg-gray-900
        fixed
        w-full
        z-20
        top-0
        left-0
        border-b border-gray-200
        dark:border-gray-600
      "
    >
      <div class="flex items-center justify-between">
        <a href="https://flowbite.com/" class="flex items-center">
          <h1>Your site Logo</h1>
        </a>

        <!-- Mobile menu button -->
        <div @click="showMenu = !showMenu" class="flex md:hidden">
          <button
            type="button"
            class="
              text-gray-800
              hover:text-gray-400
              focus:outline-none focus:text-gray-400
            "
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul
        :class="showMenu ? 'flex' : 'hidden'"
        class="
          flex-col
          space-y-4
          md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
        "
      >
        <li>
          <router-link
            to="/"
            class="
              block
              py-2
              pl-3
              pr-4
              rounded
              md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
              text-gray-700
              md:dark:hover:text-white md:dark:hover:bg-transparent
            "
            aria-current="page"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/menu"
            class="
              block
              py-2
              pl-3
              pr-4
              text-gray-700
              rounded
              hover:bg-gray-100
              md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
              dark:text-gray-400
              md:dark:hover:text-white
              dark:hover:bg-gray-700 dark:hover:text-white
              md:dark:hover:bg-transparent
            "
            aria-current="page"
            >Menu</router-link
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
              md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
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
            to="/pricing"
            class="
              block
              py-2
              pl-3
              pr-4
              text-gray-700
              rounded
              hover:bg-gray-100
              md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
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
              md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
              dark:text-gray-400
              md:dark:hover:text-white
              dark:hover:bg-gray-700 dark:hover:text-white
              md:dark:hover:bg-transparent
            "
            aria-current="page"
            >Contact Us</router-link
          >
        </li>
        <li>
          <button
            @click.prevent="RegisterforRestaurant()"
            class="
              bg-indigo-600
              px-3
              py-3
              rounded-lg
              text-white
              hover:bg-indigo-500
              text-sm
              shadow-lg shadow-indigo-500/50
            "
          >
            Your restaurant
          </button>
        </li>
        <li>
          <div v-if="isLoggedIn" class="cart-button">
            <button class="bg-indigo-600" @click="addToCart">
              <font-awesome-icon icon="fa-solid fa-cart-shopping" />
              ({{ quantity }})
            </button>
          </div>
        </li>
      </ul>
      <ul
        :class="showMenu ? 'flex' : 'hidden'"
        class="
          sm
          flex-col
          space-y-4
          md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
        "
      >
        <li>
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
              ml-2
            "
            >SIGNUP</router-link
          >
        </li>
        <li>
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
        </li>
      </ul>
    </nav>
  </div>
</template>

  


<script>
import axios from "axios";
import { localStorageExport } from "../localStorage/local-storage";
import Swal from "sweetalert2";
import { numeric } from "@vuelidate/validators";
import { HTTPS } from "../axios/http-axios";
export default {
  data() {
    return {
      showMenu: false,
      scrollPosition: null,
      isLoggedIn: false,
      quantity: String,

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

    RegisterforRestaurant() {
      this.$router.push("/get-started");
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
          Swal.fire("", "User logged out!", "success").then((res) => {
            this.emitter.emit("logout", true);
            localStorage.removeItem("jwtToken");
            this.isLoggedIn = false;
            this.$router.push("/login");
          });
        }
      });
    },
  },
  mounted() {
    
  },
  created() {
    window.addEventListener("scroll", this.updateScroll);
    this.emitter.on("cartUpdated", (value) => {
      HTTPS.get("cartByUserId")
        .then((res) => {
          this.quantity = res.data.length;
        })
        .catch((error) => console.log(error));
    });
    this.emitter.on("removeCart", () => {
      HTTPS.get("cartByUserId")
        .then((res) => {
          this.quantity = res.data.length;
        })
        .catch((error) => console.log(error));
    });
    this.emitter.on("login", () => {
      this.isLoggedIn = true;
    });
    this.isLoggedIn = !!localStorage.getItem("jwtToken");

    if (this.isLoggedIn) {
      HTTPS.get("user")
        .then((res) => {
          this.user.email = res.data.email;
        })
        .catch((error) => {
          localStorage.removeItem("jwtToken");
          this.$router.push("/login");
        });
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
.cart-button {
  display: inline-block;

  text-align: center;
}

.cart-button button {
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.cart-button button i {
  margin-right: 0.5rem;
}
</style>