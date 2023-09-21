<template>
  <div class="container mx-auto border-b border-white px-4 py-4">
    <h2 class="text-4xl font-semibold mb-5">Images</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <div class="mr-2 my-3" :key="index" v-for="(image, index) in images">
        <img :src="movieImage(image)" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      required: true,
    },
  },
  methods: {
    movieImage(image) {
      if (image.file_path) {
        return "https://image.tmdb.org/t/p/w300/" + image.file_path;
      } else {
        return "https://via.placeholder.com/300x450";
      }
    },
  },
};
</script>
