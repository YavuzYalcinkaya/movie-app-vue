import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const FAVORITES_KEY = "favorites"; // localStorage anahtar adı

// localStorage'dan favori filmleri alıp Vuex deposuna yükleyen bir yardımcı işlev
function initializeFavoritesFromLocalStorage() {
  const storedFavorites = JSON.parse(
    localStorage.getItem(FAVORITES_KEY) || "[]"
  );
  return storedFavorites;
}

export default new Vuex.Store({
  state: {
    favorites: initializeFavoritesFromLocalStorage(), // Favorileri localStorage'dan alın
  },
  mutations: {
    addToFavorites(state, movie) {
      state.favorites.push(movie);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    },
    removeFromFavorites(state, movieId) {
      state.favorites = state.favorites.filter((movie) => movie.id !== movieId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    },
  },
  actions: {
    addToFavorites({ commit }, movie) {
      commit("addToFavorites", movie);
    },
    removeFromFavorites({ commit }, movieId) {
      commit("removeFromFavorites", movieId);
    },
  },
  getters: {
    favorites: (state) => state.favorites,
    isFavorite: (state) => (movieId) => {
      // favorites'ın bir dizi olup olmadığını kontrol edin
      if (Array.isArray(state.favorites)) {
        return state.favorites.some((movie) => movie.id === movieId);
      }
      return false;
    },
  },
});
