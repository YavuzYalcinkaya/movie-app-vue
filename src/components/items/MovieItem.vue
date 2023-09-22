<template>
  <div class="pt-4">
    <router-link :to="`/movie/${movie.id}`">
      <img
        class="hover:opacity-75 transition ease-in-out duration-150 rounded-xl"
        width="{250}"
        height="{200}"
        unoptimized
        alt=""
        :src="posterPath"
      />
    </router-link>
    <div class="cursor-pointer">
      <p class="text-lg text-white text-start mt-2 hover:text-gray-300">
        {{ movie.title }}
      </p>
      <div class="flex items-center text-[#9CA3AF]">
        <i class="fas fa-star text-orange-500"></i>
        <span class="ml-2">{{ movie.vote_average }} </span>
        <span class="ml-1">|</span>
        <span class="ml-2 text-sm">{{ movie.release_date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      required: true,
    },
  },

  computed: {
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    },
  },
};
</script>

<style></style>
