<script>


</script>
<template>

  <div class="container mx-auto ">
    <center>
      <img
        class="h-auto w-5/6"
        src="https://images.squarespace-cdn.com/content/v1/5c51cb9e12b13f88415552be/1557423196571-2JJ54Z42KGHSG4LLDWSK/The-Lonely-Broccoli-Restaurant-3-.jpg?format=2500w"
        alt="image description"
      />
    </center>
    <div class="text-center mt-5 box-border h-46 w-full p-4 border-4 ...">
      <h1
        class="
          mb-4
          text-3xl
          font-extrabold
          leading-none
          tracking-tight
          text-gray-900
          sm:text-3xl
          md:text-4xl
          lg:text-4xl
          dark:text-white
          text-ellipsis
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
          text-slate-400
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
          text-slate-400
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