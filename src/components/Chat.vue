<template>
  <div
    class="h-2/3 md:w-1/2 lg:w-1/2 border rounded chat-box flex flex-col justify-between chat-popup z-10 bg-white border border-gray rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    v-if="isOpen"
  >
    <div class="grid grid-cols-5 h-full " >
      <div class="overflow-y-auto  col-span-2">
        <ul class="" >
          <li
          v-for="user in users" :key="user.id"
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
      <div
        class="flex flex-col overflow-y-auto relative w-full col-span-3 border-solid border-l-2 border-gray"
        ref="chatContainer"
      >
        <div class="py-4 sticky bg-slate-50 top-0 z-10">
          {{ currentRecipient }}
          <hr />
        </div>
        <div class=" flex-1">
          <ul v-for="(item, index) in sent" :key="index" class="space-y-2">
            <li
              v-if="sender == item.sender_id || sender == item.sender"
              class="flex justify-end"
            >
              <div
                class="max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow"
              >
                <span v-if="item.message.length < 1000" class="block">{{
                  item.message
                }}</span>
                <audio
                  v-else
                  :src="`data:audio/webm;base64,${item.message}`"
                  controls
                ></audio>
              </div>
            </li>
            <li v-else class="flex justify-start">
              <div class="max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                <span v-if="item.message.length < 1000" class="block">{{
                  item.message
                }}</span>
                <audio
                  v-else
                  :src="`data:audio/webm;base64,${item.message}`"
                  controls
                ></audio>
              </div>
            </li>
          </ul>
        </div>
        <form
          class="sticky bottom-0 left-0 w-full bg-white"
          @submit.prevent="submit"
        >
          <div
            class="flex items-center justify-between w-full p-3 border-t border-gray"
          >
            <input
              type="text"
              placeholder="Message"
              class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
              
              v-model="message"
              
            />

            <div v-if="loading" role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black"
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
            <div class="flex" v-else>
              <button
                class="mx-4"
                type="button"
                @click="startRecording"
                v-if="!recording"
              >
                <font-awesome-icon :icon="['fas', 'microphone']" />
              </button>
              <button
                class="mx-4"
                type="button"
                @click="stopRecording"
                v-if="recording"
              >
                <font-awesome-icon :icon="['fas', 'microphone']" beat-fade />
              </button>

              <button type="submit">
                <svg
                  class="w-5 h-5 origin-center transform rotate-90"
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
      recording: false,
      mediaRecorder: null,
      chunks: [],
      opusEncoder: null,
      opusDecoder: null,
      voiceData: null,
      recognition: null,
      transcription: "",
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
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";
    this.recognition.onresult = this.handleResult;
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
          const isProduction = process.env.NODE_ENV === "production";

          const authEndpoint = isProduction
            ? "https://ehl.ai:8000/broadcasting/auth"
            : "https://127.0.0.1/broadcasting/auth";
          this.echo = new Echo({
            broadcaster: "pusher",
            key: "68572aaa73079990a7d7",
            cluster: "mt1",
            encrypted: true,
            authEndpoint: authEndpoint,
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
            if (data.message.length > 1000) {
              HTTPS.post("findVoice", {
                message: data.message.slice(0, -3),
              }).then((res) => {
                console.log(res.data[0]);

                this.sent.push(res.data[0]);
              });
            } else {
              this.sent.push(data);
            }
          });

          this.channel2 = this.echo.private(
            "private-chat." + this.newRecipient + "." + this.sender
          );
          this.channel2.listen("PrivateChatEvent", (data) => {
            if (data.message.length > 1000) {
              HTTPS.post("findVoice", {
                message: data.message.slice(0, -3),
              }).then((res) => {
                console.log(res.data[0]);
                this.sent.push(res.data[0]);
              });
            } else {
              this.sent.push(data);
            }
          });
        } else {
          const isProduction = process.env.NODE_ENV === "production";
          const authEndpoint = isProduction
            ? "https://ehl.ai:8000/broadcasting/auth"
            : "https://127.0.0.1/broadcasting/auth";
          this.echo = new Echo({
            broadcaster: "pusher",
            key: "68572aaa73079990a7d7",
            cluster: "mt1",
            encrypted: true,
            authEndpoint: authEndpoint,
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
            if (data.message.length > 1000) {
              HTTPS.post("findVoice", {
                message: data.message.slice(0, -3),
              }).then((res) => {
                console.log(res.data[0]);
                this.sent.push(res.data[0]);
              });
            } else {
              this.sent.push(data);
            }
          });

          this.channel2 = this.echo.private(
            "private-chat." + this.newRecipient + "." + this.sender
          );
          this.channel2.listen("PrivateChatEvent", (data) => {
            if (data.message.length > 1000) {
              HTTPS.post("findVoice", {
                message: data.message.slice(0, -3),
              }).then((res) => {
                console.log(res.data[0]);

                this.sent.push(res.data[0]);
              });
            } else {
              this.sent.push(data);
            }
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
      HTTPS.post("/private-messages", {
        message: this.message,
        recipient_id: this.newRecipient,
        type: "0",
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
    setNewValue(data){
      this.message = data
      console.log(data)
    },
     startRecording() {
        this.recording = true
        this.transcription = "";
        this.recognition.start();
        
    },
    stopRecording() {
      this.recognition.stop();
      this.recording = false
      
      
         
    },
     handleResult(event) {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.transcription += event.results[i][0].transcript;
          this.setNewValue(this.transcription)
          
        } else {
          interimTranscript += event.results[i][0].transcript;
          this.setNewValue(interimTranscript)
        }
      }
       
       
       

    },
    async sendMessage(voiceData) {
      try {
        HTTPS.post("/private-messages", {
          message: voiceData,
          recipient_id: this.newRecipient,
          type: "1",
        }).then((res) => {
          console.log(res);
          this.voiceData = voiceData;
          this.loading = false;
        });

        this.message = "";

        this.loading = true;

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  
  
};
</script>

<style scoped>
.chat-popup {
  position: fixed;
  bottom: 15%;
  left: 20px;

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
  left: 20px;
  /* Add any other styling you need for the chat icon */
}
</style>
