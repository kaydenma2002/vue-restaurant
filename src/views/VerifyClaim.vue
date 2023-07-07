<template>
  <div class="container mx-auto mt-5 min-h-screen">
    <div class="text-lg text-center">
      Please let us know who you are by verifying your document and identity
    </div>
    <form @submit.prevent="VerifyClaim($route.params.web_id)" class="">
      <div class="relative z-0 w-full mb-6 group">
        <input
          v-model="email"
          type="email"
          name="floating_email"
          id="floating_email"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
          placeholder=" "
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Email address</label
        >
        <div v-for="error of v$.email.$errors" :key="error.$uid">
          {{ error.$message }}
        </div>
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          v-model="name"
          type="text"
          name="floating_password"
          id="floating_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
          placeholder=" "
        />
        <label
          for="floating_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Name</label
        >
        <div v-for="error of v$.name.$errors" :key="error.$uid">
          {{ error.$message }}
        </div>
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          v-model="address"
          type="text"
          name="repeat_password"
          id="floating_repeat_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
          placeholder=" "
        />
        <label
          for="floating_repeat_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Address</label
        >
        <div v-for="error of v$.address.$errors" :key="error.$uid">
          {{ error.$message }}
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="city"
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
          />
          <label
            for="floating_first_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >City</label
          >
          <div v-for="error of v$.city.$errors" :key="error.$uid">
            {{ error.$message }}
          </div>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="state"
            type="text"
            name="floating_last_name"
            id="floating_last_name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
          />
          <label
            for="floating_last_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >State</label
          >
          <div v-for="error of v$.state.$errors" :key="error.$uid">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="zip_code"
            type="tel"
            name="floating_phone"
            id="floating_phone"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
          />
          <label
            for="floating_phone"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Zip code</label
          >
          <div v-for="error of v$.zip_code.$errors" :key="error.$uid">
            {{ error.$message }}
          </div>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="phone"
            type="text"
            name="floating_company"
            id="floating_company"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
          />
          <label
            for="floating_company"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Phone number</label
          >
          <div v-for="error of v$.phone.$errors" :key="error.$uid">
            {{ error.$message }}
          </div>
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
            >Upload SS4</label
          >
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="ss4_input"
            ref="ss4"
            type="file"
          />
          <p
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="food_license_input"
            >Upload food license</label
          >
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            ref="food_license"
            type="file"
          />
          <p
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>
      </div>
      <button
        :disabled="loading"
        type="submit"
        class="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { HTTP, HTTPS } from "../axios/http-axios";
import { useVuelidate } from "@vuelidate/core";
import { required, email, numeric } from "@vuelidate/validators";
import dbx from "../dropbox/dropbox";
export default {
  created() {
    HTTP.post('restaurant/find',{web_id: this.$route.params.web_id}).then(res =>{
        this.web_id = res.data.web_id
    })
   
  },
  
  data() {
    return {
      v$: useVuelidate(),
      loading: false,
      email: null,
      name: null,
      zip_code: null,
      phone: null,
      state: null,
      address: null,
      ss4: null,
      food_license: null,
      city: null,
      web_id:null,
      time_stamp: Date.now()
    };
  },
  methods: {
    async VerifyClaim(web_id) {
      const result = await this.v$.$validate();

      if (!result) {
        return;
      }

      this.loading = true;

      const ss4 = this.$refs.ss4.files[0];
      const food_license = this.$refs.food_license.files[0];

      if (!ss4 || !food_license) {
        this.loading = false;
        Swal.fire("Error", "Two files must not be empty", "error");
      } else {
        try {
          const ss4_upload = dbx.filesUpload({
            path:   `/kayden/${this.web_id}/ss4/`+ this.time_stamp + '_' + ss4.name,
            contents: ss4,
          });

          const food_license_upload = dbx.filesUpload({
            path:   `/kayden/${this.web_id}/food_license/`+ this.time_stamp + '_' + food_license.name,
            contents: food_license,
          });
          await Promise.all([ss4_upload, food_license_upload]);

          HTTPS.post("create/claim", {
            web_id: this.$route.params.web_id,
            ss4: this.time_stamp + '_' + ss4.name,
            food_license: this.time_stamp + '_' + food_license.name,
            address: this.address,
            city: this.city,
            state: this.state,
            zip_code: this.zip_code,
            phone: this.phone,
            email: this.email,
            name: this.name,
          })
            .then((res) => {
              console.log(res);
              this.loading = true;
              Swal.fire(
                "Success",
                "File uploaded successfully",
                "success"
              ).then((res) => {
                this.$router.push(`/${this.$route.params.web_id}`);
              });
            })
            .catch((error) => {
              this.loading = false;
              Swal.fire("Error", "Failed to upload file", "error");
              console.error("Error uploading file:", error);
            })
            .finally(() => {
              this.loading = false;
            });
        } catch (error) {
          Swal.fire("Error", "Failed to upload file", "error");
          console.error("Error uploading file:", error);
          this.loading = false;
        }
      }
    },
  },
  validations() {
    return {
      name: { required }, // Matches this.firstName
      address: { required }, // Matches this.lastName
      city: { required },
      state: { required },
      zip_code: { required, numeric },
      phone: { required, numeric },
      email: { required, email }, // Matches this.contact.email
    };
  },
};
</script>
