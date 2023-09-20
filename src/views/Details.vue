<template>
  <div class="flex flex-col">
    <div class="container mx-auto flex mt-20 border-b border-white">
      <img :src="posterPath" alt="" class="w-64" />
      <div class="ml-24">
        <h1 class="text-4xl font-semibold">{{ this.movie.title }}</h1>
        <span>
          <i class="fas fa-star text-orange-500"></i>
          {{ movie.vote_average | roundToOneDecimal }} |
          {{ this.movie.release_date }}
        </span>
        <div class="mt-3">
          <strong>Genres:</strong>
          <ul>
            <li v-for="genre in movie.genres" :key="genre.id">
              {{ genre.name }}
            </li>
          </ul>
        </div>
        <p class="mt-5">
          {{ this.movie.overview }}
        </p>
      </div>
    </div>
    <Cast />
    <Images />
  </div>
</template>

<script>
import Cast from "@/components/Cast.vue";
import Images from "@/components/Images.vue";
export default {
  components: {
    Cast,
    Images,
  },
  data() {
    return {
      movie: {
        genres: [],
      },
    };
  },
  mounted() {
    this.fetchMovie(this.$route.params.id);
  },

  filters: {
    roundToOneDecimal(value) {
      return parseFloat(value).toFixed(1);
    },
  },

  methods: {
    async fetchMovie(movieId) {
      const response = await this.$http.get(
        "/movie/" + movieId + "?append_to_response=credits,videos,images"
      );
      this.movie = response.data;
    },
  },
  computed: {
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    },
  },
};
</script>
