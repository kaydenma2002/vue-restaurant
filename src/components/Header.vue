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
      <ul v-if="isLoggedIn"
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
              md:hover:bg-transparent
              md:border-0
              md:hover:text-black
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
            to="/menu"
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
              md:hover:text-black
              md:p-0
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
            to="/Order"
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
              md:hover:text-black
              md:p-0
              dark:text-gray-400
              md:dark:hover:text-white
              dark:hover:bg-gray-700 dark:hover:text-white
              md:dark:hover:bg-transparent
            "
            aria-current="page"
            >Orders</router-link
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
              md:hover:text-black
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
            to="/pricing"
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
              md:hover:text-black
              md:p-0
              dark:text-gray-400
              md:dark:hover:text-white
              dark:hover:bg-gray-700 dark:hover:text-white
              md:dark:hover:bg-transparent
            "
            aria-current="page"
            >Make Payment</router-link
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
              md:hover:text-black
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
        <li>
          <button
            @click.prevent="RegisterforRestaurant()"
            class="
              bg-black
              px-3
              py-3
              rounded-lg
              text-white
              hover:bg-black
              text-sm
              shadow-lg shadow-black/50
            "
          >
            Your restaurant
          </button>
        </li>
        <li>
          <div v-if="isLoggedIn" class="cart-button">
            <button class="bg-black" @click="navigateToPayment">
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
              bg-black
              px-4
              py-2
              rounded
              text-white
              hover:bg-black
              text-sm
              ml-2
            "
            >SIGNUP</router-link
          >
        </li>
        <li>
          <button
            v-if="isLoggedIn"
            data-popover-target="popover-user-profile"
            type="button"
            @click="showProfile"
            class="
              text-white
              bg-black
              hover:bg-black
              focus:ring-4 focus:outline-none focus:ring-black
              font-medium
              rounded-lg
              text-sm
              px-5
              py-2.5
              text-center
              dark:bg-black
              dark:hover:bg-black
              dark:focus:ring-black
            "
          >
            {{ user.email }}
          </button>
          <div
            data-popover
            id="popover-user-profile"
            role="tooltip"
            class="
              absolute
              z-10
              invisible
              inline-block
              w-64
              text-sm
              font-light
              text-gray-500
              transition-opacity
              duration-300
              bg-white
              border border-gray-200
              rounded-lg
              shadow-sm
              opacity-0
              dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600
            "
          >
            <div class="p-3">
              <div class="flex items-center justify-between mb-2">
                <a href="#">
                  <img
                    class="w-10 h-10 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Jese Leos"
                  />
                </a>
                <div>
                  <button
                    @click="showProfile"
                    type="button"
                    class="
                      text-white
                      bg-black
                      hover:bg-black
                      focus:ring-4 focus:ring-black
                      font-medium
                      rounded-lg
                      text-xs
                      px-3
                      py-1.5
                      dark:bg-black dark:hover:bg-black
                      focus:outline-none
                      dark:focus:ring-black
                    "
                  >
                    Edit profile
                  </button>
                </div>
              </div>
              <p
                class="
                  text-base
                  font-semibold
                  leading-none
                  text-gray-900
                  dark:text-white
                "
              >
                <a href="#">{{ user.name }}</a>
              </p>

              <p class="mb-4 text-sm font-light">
                Open-source contributor. Building
                <a
                  href="#"
                  class="text-black dark: hover:underline"
                  >flowbite.com</a
                >.
              </p>
              <ul class="flex text-sm font-light">
                <li class="mr-2">
                  <a href="#" class="hover:underline">
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >799</span
                    >
                    <span>Following</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >3,758</span
                    >
                    <span>Followers</span>
                  </a>
                </li>
              </ul>
            </div>
            <div data-popper-arrow></div>
          </div>
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
    showProfile() {
      this.$router.push("/profile");
    },
    navigateToPayment(){
      this.$router.push("/pricing");
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
            "https://127.0.0.1/api/logout",
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
  mounted() {},
  created() {
    window.addEventListener("scroll", this.updateScroll);
    this.emitter.on("cartUpdated", () => {
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
      this.isLoggedIn = !!localStorage.getItem("jwtToken");
      if (this.isLoggedIn) {
        HTTPS.get("user")
          .then((res) => {
            this.user.email = res.data.email;
            this.user.name = res.data.name;
            HTTPS.get("cartByUserId")
              .then((res) => {
                this.quantity = res.data.length;
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => {
            localStorage.removeItem("jwtToken");
            this.$router.push("/login");
          });
      }
    });
    this.isLoggedIn = !!localStorage.getItem("jwtToken");
    if (this.isLoggedIn) {
      HTTPS.get("user")
        .then((res) => {
          this.user.email = res.data.email;
          this.user.name = res.data.name;

          HTTPS.get("cartByUserId")
            .then((res) => {
              this.quantity = res.data.length;
            })
            .catch((error) => console.log(error));
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