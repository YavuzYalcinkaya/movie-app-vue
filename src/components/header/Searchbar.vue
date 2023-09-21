<template>
  <div class="flex mt-5 relative">
    <input
      ref="searchBox"
      type="text"
      class="rounded-full bg-gray-700 px-8 py-2 w-48 mr-3 focus:outline-none text-white"
      placeholder="Film Ara..."
      @input="debounceSearch"
      v-model="searchTerm"
      @focus="handleFocus"
    />
    <div class="absolute top-2 left-2 text-gray-300">
      <i class="fas fa-search fill-current w-4"></i>
    </div>

    <div
      class="absolute bg-gray-800 w-60 rounded shadow-md z-10 overflow-y-auto mt-12"
    >
      <ul v-if="showSearchResult" class="mt-2 max-h-[400px]">
        <router-link
          :to="'/movie/' + movie.id"
          tag="li"
          :key="movie.id"
          v-for="movie in searchResult"
          @click.native="showSearchResult = false"
          class="flex items-center p-2 hover:bg-gray-700 cursor-pointer border-b border-white"
        >
          <img
            :src="posterPath(movie.poster_path)"
            alt=""
            class="w-10 h-14 rounded-md object-cover"
          />
          <span class="ml-2 text-white">{{ movie.title }}</span>
        </router-link>
      </ul>
      <ul class="px-3 z-10" v-else>
        <li v-if="noResultFound">No Result Found for "{{ searchTerm }}"</li>
      </ul>
    </div>
    <img
      src="@/assets/profile.jpeg"
      alt="Profile"
      class="h-10 w-10 rounded-full cursor-pointer"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchResult: [],
      searchTerm: "",
      showSearchResult: false,
      noResultFound: false,
      debounce: null, // debounce işlemi için timer değişkeni
    };
  },
  mounted() {
    this.keyboardEvents();
  },
  methods: {
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        if (event.target.value.length > 2) {
          this.fetchSearch(event.target.value);
        } else {
          this.searchResult = [];
          this.noResultFound = false;
          this.showSearchResult = false; // Boş metinle arama yapıldığında sonuçları gizle
        }
      }, 600);
    },
    async fetchSearch(term) {
      try {
        const response = await this.$http.get("/search/movie?query=" + term);
        this.searchResult = response?.data?.results || [];
        this.showSearchResult = this.searchResult.length > 0; // Sonuçlar geldiyse sonuçları göster
        this.noResultFound = this.searchResult.length === 0;
      } catch (error) {
        console.log(error);
      }
    },

    handleFocus() {
      if (this.searchTerm != "") {
        this.showSearchResult = true;
      }
    },
    keyboardEvents() {
      let windowObj = this;

      window.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target)) {
          this.showSearchResult = false;
        }
      });

      window.addEventListener("keypress", (e) => {
        if (e.key === "/") {
          e.preventDefault();
          windowObj.$refs.searchBox.focus();
        }
      });
      window.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
          this.showSearchResult = false;
        }
      });
    },
    posterPath(poster_path) {
      if (poster_path) {
        return "https://image.tmdb.org/t/p/w500/" + poster_path;
      } else {
        return "https://via.placeholder.com/300x450";
      }
    },
  },
};
</script>
