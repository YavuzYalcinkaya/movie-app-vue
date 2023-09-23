<template>
  <div id="app" class="container mx-auto">
    <div
      class="flex justify-between items-center mt-3 h-24 border-b border-white"
    >
      <Logo class="ml-4 lg:ml-0" />
      <button @click="toggleMobileMenu" class="lg:hidden mr-2 lg:mr-0">
        <i class="fas fa-bars text-white text-2xl"></i>
      </button>

      <div class="hidden lg:flex">
        <Navbar />
      </div>
    </div>

    <MobileMenu v-if="mobileMenuVisible" @closeMobileMenu="closeMobileMenu" />

    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/header/Navbar.vue";
import Logo from "@/components/header/Logo.vue";
import MobileMenu from "@/components/header/MobileMenu.vue";

export default {
  name: "App",
  components: {
    Logo,
    Navbar,
    MobileMenu,
  },
  data() {
    return {
      mobileMenuVisible: false,
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
