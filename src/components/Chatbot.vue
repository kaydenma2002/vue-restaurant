<template>
    <div class="relative h-2/3 w-80 md:w-96 lg:w-96   border rounded chat-box overflow-auto flex flex-col chat-popup z-10    bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
        v-if="isOpen">
        <div class=" bg-white z-40">
            <div class=" flex items-center p-3 border-b border-gray-300">
                <img class="object-cover w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                <span class="block ml-2 font-bold text-gray-600">Chat bot</span>
                <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                </span>
            </div>
        </div>
        <div class=" w-full p-6 overflow-y-auto " ref="chatContainer">
            <ul v-for="(item, index) in sent" class="space-y-2" ref="scrollToMe">

                <li class="flex justify-end">
                    <div class=" max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                        <span class="block">{{ item }}</span>
                    </div>
                </li>
                <li v-if="sent[index].includes('reservation')">
                    <form @submit.prevent="submitReservation">
                        <VueDatePicker @open="datePickerFocus" placeholder="Date of reservation" v-model="date">
                        </VueDatePicker>
                        <div v-for="error of v$.date.$errors" :key="error">
                            <p>{{ error.$message }}</p>
                        </div>
                        <select id="table" v-model="table"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Number of table </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4"> >4 </option>
                        </select>
                        <div v-for="error of v$.table.$errors" :key="error">
                            <p>{{ error.$message }}</p>
                        </div>
                        <form @submit.prevent="verifyPhoneNumber">
                            <div class="relative">
                                <input type="number" v-model="phone" :disabled="verifyPhone"
                                    class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your mobile number">
                                <button v-if="!verifyPhone" type="submit"
                                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify</button>
                            </div>
                            <div v-for="error of v$.phone.$errors" :key="error">
                                <p>{{ error.$message }}</p>
                            </div>
                        </form>
                        <input v-if="verifyPhone" type="number" v-model="verify_code" id="helper-text"
                            aria-describedby="helper-text-explanation"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your verify code send to the number above">
                        <div v-for="error of v$.verify_code.$errors" :key="error">
                            <p>{{ error.$message }}</p>
                        </div>
                        <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll
                            never
                            share your details. Read our <a href="#"
                                class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.
                        </p>
                        <div v-if="verifyPhone" class="w-full text-right ">
                            <button type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                        </div>

                    </form>
                </li>
                <li v-else-if="sent[index].includes('contact')" class="flex justify-start">
                    Please contact us at 571.505.1131
                </li>
                <li v-else-if="sent[index].includes('order')">
                    <form @submit.prevent="submitRestaurant">
                        <div class="relative">
                            <input type="text" v-model="restaurant" :disabled="search_restaurant"
                                class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter restaurant">
                            <button type="submit"
                                class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                        <div v-if="search_restaurant" class="grid grid-cols-2 gap-4">
                            <div v-for="(item, index) in items" :key="index" class="box-content ...">
                                <div class="overlay">
                                    <FoodCardForChat :id="item.id" :name="item.name" :description="item.description"
                                        :price="item.price" :image="item.image" />
                                </div>
                            </div>
                        </div>
                    </form>
                </li>
                <li v-else class="flex justify-start">
                    <div class=" max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                        <span class="block">{{ reply[index] }}</span>
                    </div>
                </li>

            </ul>
        </div>
        <div class="mb-20">
            <div class="text-center w-full">
                What may I help you today ?
            </div>
            <div class="flex justify-between">
                <button type="button" @click="submitbyChoices('order')"
                    class="
                                                                                                                                                                                                                                                                                                        bg-indigo-600
                                                                                                                                                                                                                                                                                                        px-2
                                                                                                                                                                                                                                                                                                        py-2
                                                                                                                                                                                                                                                                                                        rounded-lg
                                                                                                                                                                                                                                                                                                        text-white
                                                                                                                                                                                                                                                                                                        hover:bg-indigo-500
                                                                                                                                                                                                                                                                                                        text-sm
                                                                                                                                                                                                                                                                                                        shadow-lg shadow-indigo-500/50
                        
                                                                                                                                                                                                                                                                                                    ">
                    Online Order
                </button>
                <button type="button" @click="submitbyChoices('contact')"
                    class="
                                                                                                                                    bg-indigo-600
                                                                                                                                    px-2
                                                                                                                                    py-2
                                                                                                                                    rounded-lg
                                                                                                                                    text-white
                                                                                                                                    hover:bg-indigo-500
                                                                                                                                    text-sm
                                                                                                                                    shadow-lg shadow-indigo-500/50

                                                                                                                                    ">
                    Contact Us
                </button>
                <button type="button" @click="submitbyChoices('reservation')"
                    class="bg-indigo-600 px-2 py-2 rounded-lg text-white hover:bg-indigo-500 text-sm shadow-lg shadow-indigo-500/50                                                             ">
                    Make a Reservation
                </button>
            </div>
        </div>
        <form class="absolute bottom-0 w-full  z-10 bg-white" @submit.prevent="submit">
            <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">

                <input type="text" placeholder="Message"
                    class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                    name="message" v-model="message" required />
                
                <div v-if="loading" role="status">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    <div class="chat-icon z-50" @click="togglePopup">
        <button>
            <font-awesome-icon class="fa-2xl" icon="fa-solid fa-robot" />
            <!-- <font-awesome-icon class="fa-2xl" icon="fa-solid fa-comment " /> -->
        </button>
    </div>
