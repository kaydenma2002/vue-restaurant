<template>
  <div class="container mx-auto">
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div class="text-lg">Order History</div>
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
                    v-model="search"
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
                  <th class="text-left">Order id</th>
                  <th class="text-left">Restaurant</th>
                  <th class="text-center">phone</th>
                  <th class="text-left">Address</th>

                  <th class="text-left">Total</th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in ordersToDisplay"
                  :key="order.id"
                  class="border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ order.id }}
                  </th>

                  <td>{{ order.restaurant.phone }}</td>
                  <td>{{ order.restaurant.phone }}</td>
                  <td>{{ order.restaurant.address }}</td>

                  <td>{{ order.total }}</td>

                  <td class="px-4 py-3 flex items-center">
                    <font-awesome-icon
                      @click.prevent="viewOrderDetailbyId(order.id)"
                      style="width: 100%; text-align: center"
                      class="fa-xl cursor-pointer"
                      icon="fa-solid fa-eye"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <nav
            class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white"
                >Page {{ currentPage }} of {{ totalPages }}</span
              >
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  :disabled="currentPage === 1"
                  @click="currentPage--"
                  class="px-3 py-1 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>

              <li>
                <button
                  :disabled="currentPage === totalPages"
                  @click="currentPage++"
                  class="px-3 py-1 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 dark:hover:text-white"
                >
                  Next
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
import {
  localStorageImport,
  localStorageExport,
  localStorageRemove,
} from "../localStorage/local-storage";
export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      orders: [],
      search: "",
    };
  },
  created() {
    const url = window.location.pathname;
    const match = url.match(/^\/([^/]+)/);
    const pathParam = match ? match[1] : null;

    if (pathParam) {
      HTTP.post("restaurant/find", { web_id: pathParam })
        .then((res) => {
          console.log(res);
          if (res.data.length !== 0) {
            localStorageImport("isRestaurant", true);
            console.log(pathParam);
            this.fetchOrders(pathParam);
          } else {
            this.fetchOrders(null);
            this.$nextTick(() => {
              localStorageRemove("isRestaurant");
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
  },
  mounted() {},
  methods: {
    fetchOrders(web_id) {
      try {
        HTTPS.get("order", { params: { web_id: web_id } }).then((res) => {
          this.orders = res.data;
          console.log(res);
        });
      } catch (error) {
        console.log(error);
      }
    },
    viewOrderDetailbyId(id) {
      localStorageImport("order_id", id);
      if (localStorageExport("isRestaurant")) {
        this.$router.push(`/${this.$route.params.web_id}/order-item`);
      } else {
        this.$router.push(`/order-item`);
      }
    },
  },
  computed: {
    filteredData() {
      if (this.search) {
        return this.orders.filter((item) => {
          return item.user.name
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      } else {
        return this.orders;
      }
    },
    ordersToDisplay() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredData.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
  },
};
</script>
