<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end"
    @click="closeMobileMenu"
  >
    <div class="bg-gray-800 w-64 h-full overflow-y-auto">
      <div class="p-4">
        <div class="text-white text-2xl mb-4">Menu</div>
        <ul class="space-y-2">
          <!-- Örnek bir menü öğesi -->
          <li>
            <router-link to="/" class="text-white hover:underline"
              >Movies</router-link
            >
          </li>
          <!-- Diğer menü öğeleri ekleyebilirsiniz -->
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
