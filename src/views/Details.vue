<template>
  <div class="">
    <div
      class="flex flex-col lg:flex-row mt-6 p-3 lg:mt-12 border-b border-white"
    >
      <div class="flex justify-center items-center">
        <img
          :src="posterPath"
          alt=""
          width="300"
          class="md:w-[768px] lg:w-[900px] xl:w-[500px] rounded-xl"
        />
      </div>
      <div class="lg:ml-24 text-center lg:text-start">
        <h1 class="text-2xl lg:text-4xl font-semibold mt-2">
          {{ this.movie.title }}
        </h1>
        <div class="mt-4">
          <i class="fas fa-star text-orange-500"></i>
          {{ movie.vote_average | roundToOneDecimal }} |
          {{ this.movie.release_date }}
        </div>
        <div
          class="lg:mt-3 w-full flex justify-center items-center lg:justify-start"
        >
          <ul class="text-gray-500 flex gap-3">
            <li v-for="genre in movie.genres" :key="genre.id">
              {{ genre.name }}
            </li>
          </ul>
        </div>
        <p class="lg:mt-5 text-sm md:text-lg">
          {{ this.movie.overview }}
        </p>
        <div class="lg:mt-5">
          <h3 class="mt-2 font-bold text-xl">Featured Cast</h3>

          <div class="flex flex-col mt-2 lg:mr-5">
            <div :key="index" v-for="(crew, index) in movie.credits.crew">
              <div v-if="index < 2" class="mt-2">
                <div class="text-gray-500">{{ crew.job }}</div>
                <div class="text-sm lg:text-lg">{{ crew.name }}</div>
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
          cast: [],
          crew: {},
        },
        images: {
          backdrops: [],
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
