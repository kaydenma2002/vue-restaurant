<template>
  <div v-if="!isRestaurant" class="container mx-auto ">
    <div class="text-center text-2xl lg:text-5xl md:text-3xl sm:text-2xl">
      Select to view 1 of 111531 <br />
      menu restaurant right away
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
                <label for="simple-search" class="sr-only"
                  >Enter your zip code</label
                >
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
                    placeholder="Enter your zip code"
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

                  <td class="px-4 py-3">{{ item.zip_code }}</td>
                  <td class="px-4 py-3">
                    <button
                      @click.prevent="ViewRestaurant(item.web_id)"
                      type="button"
                      class="text-white bg-black hover:bg-black focus:outline-none focus:ring-4 focus:ring-black font-medium rounded-full text-sm px-5 py-2.5 dark:bg-black dark:hover:bg-black dark:focus:ring-black"
                    >
                      View Restaurant
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
  <div v-if="isRestaurant" class="container mx-auto">
    <div
      class="mt-5 text-center mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl"
    >
      {{ restaurant_name }}
    </div>
    <div class="flex space-x-4 mb-4">
      <button
        v-if="isLoggedIn"
        @click="showAllItems"
        :class="{ 'bg-black text-white': selectedCategory === null }"
        class="px-4 py-2 rounded"
      >
        All
      </button>
      <button
      v-for="(category, index) in categories"
      :key="index"
      @click="showItemsByCategory(category)"
      :class="{
        'bg-black text-white': isLoggedIn && selectedCategory === category,
        'bg-black text-white': !isLoggedIn && (selectedCategory === category || selectedCategory === null),
      }"
      class="px-4 py-2 rounded "
      v-show="!isLoggedIn && index == 0"
      >
      {{ category }}
    </button>
    
    <button
      v-for="(category, index) in categories"
      :key="index"
      @click="showItemsByCategory(category)"
      :class="{
        'bg-black text-white': isLoggedIn && selectedCategory === category,
        
      }"
      class="px-4 py-2 rounded "
      v-show="isLoggedIn"
      >
      {{ category }}
    </button>
    </div>

    <div class="">
      <div v-for="(category, index) in categories" :key="category">
        <h2
          v-if="
            (isLoggedIn && (index === 0 || category === selectedCategory)) ||
            (!isLoggedIn && index === 0)
          "
          class="text-2xl font-bold mb-2 bg-black text-white my-20"
        >
          {{ category }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="(item, index) in filteredItems(category)"
            :key="index"
            class="box-content"
          >
            <div class="overlay h-full h-auto">
              <FoodCard
                :restaurant_id="item.restaurant_id"
                :id="item.id"
                :name="item.title"
                :description="item.description"
                :price="item.price"
                :image="item.image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import {
  required,
  between,
  email,
  numeric,
  minLength,
} from "@vuelidate/validators";
import { debounce } from "lodash";
import {
  localStorageExport,
  localStorageImport,
  localStorageRemove,
} from "../localStorage/local-storage";
import Swal from "sweetalert2";
import FoodCard from "../components/FoodCard.vue";
import { HTTP, HTTPS } from "../axios/http-axios";
import { editContent } from "../changeType/menu-item";
export default {
  components: { FoodCard },
  data() {
    return {
      v$: useValidate(),
      restaurant_name: "",
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
      isRestaurant: localStorageExport("isRestaurant"),
      items: [],
      categories: [],
      selectedCategory: null,
      isLoggedIn: null,
    };
  },
  methods: {
    async ViewRestaurant(web_id) {
      try {
        const res = await HTTP.post("restaurant/find", { web_id: web_id });

        if (res.data.length !== 0) {
          this.emitter.emit("isRestaurant", true);
          this.$nextTick(() => {
            this.$router.push(`/${web_id}`);
          });
        } else {
          localStorageRemove("isRestaurant");
          this.isRestaurant = localStorageExport("isRestaurant");
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
        localStorageRemove("isRestaurant");
        this.$router.push("/");
      }
    },
    async fetchCategoriesAndItems(web_id) {
      try {
        const response = await HTTP.post("menu", { web_id: web_id });
        this.categories = response.data.category;
        this.items = response.data.item;
        console.log(this.categories);
      } catch (error) {
        console.error(error);
      }
    },
    showAllItems() {
      this.selectedCategory = null;
    },
    showItemsByCategory(category) {
      this.selectedCategory = category;
    },

    search: debounce(async function () {
      const res = await HTTP.get(
        `/restaurant/search?search=${this.searchTerm}`
      );
      this.restaurant = res.data.data;
      this.current_page = res.data.current_page;
      this.last_page = res.data.last_page;
    }, 200),

    fetchRestaurants(page) {
      this.loading = true;
      try {
        HTTPS.get(
          `/restaurant/search?search=${this.searchTerm}&page=${page}`
        ).then((res) => {
          this.restaurant = res.data.data;
          this.current_page = res.data.current_page;
          this.last_page = res.data.last_page;
          console.log(res);
          console.log(this.isRestaurant);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
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
  computed: {
    filteredItems() {
      return (category) => {
        return this.displayedItems.filter((item) => item.category === category);
      };
    },
    displayedItems() {
      if (this.selectedCategory === null) {
        if (!this.isLoggedIn) {
          const firstCategory = this.categories[0];
          return this.items.filter((item) => item.category === firstCategory);
        }
        return this.items;
      } else {
        return this.items.filter(
          (item) => item.category === this.selectedCategory
        );
      }
    },
  },
  created() {
    this.isLoggedIn = localStorageExport("jwtToken");
    console.log(localStorageExport("isRestaurant"));

    const url = window.location.pathname;
    const match = url.match(/^\/([^/]+)/);
    const pathParam = match ? match[1] : null;

    if (pathParam) {
      console.log(pathParam);
      HTTP.post("restaurant/find", { web_id: pathParam })
        .then((res) => {
          console.log(res.data.length);

          if (res.data.length != 0) {
            this.restaurant_name = res.data.name;
            localStorageImport("isRestaurant", true);
            this.fetchCategoriesAndItems(pathParam);

            this.isRestaurant = localStorageExport("isRestaurant");
            this.emitter.emit("isRestaurant", true);
          } else {
            localStorageRemove("isRestaurant");
            this.emitter.emit("isNotRestaurant", true);

            this.$nextTick(() => {
              this.isRestaurant = localStorageExport("isRestaurant");
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

    this.search();
  },
};
</script>
