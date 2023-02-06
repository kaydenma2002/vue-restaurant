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
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
        <!-- Start coding here -->
        <div
          class="
            bg-white
            dark:bg-gray-800
            relative
            shadow-md
            sm:rounded-lg
            overflow-hidden
          "
        >
          <div
            class="
              flex flex-col
              md:flex-row
              items-center
              justify-between
              space-y-3
              md:space-y-0 md:space-x-4
              p-4
            "
          >
            <div class="w-full md:w-1/2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                  <div
                    class="
                      absolute
                      inset-y-0
                      left-0
                      flex
                      items-center
                      pl-3
                      pointer-events-none
                    "
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    v-model="searchTerm"
                    @input="search"
                    id="simple-search"
                    class="
                      bg-gray-50
                      border border-gray-300
                      text-gray-900 text-sm
                      rounded-lg
                      focus:ring-primary-500 focus:border-primary-500
                      block
                      w-full
                      pl-10
                      p-2
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-primary-500
                      dark:focus:border-primary-500
                    "
                    placeholder="Search"
                    required=""
                  />
                </div>
              </form>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="
                  text-xs text-gray-700
                  uppercase
                  bg-gray-50
                  dark:bg-gray-700 dark:text-gray-400
                "
              >
                <tr>
                  <th scope="col" class="px-4 py-3">Name</th>
                  <th scope="col" class="px-4 py-3">City</th>
                  <th scope="col" class="px-4 py-3">State</th>
                  <th scope="col" class="px-4 py-3">Status</th>
                  <th scope="col" class="px-4 py-3">zip code</th>
                  <th scope="col" class="px-4 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in restaurant"
                  :key="index"
                  class="
                    cursor-pointer
                    border-b
                    dark:border-gray-600
                    hover:bg-gray-100
                    dark:hover:bg-gray-700
                  "
                  @click="claimRestaurant(item.id)"
                >
                  <th
                    scope="row"
                    class="
                      px-4
                      py-3
                      font-medium
                      text-gray-900
                      whitespace-nowrap
                      dark:text-white
                    "
                  >
                    {{ item.name }};
                  </th>
                  <td class="px-4 py-3">{{ item.city }}</td>
                  <td class="px-4 py-3">{{ item.state }}</td>
                  <td class="px-4 py-3">{{ item.status }}</td>
                  <td class="px-4 py-3">{{ item.zip_code }}</td>
                  <td class="px-4 py-3">
                    <button
                      type="button"
                      class="
                        text-white
                        bg-indigo-700
                        hover:bg-indigo-800
                        focus:outline-none focus:ring-4 focus:ring-indigo-300
                        font-medium
                        rounded-full
                        text-sm
                        px-5
                        py-2.5
                        text-center
                        dark:bg-indigo-600
                        dark:hover:bg-indigo-700
                        dark:focus:ring-indigo-800
                      "
                    >
                      Claim Your Restaurant
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav
            class="
              flex flex-col
              md:flex-row
              justify-between
              items-start
              md:items-center
              space-y-3
              md:space-y-0
              p-4
            "
            aria-label="Table navigation"
          >
            <ul class="flex pagination">
              <li class="page-item" :class="{ disabled: current_page === 1 }">
                <button
                  class="
                    flex
                    items-center
                    justify-center
                    h-full
                    py-1.5
                    px-3
                    leading-tight
                    text-gray-500
                    bg-white
                    rounded-l-lg
                    border border-gray-300
                    hover:bg-gray-100 hover:text-gray-700
                    dark:bg-gray-800
                    dark:border-gray-700
                    dark:text-gray-400
                    dark:hover:bg-gray-700
                    dark:hover:text-white
                  "
                  :disabled="loading"
                  @click="fetchRestaurants(current_page - 1)"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <span
                  class="
                    flex
                    items-center
                    justify-center
                    text-sm
                    py-2
                    px-3
                    leading-tight
                    text-gray-500
                    bg-white
                    border border-gray-300
                    hover:bg-gray-100 hover:text-gray-700
                    dark:bg-gray-800
                    dark:border-gray-700
                    dark:text-gray-400
                    dark:hover:bg-gray-700
                    dark:hover:text-white
                  "
                  >{{ current_page }} / {{ last_page }}</span
                >
              </li>
              <li
                class="page-item"
                :class="{ disabled: current_page === last_page }"
              >
                <button
                  class="
                    flex
                    items-center
                    justify-center
                    h-full
                    py-1.5
                    px-3
                    leading-tight
                    text-gray-500
                    bg-white
                    rounded-r-lg
                    border border-gray-300
                    hover:bg-gray-100 hover:text-gray-700
                    dark:bg-gray-800
                    dark:border-gray-700
                    dark:text-gray-400
                    dark:hover:bg-gray-700
                    dark:hover:text-white
                  "
                  :disabled="loading"
                  @click="fetchRestaurants(current_page + 1)"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { HTTP, HTTPS } from "../axios/http-axios";
