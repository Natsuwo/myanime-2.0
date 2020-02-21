<template>
  <div class="recent-anime">
    <h1 class="anime-head-title">{{title}}</h1>
    <div placeholder="loading...">
      <flickity ref="flickity" :options="flickityOptions">
        <template v-for="(episode, index) in data">
          <div class="slide" :key="index">
            <div class="flex">
              <nuxt-link class="anime-url" :to="`/watch?a=${episode.episode_id}`">
                <v-img
                  class="episode-thumbnail"
                  :lazy-src="proxyimg(episode.thumbnail)"
                  :src="proxyimg(episode.thumbnail)"
                >
                  <div class="play-icon">
                    <v-icon>mdi-play</v-icon>
                  </div>
                </v-img>
                <div
                  :title="`${animeTitle(episode.anime_id)} ${episode.title ? `- ${episode.title}` : `- Episode ${episode.number}`}`"
                  class="subheading episode-title"
                  v-html="`${animeTitle(episode.anime_id)} ${episode.title ? `- ${episode.title}` : `- Episode ${episode.number}`}`"
                ></div>
              </nuxt-link>
              <div class="metadata-line">
                <div class="title-anime">
                  <nuxt-link :to="`/anime/${episode.anime_id}`">
                    {{episode.fansub}}
                    <v-img
                      maxWidth="18px"
                      class="anime-flag"
                      :lazy-src="getFlag(episode.subtitle)"
                      :src="getFlag(episode.subtitle)"
                    ></v-img>
                  </nuxt-link>
                </div>
                <span class="episode-view">{{viewFormater(episode.views)}} views</span>
                <span class="episode-moment">{{episode.updated_at | moment("from", "now")}}</span>
              </div>
            </div>
          </div>
        </template>
      </flickity>
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
  </div>
</template>
<script>
import { proxyimg, viewFormater } from "@/plugins/helpers";
export default {
  props: ["title", "data", "flags", "animes"],
  data() {
    return {
      flickityOptions: {
        contain: true,
        groupCells: false,
        cellAlign: "left",
        lazyLoad: 2,
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false
      },
      currentSlide: 0,
      totalSlide: 0
    };
  },
  watch: {
    data(val) {
      this.totalSlide = Math.floor(val.length - 6) || 0;
    }
  },
  methods: {
    goLink(path) {
      this.$refs.flickity.on("staticClick", event => {
        this.$router.push(path);
      });
    },
    next() {
      var flkty = this.$refs.flickity;
      var slide = flkty.slides();
      var index = flkty.selectedIndex();
      this.currentSlide = index + 1;

      return this.$refs.flickity.next();
    },
    prev() {
      var flkty = this.$refs.flickity;
      var slide = flkty.slides();
      var index = flkty.selectedIndex();
      this.currentSlide = index - 1;
      return this.$refs.flickity.previous();
    },
    viewFormater(view) {
      return viewFormater(view);
    },
    getFlag(lang) {
      return this.flags
        .filter(x => x.key === lang)
        .map(x => x.value)
        .toString();
    },
    imgproxy(img) {
      return proxyimg(img, 260);
    },
    animeTitle(id) {
      return this.animes.filter(x => x.anime_id === id).map(x => x.title)[0];
    }
  }
};
</script>

<style scoped>
.slide {
  padding-right: 10px;
}
</style>