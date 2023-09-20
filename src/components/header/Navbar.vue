<template>
  <nav class="flex items-center p-4 text-white">
    <div class="flex space-x-4 text-xl font-semibold">
      <router-link
        to="/"
        class="px-2 py-1 rounded hover:opacity-75 hover:scale-110 duration-200"
        >Movies</router-link
      >
      <router-link
        to="/favorites"
        class="px-2 py-1 rounded hover:opacity-75 hover:scale-110 duration-200"
        >Favourites</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
