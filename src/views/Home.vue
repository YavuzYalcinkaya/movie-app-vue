<template>
  <div class="container mx-auto px-3">
    <PopularMovies />
  </div>
</template>

<script>
import PopularMovies from "../components/PopularMovies.vue";

export default {
  name: "Home",
  components: {
    PopularMovies,
  },
};
</script>

<style scoped></style>
