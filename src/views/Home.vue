<template>
  <div class="container mx-auto">
    <div
      class="flex justify-between items-center mt-3 h-24 border-b border-white"
    >
      <Logo />
      <Navbar />
      <Searchbar />
    </div>
    <PopularMovies />
  </div>
</template>

<script>
import Navbar from "@/components/header/Navbar.vue";
import Searchbar from "@/components/header/Searchbar.vue";
import Logo from "@/components/header/Logo.vue";
import PopularMovies from "../components/PopularMovies.vue";

export default {
  name: "Home",
  components: {
    Logo,
    Navbar,
    Searchbar,
    PopularMovies,
  },
};
</script>

<style scoped></style>
