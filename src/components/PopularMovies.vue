<template>
  <div>
    <h2
      class="pt-4 font-semibold uppercase text-lg tracking-wider text-orange-500"
    >
      popular fılms
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      <MovieItem :key="movie.id" v-for="movie in movies" :movie="movie" />
    </div>
  </div>
</template>

<script>
import MovieItem from "./items/MovieItem.vue";
export default {
  components: {
    MovieItem,
  },
  name: "PopularMovies",

  data: function () {
    return {
      movies: [],
    };
  },
  async mounted() {
    try {
      const response = await this.$http.get("/movie/popular");
      this.movies = response.data.results;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>
