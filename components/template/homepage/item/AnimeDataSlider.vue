<template>
  <div placeholder="loading...">
    <siema class="siema" ref="siema" :options="options" :current.sync="currentSlide">
      <template v-for="(episode, index) in 12">
        <div class="slide" :key="index">
          <div class="flex">
            <v-img src="https://i.imgur.com/z6RwDqN.jpg">
              <div class="play-icon">
                <v-icon>mdi-play</v-icon>
              </div>
            </v-img>
            <div class="subheading">Palaaasd</div>
            <div class="metadata-line">
              <div class="title-anime">
                <nuxt-link :to="`/anime/`">
                  Horriblesubs
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-icon dark v-on="on" class="fansub-verify" size="14px">mdi-check-circle</v-icon>
                    </template>
                    <span>Trusted fansub</span>
                  </v-tooltip>
                </nuxt-link>
              </div>
              <span>10 views</span>
              <span>ยท</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </template>
    </siema>
    <v-layout align-end justify-end row>
      <v-flex class="text-right">
        <v-btn text @click="prev" :disabled="currentSlide < 1 ? true : false ">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn text @click="next" :disabled="currentSlide >= 6 ? true : false ">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
// import animeService from "@/services/anime.service";
// import episodeService from "@/services/episode.service";
export default {
  data() {
    return {
      options: {
        duration: 200,
        easing: "ease-out",
        perPage: {
          1200: "6",
          992: "5",
          768: "4",
          576: "3",
          0: "2"
        },
        startIndex: 0
      },
      currentSlide: 0,
      episodes: null,
      animes: null
    };
  },
  async mounted() {
    // this.animes = await animeService.index();
    // this.episodes = await episodeService.index();
  },
  methods: {
    next() {
      return this.$refs.siema.next();
    },
    prev() {
      return this.$refs.siema.prev();
    }
  },
  props: ["show"]
};
</script>

<style scoped>
.slide {
  padding-right: 10px;
}
</style>