import useValidate from "@vuelidate/core";
import {
  required,
  between,
  email,
  numeric,
  minLength,
} from "@vuelidate/validators";
import { debounce } from "lodash";

export default {
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      company: "",
      phone: "",
      zip_code: "",
      restaurant: [],
      searchTerm: "",
      total: "",
      per_page: "",
      current_page: "",
      last_page: "",
      previousLoading: false,
      nextLoading: false,
    };
  },
  methods: {
    submitReservation() {
      this.v$.$validate(); // checks all
      console.log(this.v$);
      if (!this.v$.$error) {
        // if ANY fail validation
        HTTP.post("/createReservation", {
          name: this.name,
          company: this.company,
          zip_code: this.zip_code,
          email: this.email,
          phone: this.phone,
        })
          .then(
            Swal.fire(
              "Thank you for submit!",
              "You will be contacted soon!",
              "success"
            )
              .then((res) => {
                this.$router.push("/");
              })
              .catch((err) => {
                console.log(err);
              })
          )
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async claimRestaurant($id) {
      Swal.fire({
        title: "Enter multiple values",
        html:
          '<input id="input1" class="swal2-input" placeholder="Enter name">' +
          '<input id="input2" class="swal2-input" placeholder="Enter email">' +
          '<input id="input3" class="swal2-input" placeholder="Enter phone">' +
          '<input id="input4" class="swal2-input" placeholder="Enter zip_code">' +
          '<input id="input5" class="swal2-input" placeholder="Enter company">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("input1").value,
            document.getElementById("input2").value,
            document.getElementById("input3").value,
            document.getElementById("input4").value,
            document.getElementById("input5").value,
          ];
        },
      }).then((result) => {
        if (result.value) {
          const inputValues = result.value;
          this.name = inputValues[0];
          this.email = inputValues[1];
          this.phone = inputValues[2];
          this.zip_code = inputValues[3];
          this.company = inputValues[4];
          this.submitReservation();
        }
      });
    },

    search: debounce(async function () {
      const res = await HTTPS.get(
        `/restaurant/search?search=${this.searchTerm}`
      );
      this.restaurant = res.data.data;
      this.current_page = res.data.current_page;
      this.last_page = res.data.last_page;
    }, 50),

    async fetchRestaurants(page) {
      this.loading = true;
      try {
        const res = await HTTPS.get(
          `/restaurant/search?search=${this.searchTerm}&page=${page}`
        );
        this.restaurant = res.data.data;
        this.current_page = res.data.current_page;
        this.last_page = res.data.last_page;
      } catch (error) {
        // Your code to handle the error
      } finally {
        this.loading = false;
        console.log(1)
      }
    },
  },
  validations() {
    return {
      name: { required },
      email: { required, minLengthValue: minLength(10), email },
      company: { required, minLengthValue: minLength(10) },
      phone: { required },
      zip_code: { required, numeric },
    };
  },
  created() {
    this.fetchRestaurants(1);

    this.search();
  },
  computed: {
    pages() {
      let pages = [];
      for (let i = 1; i <= this.last_page; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
};
</script>