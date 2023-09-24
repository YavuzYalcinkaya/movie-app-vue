<template>
  <div>
    <h2 class="text-2xl font-semibold my-4 text-center lg:text-start">
      Favourite Movies
    </h2>
    <div
      v-if="favorites.length === 0"
      class="text-center text-orange-500 text-lg lg:text-4xl my-8 font-semibold"
    >
      There is No Favorite Film
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 md:m-0"
    >
      <div
        v-for="favorite in favorites"
        :key="favorite.id"
        class="border border-gray-400 cursor-pointer p-4 rounded-lg flex flex-col gap-2 justify-center items-center"
      >
        <router-link
          :to="'/movie/' + favorite.id"
          class="flex flex-col justify-center items-center"
        >
          <img
            :src="'https://image.tmdb.org/t/p/w500' + favorite.poster_path"
            alt=""
            width="500"
            class="md:w-[768px] lg:w-[900px] xl:w-[300px] rounded-xl mb-2"
          />

          <h3 class="text-xl font-semibold text-center max-h-[90px]">
            {{ favorite.title }}
          </h3>
          <p class="text-orange-500">
            Rating: {{ favorite.vote_average | roundToOneDecimal }}
          </p>
          <p class="">Release Date: {{ favorite.release_date }}</p>
        </router-link>
        <button
          @click.stop="removeFromFavorites(favorite.id)"
          class="mt-2 bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-400"
        >
          Remove from Favorites
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    roundToOneDecimal(value) {
      return parseFloat(value).toFixed(1); // sayıyı ondalık olarak yuvarla.
    },
  },
  methods: {
    removeFromFavorites(movieId) {
      this.$store.dispatch("removeFromFavorites", movieId);
    },
  },
  computed: {
    favorites() {
      return this.$store.getters.favorites;
    },
  },
};
</script>
