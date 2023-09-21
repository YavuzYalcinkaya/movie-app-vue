<template>
  <div class="flex flex-col">
    <div class="container mx-auto flex mt-20 border-b border-white">
      <img :src="posterPath" alt="" width="300" />
      <div class="ml-24">
        <h1 class="text-4xl font-semibold">{{ this.movie.title }}</h1>
        <span>
          <i class="fas fa-star text-orange-500"></i>
          {{ movie.vote_average | roundToOneDecimal }} |
          {{ this.movie.release_date }}
        </span>
        <div class="mt-3">
          <strong>Genres:</strong>
          <ul>
            <li v-for="genre in movie.genres" :key="genre.id">
              {{ genre.name }}
            </li>
          </ul>
        </div>
        <p class="mt-5">
          {{ this.movie.overview }}
        </p>
        <div class="mt-5">
          <p>Featured Cast</p>

          <div class="flex">
            <div :key="index" v-for="(crew, index) in movie.credits.crew">
              <div v-if="index < 2" class="flex flex-col gap-2 mt-2 mr-5">
                <span class="text-gray-500">{{ crew.job }}</span>
                <span>{{ crew.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <a
            @click.prevent="openTrailerModal"
            target="_blank"
            class="cursor-pointer rounded bg-orange-500 px-5 py-3 inline-flex gap-2 items-center text-white"
          >
            <i class="fas fa-play"></i>
            <span>Play Trailer</span>
          </a>
        </div>
      </div>
    </div>
    <Cast :casts="movie.credits.cast.slice(0, 12)" />
    <Images
      :images="movie.images.backdrops.slice(0, 12)"
      v-on:on-image-click="showImageModal"
    />
    <MediaModal
      v-model="modalOpen"
      :mediaUrl="mediaUrl"
      :isVideo="this.isVideo"
    />
  </div>
</template>

<script>
import Cast from "@/components/Cast.vue";
import Images from "@/components/Images.vue";
import MediaModal from "@/components/modals/MediaModal.vue";
export default {
  components: {
    Cast,
    Images,
    MediaModal,
  },
  data() {
    return {
      movie: {
        credits: {
          crew: {},
        },
        images: {
          backdrops: {},
        },
        genres: [],
      },
      modalOpen: false,
      isVideo: false,
      mediaUrl: "",
    };
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.fetchMovie(this.$route.params.id);
      },
      immediate: true,
    },
  },

  filters: {
    roundToOneDecimal(value) {
      return parseFloat(value).toFixed(1); // sayıyı ondalık olarak yuvarladım.
    },
  },

  methods: {
    async fetchMovie(movieId) {
      const response = await this.$http.get(
        "/movie/" + movieId + "?append_to_response=credits,videos,images"
      );
      this.movie = response.data;
      console.log(response.data);
    },
    openTrailerModal() {
      this.mediaUrl = this.youtubeVideo();
      this.isVideo = true;
      this.modalOpen = true;
    },
    openImageModal() {
      this.isVideo = false;
      this.modalOpen = true;
    },
    youtubeVideo() {
      const results = this.movie?.videos?.results;
      const trailerResult = results?.find(
        (result) => result.type === "Trailer"
      );

      if (trailerResult) {
        return "https://www.youtube.com/embed/" + trailerResult.key;
      }
      // Trailer tipinde bir sonuç bulunamazsa varsayılan bir değer döndür..
      return "https://www.youtube.com/embed/DEFAULT_VIDEO_KEY"; // Varsayılan video
    },
    showImageModal(imageFullPath) {
      this.mediaUrl = imageFullPath;
      this.isVideo = false;
      this.modalOpen = true;
    },
  },
  computed: {
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    },
  },
};
</script>
