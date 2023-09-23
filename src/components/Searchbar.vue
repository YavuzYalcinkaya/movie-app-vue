<template>
  <div class="relative mx-auto w-full max-w-xl mt-4 shadow-md">
    <div class="absolute top-2 left-0 flex items-center h-full ml-3">
      <i class="fas fa-search w-8 h-8 text-white fill-current"></i>
    </div>
    <input
      ref="searchBox"
      type="text"
      class="w-full py-3 lg:py-4 px-4 bg-gray-700 text-white rounded-md pl-10 focus:outline-none focus:shadow-outline"
      placeholder="Search Movie..."
      @input="debounceSearch"
      v-model="searchTerm"
      @focus="handleFocus"
    />

    <div
      class="absolute bg-gray-800 w-full max-w-xl rounded shadow-md z-10 overflow-y-auto mt-4"
    >
      <ul v-if="showSearchResult" class="mt-2 w-full max-h-[400px]">
        <router-link
          :to="'/movie/' + movie.id"
          tag="li"
          :key="movie.id"
          v-for="movie in searchResult"
          @click.native="showSearchResult = false"
          class="flex items-center p-2 hover:bg-gray-700 cursor-pointer border-b border-gray-700"
        >
          <img
            :src="posterPath(movie.poster_path)"
            alt=""
            class="w-20 h-20 rounded-md object-cover"
          />
          <span class="ml-2 text-lg text-white">{{ movie.title }}</span>
        </router-link>
      </ul>
      <ul
        class="px-3 py-2 z-10"
        v-if="searchResult.length == 0 && showSearchResult"
      >
        <li>No Result Found for "{{ searchTerm }}"</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchResult: [],
      searchTerm: "",
      showSearchResult: false,
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
          this.showSearchResult = false; // Boş metinle arama yapıldığında sonuçları gizle
        }
      }, 500);
    },
    async fetchSearch(term) {
      try {
        const response = await this.$http.get("/search/movie?query=" + term);
        this.searchResult = response?.data?.results || [];
        this.showSearchResult = this.searchResult.length > 0; // Sonuçlar geldiyse sonuçları göster
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
