<template>
            <div class="chat-box overflow-auto flex flex-col chat-popup z-10 h-96 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-80"
                v-if="isOpen" ref="chatBox">
                <div class="">
                    <input class="fixed top-0" type="text" v-model="username" />
                    <li class="" v-for="message in messages" :key="message">
                        <div>{{ message }}</div>
                        <div class="">{{ message }}</div>
                    </li>
                </div>
                <div class="chat-input mt-auto items-center flex">
                    <input v-model="message" class="w-full" type="text" placeholder="Send your message" ref="chatInput" />
                    <form @submit.prevent="submit">
                        <button type="submit">
                            <font-awesome-icon icon="fa-solid fa-paper-plane" />
                        </button>
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
            user: {
                id: 1
            }
        };
    },
    mounted() {
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

            this.channel = this.echo.private('user.' + this.user.id);

        this.channel.listen('Message', (data) => {
            this.messages.push(data.user.message);
            console.log(data)
        });
    },
    methods: {
        scrollToBottom() {
            const container = this.$el.querySelector('.chat-box');
            container.scrollTop = container.scrollHeight;
        },
        togglePopup() {
            this.isOpen = !this.isOpen;
        },
        async submit() {
            HTTPS.post('/messages', { message: this.message });
            this.message = '';

            this.$nextTick(() => {
                const chatBox = this.$refs.chatBox;
                chatBox.scrollTo({
                    top: chatBox.scrollHeight,
                    behavior: 'smooth'
                });
                this.$refs.chatInput.focus();
            });

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