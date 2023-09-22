<template>
  <div class="container flex flex-col gap-3x mx-auto px-3">
    <div class="flex justify-center items-center">
      <Searchbar />
    </div>
    <PopularMovies />
  </div>
</template>

<script>
import PopularMovies from "@/components/PopularMovies.vue";
import Searchbar from "@/components/Searchbar.vue";

export default {
  name: "Home",
  components: {
    PopularMovies,
    Searchbar,
  },
};
</script>
