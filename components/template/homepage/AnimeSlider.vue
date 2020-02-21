<template>
  <div class="recent-anime">
    <h1 class="anime-head-title">{{title}}</h1>
    <div v-if="data">
      <client-only>
        <flickity ref="flickity" :options="flickityOptions">
          <template v-for="(item, index) in data">
            <div class="slide" :key="index">
              <div class="flex">
                <a class="season-anime-link" :href="`/anime/${item.anime_id}`">
                  <div class="home-anime-card">
                    <div class="home-anime-cover">
                      <v-img
                        :lazy-src="imgproxy(item.thumbnail, 210)"
                        :src="imgproxy(item.thumbnail, 210)"
                      ></v-img>
                    </div>
                    <div class="season-anime-title">{{item.title}}</div>
                    <div class="anime-anime-total-views">{{viewFormater(item.views)}} views</div>
                  </div>
                </a>
              </div>
            </div>
          </template>
        </flickity>
      </client-only>
      <v-layout align-end justify-end row>
        <v-flex class="text-right">
          <v-btn text @click="prev" :disabled="currentSlide < 1  ? true : false ">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn text @click="next" :disabled="currentSlide >= totalSlide ? true : false ">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
    <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
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
    imgproxy(img, rs) {
      return proxyimg(img, rs);
    },
    getAnime(id, key) {
      return this.animes.filter(x => x.anime_id === id).map(x => x[key])[0];
    }
  }
};
</script>

<style scoped>
.slide {
  padding-right: 10px;
}
</style>