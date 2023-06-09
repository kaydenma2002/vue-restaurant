<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Order Details</h2>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="p-6">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center mb-6"
        >
          <img
            :src="item.item.image"
            alt="Product Image"
            class="w-20 h-20 mr-4"
          />
          <div>
            <h3 class="text-lg font-semibold">{{ item.item.title }}</h3>
            <p class="text-gray-500">Quantity: {{ item.quantity }}</p>
          </div>
        </div>
        <div class="mt-8">

          <div class="mt-4 text-right">
            <span class="text-gray-500">Date:</span>
            <span class="font-medium">{{ created_at }}</span>
          </div>
          
          <div class="mt-4 text-right">
            <span class="text-gray-500">Total Price:</span>
            <span class="font-semibold">${{ total }}</span>
          </div>
        </div>
      </div>
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
      this.items = res.data;
    });
    HTTPS.get("orderById", {
      params: {
        id: localStorageExport("order_id"),
        web_id: this.$route.params.web_id,
      },
    }).then((res) => {
      this.total = res.data.total;
      console.log(res);
      this.created_at = res.data.created_at;
      this.note = res.data.note;
    });
  },
  data() {
    return {
      items: "",
      order_id: "",
      note: "",
      total: "",
      date: "",
    };
  },
};
</script>
