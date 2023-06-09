<template>
  <div class="bg-gray-100">
    <nav
      class="container-fluid px-6 py-8 mx-auto md:flex md:justify-between md:items-center bg-white dark:bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
    >
      <div class="flex items-center justify-between">
        <a href="/" class="flex items-center">
          <h1>Your site Logo</h1>
        </a>

        <!-- Mobile menu button -->
        <div @click="showMenu = !showMenu" class="flex md:hidden">
          <button
            type="button"
            class="text-gray-800 hover:text-white focus:outline-none focus:text-white"
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
        class="flex-col space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
      >
        <li>
          <router-link
            :to="isRestaurant ? `/${$route.params.web_id}` : '/'"
            class="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 text-gray-700 md:dark:hover:text-white md:dark:hover:bg-transparent text-sm md:text-sm"
            aria-current="page"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            :to="isRestaurant ? `/${$route.params.web_id}/menu` : 'menu'"
            class="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 text-gray-700 md:dark:hover:text-white md:dark:hover:bg-transparent text-sm md:text-sm"
            aria-current="page"
            >Menu</router-link
          >
        </li>
        <li v-if="isLoggedIn">
          <router-link
            :to="isRestaurant ? `/${$route.params.web_id}/Order` : 'Order'"
            class="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 text-gray-700 md:dark:hover:text-white md:dark:hover:bg-transparent text-sm md:text-sm"
            aria-current="page"
            >Orders</router-link
          >
        </li>
        <!-- <li>
          <router-link
            :to="
              isRestaurant ? `/${$route.params.web_id}/Services` : 'Services'
            "
            class="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 text-gray-700 md:dark:hover:text-white md:dark:hover:bg-transparent text-sm md:text-sm"
            aria-current="page"
            >Services</router-link
          >
        </li> -->

        <!-- <li>
          <router-link
            :to="
              isRestaurant ? `/${$route.params.web_id}/ContactUs` : 'ContactUs'
            "
            class="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 text-gray-700 md:dark:hover:text-white md:dark:hover:bg-transparent text-sm md:text-sm"
            aria-current="page"
            >Contact Us</router-link
          >
        </li> -->
        <li>
          <div v-if="isLoggedIn && isRestaurant" class="cart-button">
            <button
              class="bg-black"
              @click="showReservation = !showReservation"
            >
              <font-awesome-icon icon="fa-solid fa-calendar-days" />
              Make a reservation
            </button>
            <div v-if="showReservation" class="popup-overlay"></div>
            <Transition
              enter-active-class="animate__animated animate__fadeInDown"
              leave-active-class="animate__animated animate__fadeOutUp"
              name="reservation"
            >
              <div v-if="showReservation" class="reservation bg-black">
                <!-- Reservation content goes here -->
                <div class="text-right">
                  <button
                    @click="showReservation = !showReservation"
                    class="popup-close-btn"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="text-xl font-medium text-white">
                  {{ restaurant_name }}
                </div>
                <form @submit.prevent="submitReservation">
                  <div class="text-left">
                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="email"
                          name="floating_email"
                          id="floating_email"
                          v-model="email"
                          class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-white-500 focus:outline-none focus:ring-0 focus:border-white peer"
                          placeholder=" "
                          required
                        />
                        <label
                          for="floating_email"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >Email address</label
                        >
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          v-model="phone"
                          type="tel"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          name="floating_phone"
                          id="floating_phone"
                          class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-white-500 focus:outline-none focus:ring-0 focus:border-white peer"
                          placeholder=" "
                          required
                        />
                        <label
                          for="floating_phone"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >Phone number (123-456-7890)</label
                        >
                      </div>
                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="floating_first_name"
                          id="floating_first_name"
                          class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
                          placeholder=" "
                          required
                        />
                        <label
                          for="floating_first_name"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >First name</label
                        >
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="floating_last_name"
                          id="floating_last_name"
                          class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
                          placeholder=" "
                          required
                        />
                        <label
                          for="floating_last_name"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >Last name</label
                        >
                      </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-6 group">
                        <VueDatePicker v-model="date" hours-increment="2" />
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <select
                          v-model="table"
                          id="countries"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
                        >
                          <option selected>Select quantity of tables</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black-600 dark:hover:bg-gray-700 dark:focus:ring-black-800 px-4 py-2 border-4 border-white"
                  >
                    Submit Reservation
                  </button>
                </form>
              </div>
            </Transition>
          </div>
        </li>
        <li>
          <button
            v-if="isLoggedIn && !isRestaurant"
            @click.prevent="RegisterforRestaurant()"
            class="bg-black px-3 py-3 rounded-lg text-white hover:bg-black text-sm shadow-lg shadow-black/50"
          >
            Your restaurant
          </button>
        </li>
        <li>
          <div v-if="isLoggedIn && isRestaurant" class="cart-button">
            <button class="bg-black" @click="show = !show">
              <font-awesome-icon icon="fa-solid fa-cart-shopping" />

              ({{ quantity }})
            </button>
          </div>
          <Transition duration="550" name="cart" class="tooltip">
            <div
              v-if="show"
              class="outer max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div class="inner">
                <a href="#">
                  <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white"
                  >
                    My cart({{ quantity }})
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-white">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <button
                  @click.prevent="navigateToPayment()"
                  type="button"
                  class="text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </Transition>
        </li>
      </ul>
      <ul
        :class="showMenu ? 'flex' : 'hidden'"
        class="sm flex-col space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
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
            class="bg-black px-4 py-2 rounded text-white hover:bg-black text-sm ml-2"
            >SIGNUP</router-link
          >
        </li>
        <li>
          <button
            v-if="isLoggedIn"
            data-popover-target="popover-user-profile"
            type="button"
            @click="showProfile"
            class="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black"
          >
            {{ user.email }}
          </button>
          <div
            data-popover
            id="popover-user-profile"
            role="tooltip"
            class="absolute z-10 invisible inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-white dark:bg-gray-800 dark:border-gray-600"
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
                    class="text-white bg-black hover:bg-black focus:ring-4 focus:ring-black font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-black dark:hover:bg-black focus:outline-none dark:focus:ring-black"
                  >
                    Edit profile
                  </button>
                </div>
              </div>
              <p
                class="text-xs font-semibold leading-none text-white dark:text-white"
              >
                <a href="#">{{ user.name }}</a>
              </p>

              <p class="mb-4 text-sm font-light">
                Open-source contributor. Building
                <a href="#" class="text-black dark: hover:underline"
                  >flowbite.com</a
                >.
              </p>
              <ul class="flex text-sm font-light">
                <li class="mr-2">
                  <a href="#" class="hover:underline">
                    <span class="font-semibold text-white dark:text-white"
                      >799</span
                    >
                    <span>Following</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    <span class="font-semibold text-white dark:text-white"
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

