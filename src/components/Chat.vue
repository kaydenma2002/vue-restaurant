<template>
  <div
    class="h-2/3 md:w-1/2 lg:w-1/2 border rounded chat-box flex flex-col chat-popup z-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    v-if="isOpen"
  >
    <div class="grid grid-cols-5 overflow-y-auto h-full" ref="chatContainer">
      <div class="overflow-y-auto col-span-2">
        <ul class="" v-for="user in users" :key="user.id">
          <li
            class="hover:bg-gray-100 hover:cursor-pointer py-3 sm:py-4"
            @click.prevent="loadMessage(user.id)"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                  {{ user.email }}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {{ user.name }}
                </p>
              </div>
              <div
                class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
              ></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="relative h-full w-full col-span-3  ">
        <div class="py-4 sticky bg-slate-50 top-0">
          {{ currentRecipient }}
          <hr />
        </div>
        <div class="mb-20 overflow-y-auto">
          <ul v-for="(item, index) in sent" :key="index" class="space-y-2">
            <li
              v-if="sender == item.sender_id || sender == item.sender"
              class="flex justify-end"
            >
              <div
                class="max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow"
              >
                <span class="block">{{ item.message }}</span>
              </div>
            </li>
            <li v-else class="flex justify-start">
              <div class="max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                <span class="block">{{ item.message }}</span>
              </div>
            </li>
          </ul>
        </div>
        <form
          class="absolute bottom-0 w-full  bg-white"
          @submit.prevent="submit"
        >
          <div
            class="flex items-center justify-between w-full p-3 border-t border-gray-300"
          >
            <input
              type="text"
              placeholder="Message"
              class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
              name="message"
              v-model="message"
              required
            />

            <div v-if="loading" role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              <button type="submit">
                <svg
                  class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="chat-icon z-50" @click="togglePopup">
    <button>
      <font-awesome-icon class="fa-2xl" icon="fa-solid fa-comment " />
    </button>
  </div>
</template>

<script>
import FoodCardForChat from "../components/FoodCardForChat.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import useValidate from "@vuelidate/core";
import {
  required,
  between,
  email,
  numeric,
  minLength,
} from "@vuelidate/validators";
import "@vuepic/vue-datepicker/dist/main.css";

import Swal from "sweetalert2";
import Echo from "laravel-echo";
import { HTTP, HTTPS } from "../axios/http-axios";
export default {
  components: { VueDatePicker, FoodCardForChat },
  data() {
    return {
      v$: useValidate(),
      loading: false,
      isOpen: false,
      users: [],
      sender: null,
      recipient: null,
      newRecipient: null,
      isNewRecipient: null,
      currentRecipient: null,
      sent: [],
      reply: [],
      messages: "",
      echo: null,
      channel: null,
    };
  },

  updated() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  mounted() {
    HTTPS.get("/user").then((res) => {
      this.sender = res.data.id;
      console.log(this.sender);
    });

    HTTPS.get("/users").then((res) => {
      this.users = res.data;
    });
  },
  methods: {
    togglePopup() {
      this.isOpen = !this.isOpen;
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },
    loadMessage(id) {
      this.sent = [];
      this.recipient = this.newRecipient;
      this.newRecipient = id;
      console.log(this.newRecipient);
      if (this.recipient != this.newRecipient) {
        if (this.channel1 && this.channel2) {
          this.channel1.unsubscribe();
          this.channel2.unsubscribe();
          this.echo = new Echo({
            broadcaster: "pusher",
            key: "68572aaa73079990a7d7",
            cluster: "mt1",
            encrypted: true,
            authEndpoint: "https://127.0.0.1/broadcasting/auth",
            auth: {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwtToken"),
              },
            },
          });
          this.channel1 = this.echo.private(
            "private-chat." + this.sender + "." + this.newRecipient
          );
          this.channel1.listen("PrivateChatEvent", (data) => {
            this.sent.push(data);
            console.log(data);
          });

          this.channel2 = this.echo.private(
            "private-chat." + this.newRecipient + "." + this.sender
          );
          this.channel2.listen("PrivateChatEvent", (data) => {
            this.sent.push(data);
            console.log(data);
          });
        } else {
          this.echo = new Echo({
            broadcaster: "pusher",
            key: "68572aaa73079990a7d7",
            cluster: "mt1",
            encrypted: true,
            authEndpoint: "https://127.0.0.1/broadcasting/auth",
            auth: {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwtToken"),
              },
            },
          });
          this.channel1 = this.echo.private(
            "private-chat." + this.sender + "." + this.newRecipient
          );
          this.channel1.listen("PrivateChatEvent", (data) => {
            this.sent.push(data);
            console.log(data);
          });

          this.channel2 = this.echo.private(
            "private-chat." + this.newRecipient + "." + this.sender
          );
          this.channel2.listen("PrivateChatEvent", (data) => {
            this.sent.push(data);
            console.log(data);
          });
        }
      }
      HTTPS.get("/recipient", { params: { id: id } }).then((data) => {
        this.currentRecipient = data.data.name;
      });
      HTTPS.get("private-chat", {
        params: { recipient_id: this.newRecipient, sender_id: this.sender },
      }).then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          this.sent.push(res.data[i]);
        }
      });
    },

    async submit() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      HTTPS.post("/private-messages", {
        message: this.message,
        recipient_id: this.newRecipient,
      }).then((res) => {
        console.log(res);

        this.loading = false;
      });

      this.message = "";

      this.loading = true;

      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
};
</script>

<style scoped>
.chat-popup {
  position: fixed;
  bottom: 15%;
  right: 20px;

  /* Add any other styling you need for the chat popup */
}

.h-106 {
  height: 30rem;
}

.w-112 {
  width: 32rem;
}

.chat-icon {
  position: fixed;

  bottom: 10%;
  right: 20px;
  /* Add any other styling you need for the chat icon */
}
</style>
