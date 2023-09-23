<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end"
  >
    <div class="bg-gray-800 overflow-y-auto w-64 h-full">
      <div class="flex justify-end mt-3 mr-1">
        <i
          class="fa fa-window-close fa-lg"
          @click="closeMobileMenu"
          aria-hidden="true"
        ></i>
      </div>
      <div class="p-4 flex justify-between mt-12">
        <ul class="uppercase gap-4 space-y-2 font-semibold text-xl">
          <li>
            <router-link to="/" class="text-white hover:underline"
              >Movies</router-link
            >
          </li>
          <li>
            <router-link to="/favorites" class="text-white hover:underline"
              >Favorites</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeMobileMenu() {
      // Mobil menüyü kapatma işlemi, App.vue bileşenine geri bildirim gönderir
      this.$emit("closeMobileMenu");
    },
  },
};
</script>