</template>

<script>
import FoodCardForChat from "../components/FoodCardForChat.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import useValidate from "@vuelidate/core";
import {
    required,
    between,
    email,
    numeric,
    minLength,
} from "@vuelidate/validators";
import '@vuepic/vue-datepicker/dist/main.css'

import Swal from 'sweetalert2'
import Echo from "laravel-echo";
import { HTTP, HTTPS } from "../axios/http-axios"
export default {
    components: { VueDatePicker, FoodCardForChat },
    data() {
        return {
            v$: useValidate(),
            loading: false,
            isOpen: false,
            sent: [],
            reply: [],
            message: "",
            echo: null,
            channel: null,
            user: "",
            phone: null,
            verify_code: null,
            table: null,
            date: null,
            verifyPhone: false,
            phone_error: null,
            search_restaurant: false,
            restaurant: null,
            items: [],
            restaurant: null
        };
    },
    validations() {
        return {
            phone: { required },
            date: { required },
            verify_code: { required },
            table: { required }
        }
    },
    updated() {
        this.$nextTick(() => {
            this.scrollToBottom();
        });
    },
    mounted() {
        
        HTTPS.get('/user').then(res => {
            this.user = res.data.id
            this.echo = new Echo({
                broadcaster: 'pusher',
                key: "68572aaa73079990a7d7",
                cluster: "mt1",
                encrypted: true,
                authEndpoint: 'https://127.0.0.1/broadcasting/auth',
                auth: {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                    }
                }
            }),
                this.channel = this.echo.private('user.' + this.user);
            this.channel.listen('Message', (data) => {
                this.reply.push(data.chat.reply)
                console.log(data)
            });
            console.log(this.channel)
        })


    },
    methods: {
        datePickerFocus() {
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
        verifyPhoneNumber() {
            this.v$.phone.$touch();
            if(!this.v$.phone.$invalid) {
                this.verifyPhone = true
                HTTP.post('/verify-mobile', {
                    phone: this.phone,
                    verify_code: this.verify_code
                }).then(res => {
                    console.log(res)
                })
            } else {
                this.phone_error = true
            }

        },
        submitRestaurant() {
            HTTP.get('/submit-restaurant', {
                params: { restaurant: this.restaurant }
            }).then(res => {
                this.search_restaurant = true
                for(var i = 0; i < res.data.item.length; i++) {
                    this.items.push(res.data.item[i])
                }
            }).catch((error => {
                console.log(error)
            }))

        },
        togglePopup() {
            this.isOpen = !this.isOpen;
        }, scrollToBottom() {
            const chatContainer = this.$refs.chatContainer;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
        async submitReservation() {
            Swal.fire({
                title: `please confirm your new reservation: ${this.table} tables at ${this.date}`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                denyButtonText: `Don't save`,
            }).then((result) => {

                if(result.isConfirmed) {
                    this.v$.$validate();
                    if(!this.v$.$error) {
                        HTTPS.post('/submit-reservation', {
                            phone: this.phone,
                            verify_code: this.verify_code,
                            table: this.table,
                            date: this.date
                        }).then((res) => {
                            if(res.data.success != false) {
                                this.verifyPhone = true
                                this.v$.$reset();
                                this.verifyPhone = !this.verifyPhone;
                                Swal.fire('Your reservation has been confirmed', '', 'success').then(
                                    this.phone = null,
                                    this.verify_code = null,
                                    this.table = null,
                                    this.date = null
                                )
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: res.data.message,
                                    text: 'Something went wrong!',
                                    footer: '<a href="">Why do I have this issue?</a>'
                                })
                            }
                        }).catch((error) => {
                            Swal.fire({
                                icon: 'error',
                                title: error,
                                text: 'Something went wrong!',
                                footer: '<a href="">Why do I have this issue?</a>'
                            })
                        })
                    }
                } else if(result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })

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
        async submitbyChoices(e) {
            this.message = e

            if(this.message === 'reservation') {
                this.phone = null
                this.verify_code = null
                this.table = null
                this.date = null
                this.verifyPhone = false
                this.phone_error = null
            } else if(this.message === 'order') {
                this.search_restaurant = false
                this.restaurant = null
                this.items = []
                this.restaurant = null
            }
            this.sent.push(this.message)
            
            if(this.sent.filter(item => item.includes('reservation')).length > 1) {
                this.sent.splice(this.sent.indexOf('reservation'), 1)
            } else if(this.sent.filter(item => item.includes('order')).length > 1) {
                this.sent.splice(this.sent.indexOf('order'), 1)
            }

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
    bottom: 15%;
    left: 20px;

    /* Add any other styling you need for the chat popup */
}

.h-106 {
    height: 30rem;
}

.w-112 {
    width: 32rem
}

.chat-icon {
    position: fixed;

    bottom: 10%;
    left: 20px;
    /* Add any other styling you need for the chat icon */
}
</style>