import {
  localStorageImport,
  localStorageExport,
  localStorageRemove,
} from "../localStorage/local-storage";
import Swal from "sweetalert2";
import { numeric } from "@vuelidate/validators";
import { HTTP, HTTPS } from "../axios/http-axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      showReservation: false,
      restaurant_name: null,
      showMenu: false,
      show: false,
      scrollPosition: null,
      isLoggedIn: false,
      quantity: String,
      date: null,
      email: null,
      table: null,
      user: {
        name: "",
        email: "",
      },
      isRestaurant: null,
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    submitReservation() {},

    showProfile() {
      this.$router.push("/profile");
    },
    navigateToPayment() {
      if (this.quantity != 0) {
        this.$router.push(`/${this.$route.params.web_id}/pricing`);
      } else {
        Swal.fire({
          title: "<strong>You have not ordered yet !</strong>",
          icon: "error",

          focusConfirm: false,
          confirmButtonText: `<a href="/${this.$route.params.web_id}/menu">Click here to order.</a> `,
        });
      }
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
          HTTPS.post("logout").then(() => {
            Swal.fire("", "User logged out!", "success").then((res) => {
              this.emitter.emit("logout", true);
              localStorage.removeItem("jwtToken");
              this.isLoggedIn = false;
              this.$router.push("/");
            });
          });
        }
      });
    },
  },

  mounted() {},

  created() {
    console.log(this.isRestaurant);
    this.date = new Date();
    const url = window.location.pathname;
    const match = url.match(/^\/([^/]+)/);
    const pathParam = match ? match[1] : null;
    console.log(1);
    if (pathParam) {
      console.log(pathParam);
      HTTP.post("restaurant/find", { web_id: pathParam })
        .then((res) => {
          console.log(res);
          if (res.data.length != 0) {
            this.restaurant_name = res.data.name;
            this.emitter.emit("isRestaurant", true);
            localStorageImport("isRestaurant", true);
            this.$nextTick(() => {
              this.isRestaurant = localStorageExport("isRestaurant");
              HTTPS.get("cartByUserId", { params: { web_id: pathParam } })
                .then((res) => {
                  this.quantity = res.data.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.quantity,
                    0
                  );
                })
                .catch((error) => console.log(error));
            });
          } else {
            console.log(1);
            localStorageRemove("isRestaurant");
            this.$nextTick(() => {
              this.isRestaurant = localStorageImport("isRestaurant");
            });

            this.$router.options.routes.forEach((route) => {
              console.log(route);
              if (this.$route.meta.guestOnly) {
                if (route.path.substring(1) === pathParam) {
                  this.$router.replace(pathParam);
                }
              } else {
              }
            });
          }
        })
        .catch((error) => {
          this.$nextTick(() => {
            localStorageRemove("isRestaurant");
          });
        });
    } else {
      this.$nextTick(() => {
        localStorageRemove("isRestaurant");
      });
    }
    window.addEventListener("scroll", this.updateScroll);
    this.emitter.on("isRestaurant", () => {
      localStorageImport("isRestaurant", true);
      this.isRestaurant = localStorageExport("isRestaurant");
      HTTPS.get("cartByUserId", {
        params: { web_id: this.$route.params.web_id },
      })
        .then((res) => {
          if (
            res.data.message != "empty cart" &&
            res.data.message != "restaurant not exist"
          ) {
            localStorageImport("isRestaurant", true);
            this.isRestaurant = localStorageExport("isRestaurant");
            this.quantity = res.data.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.quantity,
              0
            );
          } else if (res.data.message == "empty cart") {
            localStorageImport("isRestaurant", true);
            this.isRestaurant = localStorageExport("isRestaurant");
            this.quantity = 0;
          } else {
            localStorageRemove("isRestaurant");
            this.isRestaurant = localStorageExport("isRestaurant");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
    this.emitter.on("cartUpdated", () => {
      HTTPS.get("cartByUserId", {
        params: { web_id: this.$route.params.web_id },
      })
        .then((res) => {
          if (
            res.data.message != "empty cart" &&
            res.data.message != "restaurant not exist"
          ) {
            localStorageImport("isRestaurant", true);
            this.isRestaurant = localStorageExport("isRestaurant");
            this.quantity = res.data.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.quantity,
              0
            );
          } else if (res.data.message == "empty cart") {
            localStorageImport("isRestaurant", true);
            this.isRestaurant = localStorageExport("isRestaurant");
            this.quantity = 0;
          } else {
            localStorageRemove("isRestaurant");
            this.isRestaurant = localStorageExport("isRestaurant");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
    this.emitter.on("removeCart", () => {
      HTTPS.get("cartByUserId", { params: { web_id: pathParam } })
        .then((res) => {
          this.quantity = res.data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.quantity,
            0
          );
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
          })
          .catch((error) => {
            localStorageRemove("jwtToken");
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
        })
        .catch((error) => {
          localStorageRemove("jwtToken");
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
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.reservation {
  position: fixed;
  top: 30%;
  left: 20%;

  z-index: 9999;

  width: 60%;

  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.popup-close-btn {
  cursor: pointer;
}

.cart-enter-active,
.cart-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.cart-leave-active {
  transition-delay: 0.25s;
}

.cart-enter-from,
.cart-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition cart elements using cart selectors */
.cart-enter-active .inner,
.cart-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of cart element */
.cart-enter-active .inner {
  transition-delay: 0.25s;
}

.cart-enter-from .inner,
.cart-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling cart opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}

.tooltip {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  border-radius: 4px;
  display: inline-block;
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
