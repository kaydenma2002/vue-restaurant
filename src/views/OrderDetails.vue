<template>
    <div style="min-height:100vh">
  <div class="text-center text-lg">Order Detail</div>
  <div class="grid grid-cols-6 gap-4 container mx-auto">
    <div
      v-for="(item, index) in order_items"
      :key="item.id"
      class="max-w-sm w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        class="rounded-t-lg"
        v-bind:src="`/src/img/menu/${item.item.image}`"
        alt=""
      />

      <div class="p-5">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ index + 1 }}
        </h5>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ item.item.title }} ({{ item.item.category }})
        </p>
        <p class="mb-3 text-xl text-gray-700 dark:text-gray-400">
          ${{ item.item.price }}
        </p>
      </div>
    </div>
  </div>

  <div class="ml-auto text-xl text-right">
    <div style="margin-right: 2rem">Total: ${{ total }}</div>
  </div>
</div>
</template>
<script>
import { HTTP, HTTPS } from "../axios/http-axios";
import { localStorageExport } from "../localStorage/local-storage";
export default {
  name: "OrderDetails",
  created() {
    console.log(localStorageExport("order_id"));
    HTTPS.get("order-item", {
      params: { id: localStorageExport("order_id") },
    }).then((res) => {
      console.log(res);
      this.order_items = res.data;
    });
    HTTPS.get("orderById", {
      params: { id: localStorageExport("order_id") },
    }).then((res) => {
      this.total = res.data.total;
      this.data = res.data.created_at;
      this.note = res.data.note;
    });
  },
  data() {
    return {
      order_items: "",
      order_id: "",
      note: "",
      total: "",
      date: "",
    };
  },
};
</script>
