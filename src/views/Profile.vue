<template >
  <div class="container bg-white mx-auto px-40 py-56">
    <form @submit.prevent="updateProfile()">
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Email</label
        >
        <input
          type="email"
          id="email"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
          :placeholder="this.email"
          disabled
        />
      </div>
      <div class="grid grid-cols-1 gap-4">
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name</label
          >
          <input
            type="text"
            id="name"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            disabled
            :placeholder="this.name"
          />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="mb-6">
          <label
            for="old_password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Old password</label
          >

          <input
            type="password"
            v-model="old_password"
            id="old_password"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
          />
          <span v-if="v$.old_password.$error">
            {{ v$.old_password.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-6">
          <label
            for="new_password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >New password</label
          >
          <input
            type="password"
            v-model="new_password"
            id="new_password"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
          />
          <span v-if="v$.new_password.$error">
            {{ v$.new_password.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-6">
          <label
            for="confirm_password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >New Password confirm</label
          >
          <input
            type="password"
            id="confirm_password"
            v-model="confirm_password"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
          />
          <span v-if="v$.confirm_password.$error">
            {{ v$.confirm_password.$errors[0].$message }}
          </span>
        </div>
      </div>
      <button
        type="submit"
        :disabled="submitting"
        class="
          text-white
          bg-blue-700
          hover:bg-blue-800
          focus:ring-4 focus:outline-none focus:ring-blue-300
          font-medium
          rounded-lg
          text-sm
          w-full
          sm:w-auto
          px-5
          py-2.5
          text-center
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        "
      >
        {{ submitting ? "Updating..." : "Update" }}
      </button>
    </form>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import useValidate from "@vuelidate/core";
import {
  required,
  between,
  email,
  numeric,
  minLength,
} from "@vuelidate/validators";
import { HTTPS } from "../axios/http-axios";
export default {
  data() {
    return {
      v$: useValidate(),
      email: "",
      name: "",
      old_password: "",
      new_password: "",
      confirm_password: "",
    };
  },
  validations() {
    return {
      name: { required },
      email: { required, minLengthValue: minLength(10), email },
      old_password: { required, minLengthValue: minLength(8) },
      confirm_password: { required, minLengthValue: minLength(8) },
      new_password: { required, minLengthValue: minLength(8) },
    };
  },
  created() {
    HTTPS.get("/user").then((res) => {
      this.email = res.data.email;
      this.name = res.data.name;
    });
  },
  methods: {
    async updateProfile() {
      this.submitting = true;
      try {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.v$.$validate();
            if (!this.v$.$error) {
              HTTPS.post("/update/user", {
                old_password: this.old_password,
                new_password: this.new_password,
                confirm_password: this.confirm_password,
              })
                .then((res) => {
                  if (res.status !== 200) {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: res.data.message,
                    });
                  } else {
                    Swal.fire(
                      "Well done!",
                      "Your password has been updated.",
                      "success"
                    );
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log(this.v$.$errors);
            }
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>