<template>

    <div class="overflow-auto flex flex-col chat-popup z-10 h-96  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-80"
        v-if="isOpen">
        <div class="">
            <input type="text" v-model="username" />
            <li class="" v-for="message in messages" :key="message">
                <div>{{ message.username }}</div>
                <div class="">{{ message.message }}</div>
            </li>
        </div>
        <div class="flex chat-input mt-auto items-center">
            <input v-model="message" class="w-full  " type="text" placeholder="Send your message" />
            <form @submit.prevent="submit">
                <button type="submit" class="">
                    <font-awesome-icon icon="fa-solid fa-paper-plane" />
                </button>
            </form>
        </div>


    </div>
    <div class="chat-icon" @click="togglePopup">
        <button>
            <font-awesome-icon class="fa-2xl" icon="fa-solid fa-comment " />
        </button>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                isOpen: false,
                messages: [],
                message: "",
                username: ""
            };
        },
        mounted() {
            var pusher = new Pusher('80e26ff66717be8fd4cf', {
                cluster: 'mt1'
            });

            var channel = pusher.subscribe('chat');
            channel.bind('message', (data) => {
                this.messages.push(data)
                console.log(this.messages)
            });

        },
        methods: {
            togglePopup() {
                this.isOpen = !this.isOpen;
            },
            async submit() {
                await fetch('http://localhost:8000/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: this.username,
                        message: this.message
                    })
                })
                this.message = ''

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