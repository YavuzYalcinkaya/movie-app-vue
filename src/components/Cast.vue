<template>
  <div class="container mx-auto border-b border-white p-4">
    <h2 class="text-4xl font-semibold mb-5 text-center lg:text-start">Cast</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        class="flex flex-col items-center p-3"
        :key="index"
        v-for="(cast, index) in casts"
      >
        <img 
          :src="castProfileImage(cast)" 
          alt="Cast-Image" 
          class="rounded-xl hover:opacity-75 transition ease-in-out duration-200 cursor-pointer"  
        />
        <span class="mt-2 text-white text-center text-xl">{{ cast.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    casts: {
      required: true,
    },
  },
  methods: {
    castProfileImage(cast) {
      if (cast.profile_path) {
        return "https://image.tmdb.org/t/p/w300/" + cast.profile_path;
      } else {
        return "https://via.placeholder.com/300x450";
      }
    },
  },
};
</script>
