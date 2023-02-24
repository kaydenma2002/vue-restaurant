<template>
    <div class="max-w-2xl border rounded chat-box overflow-auto flex flex-col chat-popup z-10  max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
        v-if="isOpen">
        <div class="w-full ">
            <div class="sticky top-0 bg-white z-40">
                <div class="relative flex items-center p-3 border-b border-gray-300">
                    <img class="object-cover w-10 h-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                    <span class="block ml-2 font-bold text-gray-600">Chat bot</span>
                    <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                    </span>
                </div>
            </div>
            <div class=" w-full h-96 p-6 overflow-y-auto " ref="chatContainer">
                <ul v-for="(item, index) in sent" class="space-y-2" ref="scrollToMe">

                    <li class="flex justify-end">
                        <div class=" max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                            <span class="block">{{ item }}</span>
                        </div>
                    </li>
                    <li class="flex justify-start">
                        <div class=" max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                            <span class="block">{{ reply[index] }}</span>
                        </div>
                    </li>

                </ul>

            </div>
            <form class="sticky bottom-0  z-10 bg-white" @submit.prevent="submit">
                <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">

                    <input type="text" placeholder="Message"
                        class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                        name="message" v-model="message" required />
                    <button type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </button>
                    <div v-if="loading" role="status">
                        <svg aria-hidden="true"
                            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div v-else>
                        <button type="submit">
                            <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>

    </div>
    <div class="chat-icon " @click="togglePopup">
        <button>
            <font-awesome-icon class="fa-2xl" icon="fa-solid fa-comment " />
        </button>
    </div>
</template>

<script>
import Echo from "laravel-echo";
import { HTTPS } from "../axios/http-axios"
export default {
    data() {
        return {
            loading: false,
            isOpen: false,
            sent: [],
            reply: [],
            message: "",
            echo: null,
            channel: null,
            user: ""
        };
    },
    updated() {
        this.$nextTick(() => {
            this.scrollToBottom();
        });
    },
    mounted() {
        HTTPS.get('/user/chat').then(res => {
            for (var i = 0; i < res.data.length; i++) {
                this.sent.push(res.data[i].message)
                this.reply.push(res.data[i].reply)
            }
        })
        HTTPS.get('/user').then(res => {
            this.user = res.data.id
            this.echo = new Echo({
                broadcaster: 'pusher',
                key: "80e26ff66717be8fd4cf",
                cluster: "mt1",
                encrypted: true,
                authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
                auth: {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                    }
                }
            }),

                this.channel = this.echo.private('user.' + this.user);
            this.channel.listen('Message', (data) => {
                this.reply.push(data.chat.reply)
            });
        })


    },
    methods: {
        togglePopup() {
            this.isOpen = !this.isOpen;
        }, scrollToBottom() {
            const chatContainer = this.$refs.chatContainer;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
        async submit() {
            this.loading = true
            this.sent.push(this.message)
            this.$nextTick(() => {
                this.scrollToBottom();
            });

            HTTPS.post('/messages', { message: this.message }).then(res => {
                this.loading = false
            });
            this.message = '';
        },

    },
};
</script>

<style scoped>
.chat-popup {
    position: fixed;
    bottom: 25%;
    right: 20px;

    /* Add any other styling you need for the chat popup */
}

.chat-icon {
    position: fixed;

    bottom: 20%;
    right: 20px;
    /* Add any other styling you need for the chat icon */
}
</style>