<template>
  <div class="container mx-auto border-b border-white px-4 py-4">
    <h2 class="text-4xl font-semibold mb-5">Images</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <div class="mr-2 my-3" :key="index" v-for="(image, index) in images">
        <img
          @click="openModal(image)"
          :src="movieImage(image)"
          alt=""
          class="hover:opacity-75 transition ease-in-out duration-100"
        />
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
    openModal(image) {
      let imageFullPath = "";
      if (image.file_path) {
        imageFullPath =
          "https://image.tmdb.org/t/p/original/" + image.file_path;
      } else {
        imageFullPath = "https://via.placeholder.com/300x450";
      }
      this.$emit("on-image-click", imageFullPath);
    },
  },
};
</script>
