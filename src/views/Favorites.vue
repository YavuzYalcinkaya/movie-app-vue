<template>
  <div>
    <h2 class="text-2xl font-semibold my-4 text-center lg:text-start">
      Favourite Movies
    </h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <router-link
        :to="'/movie/' + favorite.id"
        v-for="favorite in favorites"
        :key="favorite.id"
        class="lg:border lg:border-gray-400 cursor-pointer p-4 rounded-lg flex flex-col gap-2 justify-center items-center"
      >
        <img
          :src="'https://image.tmdb.org/t/p/w500' + favorite.poster_path"
          alt=""
          width="300"
          class="md:w-[768px] lg:w-[900px] xl:w-[250px] rounded-xl mb-2"
        />

        <h3 class="text-2xl font-semibold text-center">
          {{ favorite.title }}
        </h3>
        <p class="text-orange-500">Rating: {{ favorite.vote_average }}</p>
        <p class="">Release Date: {{ favorite.release_date }}</p>

        <button
          @click.stop="removeFromFavorites(favorite.id)"
          class="mt-2 bg-orange-500 text-white py-1 px-3 rounded"
        >
          Remove from Favorites
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    favorites() {
      return this.$store.getters.favorites;
    },
  },
  methods: {
    removeFromFavorites(movieId) {
      this.$store.dispatch("removeFromFavorites", movieId);
    },
  },
};
</script>
