<script>


</script>
<template>

  <div class="container mx-auto ">
    <div class="grid grid-cols-2 gap 4 mt-20">
      <div class="">
        <p style="font-weight:600" class="text-7xl">Claim Your</p>
        <br>
        <p style="font-weight:600" class="text-7xl">Restaurant</p>
        <br>
        <p style="font-weight:600" class="text-7xl text-indigo-500	">Online.</p>
        <div class="mt-10 mb-10 text-2xl text-slate-400 pr-11">Thousands of restaurant owners use the SKIPLI platform to take back control, create stunning websites, drive direct sales, save money on fees, and manage their online presence & marketing all-in-one. 0% Commission Fee</div>
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
            shadow-lg
            shadow-indigo-500/50
            mb-10
          "
        >
          Claim your own restaurant
        </button>
        </div>
        
      </div>
      
      <div><img src="https://skipli.s3.amazonaws.com/Skipli+Website/Home+Page/Landing+Page+Intro+Image.jpg" alt=""></div>
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
    <div class="row menu">
      <div
        class="
          mt-5
          underline underline-offset-3
          text-center
          mb-4
          text-4xl
          font-extrabold
          leading-none
          tracking-tight
          
          md:text-4xl
          lg:text-5xl
          animate-bounce
        "
      >
        Our Menu
      </div>
      <div
        class="
          xl:w-auto
          sm:w-3/4
          lg:w-auto
          md:w-3/4
          w-3/4
          m-auto
          h-auto
          mt-5
          grid grid-cols-2
          xl:grid-cols-6
          lg:grid-cols-4
          md:grid-cols-2
          sm:grid-cols-2
          gap-4
          mb-10
        "
      >
        <div v-for="n in 12" :key="n" class="box-content border-4 ...">
          <div class="overlay">
            <img
              class="hover:scale-110 transition-all duration-700 cursor-pointer"
              src="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
              alt="image description"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row contact-us">
      <div
        class="
          mt-5
          underline underline-offset-3
          text-center
          mb-4
          text-4xl
          font-extrabold
          leading-none
          tracking-tight
          
          md:text-4xl
          lg:text-5xl
          animate-bounce
        "
      >
        Contact Us
      </div>
      <img
        class="h-auto w-screen"
        src="https://images.squarespace-cdn.com/content/v1/5a626e77d7bdce030797264e/1529366828831-CHTDV7RQ8X9JH2OR895I/Papis.Food.ChickenBarbacoa.April2015.TJG_6742.HR.1500px.jpg?format=2500w"
        alt=""
      />
    </div>
  </div>
  
</template>
<script>
export default {
  methods : {
    RegisterforRestaurant(){
      this.$router.push("/get-started")
    }
  }
}
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