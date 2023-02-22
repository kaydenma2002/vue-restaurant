<template>
    <div class="max-w-2xl border rounded chat-box overflow-auto flex flex-col chat-popup z-10  max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
        v-if="isOpen" ref="chatBox">
        <div class="w-full " >
            <div class="sticky top-0 bg-white z-40">
                <div class="relative flex items-center p-3 border-b border-gray-300">
                    <img class="object-cover w-10 h-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                    <span class="block ml-2 font-bold text-gray-600">Chat bot</span>
                    <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                    </span>
                </div>
            </div>
            <div class=" w-full h-96 p-6 overflow-y-auto " ref="scrollToMe">

                <ul v-for="message in messages" class="space-y-2">

                    <li class="flex justify-end">
                        <div class=" max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                            <span class="block">{{ message.message }}</span>
                        </div>
                    </li>
                    <li class="flex justify-start">
                        <div class=" max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                            <span class="block">{{ message.reply }}</span>
                        </div>
                    </li>

                </ul>

            </div>
            <form class="sticky bottom-0  z-10 bg-white" @submit.prevent="submit">
                <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>

                    <input type="text" placeholder="Message"
                        class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                        name="message" v-model="message" required />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </button>
                    <button type="submit">
                        <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
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
            isOpen: false,
            messages: [],
            message: "",
            echo: null,
            channel: null,
            user: 1
        };
    },
    mounted() {
        this.scrollToElement();
        HTTPS.get('/user/chat').then(res => {
            for (var i = 0; i < res.data.length; i++) {
                this.messages.push(res.data[i])
                console.log(this.messages)
            }
        })
        HTTPS.get('/user').then(res => {
            this.user = res.data.id
        })

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
            this.messages.push(data.chat);

        });
    },
    methods: {
        scrollToElement() {
            const el = this.$refs.scrollToMe;

            if (el) {
                // Use el.scrollIntoView() to instantly scroll to the element
                el.scrollIntoView({ behavior: 'smooth' });
            }
        },
        togglePopup() {
            this.isOpen = !this.isOpen;
        },
        async submit() {
            HTTPS.post('/messages', { message: this.message }).then(res => {

            });
            this.message = '';



        }
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