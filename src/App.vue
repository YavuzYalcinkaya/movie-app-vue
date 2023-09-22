<template>
  <div id="app" class="container mx-auto">
    <div
      class="flex justify-between items-center mt-3 h-24 border-b border-white"
    >
      <Logo class="ml-4 lg:ml-0" />

      <!-- Mobil ve tablet için hamburger menu -->
      <button @click="toggleMobileMenu" class="lg:hidden mr-2 lg:mr-0">
        <i class="fas fa-bars text-white text-2xl"></i>
      </button>

      <!-- Navbar için div -->
      <div class="hidden lg:flex">
        <Navbar />
      </div>
    </div>

    <!-- Mobil ve tablet için görünen MobileMenu bileşeni -->
    <MobileMenu v-if="mobileMenuVisible" @closeMobileMenu="closeMobileMenu" />

    <!-- Diğer sayfa içeriği -->
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/header/Navbar.vue";
import Logo from "@/components/header/Logo.vue";
import MobileMenu from "@/components/header/MobileMenu.vue"; // MobileMenu bileşeni eklendi

export default {
  name: "App",
  components: {
    Logo,
    Navbar,
    MobileMenu, // MobileMenu bileşeni eklendi
  },
  data() {
    return {
      mobileMenuVisible: false, // MobileMenu'nun görünürlüğünü saklar
    };
  },
  methods: {
    toggleMobileMenu() {
      // MobileMenu görünürlüğünü aç/kapat
      this.mobileMenuVisible = !this.mobileMenuVisible;
    },
    closeMobileMenu() {
      // MobileMenu'yu kapatma işlemi
      this.mobileMenuVisible = false;
    },
  },
};
</script>
