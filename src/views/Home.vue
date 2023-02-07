<script>
</script>
<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-2 gap 4 mt-20">
      <div class="">
        <p style="font-weight: 600" class="text-7xl">Claim Your</p>
        <br />
        <p style="font-weight: 600" class="text-7xl">Restaurant</p>
        <br />
        <p style="font-weight: 600" class="text-7xl text-indigo-500">Online.</p>
        <div class="mt-10 mb-10 text-2xl text-slate-400 pr-11">
          Thousands of restaurant owners use the SKIPLI platform to take back
          control, create stunning websites, drive direct sales, save money on
          fees, and manage their online presence & marketing all-in-one. 0%
          Commission Fee
        </div>
        <div>
          <button
            @click.prevent="RegisterforRestaurant()"
            class="
              bg-indigo-600
              px-4
              py-4
              rounded-lg
              text-white
              hover:bg-indigo-500
              text-sm
              shadow-lg shadow-indigo-500/50
              mb-10
            "
          >
            Claim your own restaurant
          </button>
        </div>
      </div>

      <div>
        <img
          src="https://skipli.s3.amazonaws.com/Skipli+Website/Home+Page/Landing+Page+Intro+Image.jpg"
          alt=""
        />
      </div>
    </div>

    <div class="text-center mt-20 box-border h-46 w-full p-4 border-4 ...">
      <h1
        class="
          mb-4
          text-3xl
          font-extrabold
          leading-none
          tracking-tight
          sm:text-3xl
          md:text-4xl
          lg:text-4xl
          dark:text-white
          text-indigo-500
        "
      >
        Since opening in 2004, We have been one of New York's leading
        restaurants, applauded for both its gracious service and casual take on
        find dining
      </h1>
    </div>
    <div>
      <video autoplay src="../pexels-cottonbro-6054010.mp4" @ended="handleVideoEnd" />
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    RegisterforRestaurant() {
      this.$router.push("/get-started");
    },
    handleVideoEnd() {
      console.log("Video ended");
    },
   
  },
};
</script>
<style scoped>
.overlay {
  text-align: center;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.3s ease;
  background-color: red;
}
.box-content:hover .overlay {
  opacity: 1;
}
</style>