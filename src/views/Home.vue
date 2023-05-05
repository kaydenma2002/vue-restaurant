<script></script>
<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-2 gap 4">
      <div class="">
        <p style="font-weight: 600" class="text-7xl">Re-claim Your</p>
        <br />
        <p style="font-weight: 600" class="text-7xl">Online Order.</p>
        
        <div class="mt-10 mb-10 text-2xl text-slate-400 pr-11">
          EHL.AI&#39;s online ordering platform empowers thousands of restaurant
          owners to regain control of their online ordering process. EHL.AI
          charges a small platform fee, ensuring that restaurant owners keep
          more profits.
        </div>
        <div>
          <button
            @click.prevent="RegisterforRestaurant()"
            class="bg-black px-4 py-4 rounded-lg text-white hover:bg-black text-sm shadow-lg shadow-black/50 mb-10"
          >
            Re-claim your business
          </button>
        </div>
      </div>

      <div
        id="indicators-carousel"
        class="relative w-full"
        data-carousel="static"
      >
        <!-- Carousel wrapper -->
        <div class="relative h-96 w-auto overflow-hidden rounded-lg">
          <!-- Item 1 -->
          <div class="carousel-item active">
            <img src="/src/img/home/com_tam_1.jpg" alt="..." />
          </div>
          <!-- Item 2 -->
          <div class="carousel-item">
            <img src="/src/img/home/com_tam_2.jpg" alt="..." />
          </div>
          <!-- Item 3 -->
          <div class="carousel-item">
            <img src="/src/img/home/com-t-m-su-n-non-nu-ng_1.jpg" alt="..." />
          </div>
          <!-- Item 4 -->
          <div class="carousel-item">
            <img src="/src/img/home/com-t-m-su-n-non-nu-ng_2.jpg" alt="..." />
          </div>
          <!-- Item 5 -->
          <div class="carousel-item">
            <img src="/src/img/home/Cơm-Tấm_1.jfif" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="/src/img/home/Cơm-Tấm_2.jpg" alt="..." />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const items = document.querySelectorAll(".carousel-item");
    let currentItem = 0;

    // Function to show the next item
    function showNextItem() {
      // Hide the current item
      items[currentItem].classList.remove("active");
      // Move to the next item
      currentItem = (currentItem + 1) % items.length;
      // Show the next item
      items[currentItem].classList.add("active");
    }

    // Start the auto-slide
    setInterval(showNextItem, 2500); // change 5000 to the desired interval in milliseconds
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
.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-item.active {
  opacity: 1;
}
#indicators-carousel {
  width: 100%; /* set the width of the carousel */
}

#indicators-carousel img {
  width: 100%; /* set the width of the images */
  height: 100%; /* set the height of the images */
  object-fit: cover; /* scale the images to cover the entire carousel wrapper */
}
</style>
