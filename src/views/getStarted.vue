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
        <p class="underline">data@emersonhlee.com</p>
      </div>
    </div>
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
        <!-- Start coding here -->
        <div
          class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
        >
          <div
            class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
          >
            <div class="w-full md:w-1/2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
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
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-4 py-3">id</th>
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
                  class="cursor-pointer bg-gray-200 border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="claimRestaurant(item.restaurant_id, item.status)"
                >
                  <th
                    scope="row"
                    class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ item.id }}
                  </th>
                  <th
                    scope="row"
                    class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ item.name }}
                  </th>
                  <td class="px-4 py-3">{{ item.city }}</td>
                  <td class="px-4 py-3">{{ item.state }}</td>
                  <td v-if="item.status === 'Pending'">
                    <div
                      class="text-white bg-black hover:bg-black focus:outline-none focus:ring-4 focus:ring-black font-medium rounded-full text-sm px-5 py-2.5 dark:bg-black dark:hover:bg-black dark:focus:ring-black px-5 py-3 text-center"
                    >
                      {{ item.status }}
                    </div>
                  </td>
                  <td v-else-if="item.status === 'Active'">
                    <div
                      class="t text-black bg-white hover:bg-white focus:outline-none focus:ring-4 focus:ring-white font-medium rounded-full text-sm dark:bg-white dark:hover:bg-white dark:focus:ring-black px-5 py-3 text-center"
                    >
                      {{ item.status }}
                    </div>
                  </td>
                  <td v-else>
                    <div
                      class="text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-black font-medium rounded-full text-sm px-5 py-3 text-center"
                    >
                      {{ item.status }}
                    </div>
                  </td>
                  <td class="px-4 py-3">{{ item.zip_code }}</td>
                  <td v-if="item.status === 'Pending'" class="px-4 py-3">
                    <button
                      type="button"
                      class="text-white bg-black hover:bg-black focus:outline-none focus:ring-4 focus:ring-black font-medium rounded-full text-sm px-5 py-2.5 dark:bg-black dark:hover:bg-black dark:focus:ring-black"
                    >
                      Claim Your Restaurant
                    </button>
                  </td>
                  <td class="px-4 py-3" v-if="item.status === 'Active'">
                    <button
                      type="disabled"
                      class="text-black bg-white hover:bg-white focus:outline-none focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-5 py-2.5 dark:bg-white dark:hover:bg-white dark:focus:ring-black"
                    >
                      Claimed
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav
            class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <ul class="flex pagination">
              <li class="page-item" :class="{ disabled: current_page === 1 }">
                <button
                  class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                  class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >{{ current_page }} / {{ last_page }}</span
                >
              </li>
              <li
                class="page-item"
                :class="{ disabled: current_page === last_page }"
              >
                <button
                  class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
import { localStorageExport } from "../localStorage/local-storage";
export default {
  data() {
    return {
      v$: useValidate(),
      file: "",
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
    submitClaimYourRestaurant(id, file) {
      this.v$.$validate(); // checks all
      console.log(file);
      if (!this.v$.$error) {
        // if ANY fail validation
        HTTP.post("/create/claim", {
          restaurant_id: id,
          file: file,
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
      } else {
        console.log(this.v$.$error);
      }
    },
    async claimRestaurant(id, status) {
      if (!localStorageExport("jwtToken")) {
        Swal.fire({
          title: "Authentication issue?",
          text: "You need to login to be able to claim restaurants",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/login");
          }
        });
      } else {
        if(status ==="Pending"){
          const { value: file } = await Swal.fire({
          title: "Select image",
          input: "file",
          inputAttributes: {
            accept: "image/*",
            "aria-label": "Upload your profile picture",
          },
        });

        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            console.log(e.target.result)
            HTTPS.post('create/claim',{
              file: e.target.result,
              restaurant_id: id
            }).then(res =>{
              console.log(res)
            }).catch(error => {
              console.log(error)
            })
          };
          reader.readAsDataURL(file);
        } else {

        }
        }else{

        }
      }
    },

    search: debounce(async function () {
      const res = await HTTP.get(
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
        console.log(1);
      }
    },
  },
  validations() {
    return {
      file: { required },
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
