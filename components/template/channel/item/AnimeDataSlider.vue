<template>
  <div placeholder="loading...">
    <client-only>
      <flickity ref="flickity" :options="flickityOptions" @init="onInit">
        <template v-for="(episode, index) in data">
          <div class="slide" :key="index">
            <div class="flex flick-link">
              <nuxt-link class="anime-url" :to="`/watch?a=${episode.episode_id}`">
                <v-img
                  class="episode-thumbnail"
                  :lazy-src="imgproxy(episode.thumbnail, 260)"
                  :src="imgproxy(episode.thumbnail, 260)"
                >
                  <div class="play-icon">
                    <v-icon>mdi-play</v-icon>
                  </div>
                </v-img>
                <div
                  :title="`${anime.title} ${episode.title ? `- ${episode.title}` : `- Episode ${episode.number}`}`"
                  class="subheading episode-title"
                  v-html="`${anime.title} ${episode.title ? `- ${episode.title}` : `- Episode ${episode.number}`}`"
                ></div>
              </nuxt-link>
              <div class="metadata-line">
                <div class="title-anime">
                  <a href="#">
                    {{episode.fansub}}
                    <v-img
                      maxWidth="18px"
                      class="anime-flag"
                      :lazy-src="getFlag(episode.subtitle)"
                      :src="getFlag(episode.subtitle)"
                    ></v-img>
                  </a>
                </div>
                <span class="episode-view">{{viewFormater(episode.views)}} views</span>
                <span class="episode-moment">{{episode.updated_at | moment("from", "now")}}</span>
              </div>
            </div>
          </div>
        </template>
      </flickity>
    </client-only>
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
import { proxyimg, viewFormater } from "@/plugins/helpers";
export default {
  props: ["data", "flags", "anime"],
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
      totalSlide: 0,
      onInit(flickity) {
        var script = document.createElement("script");
        script.src = "//code.jquery.com/jquery-2.2.4.min.js";
        document.body.appendChild(script);
        flickity.on("dragMove", function(event, pointer, moveVector) {
          $(".flick-link").addClass("nopointer");
        });
        flickity.on("dragEnd", function(event, pointer) {
          $(".flick-link").removeClass("nopointer");
        });
      }
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
    getFlag(lang) {
      return this.flags
        .filter(x => x.key === lang)
        .map(x => x.value)
        .toString();
    },
    viewFormater(view) {
      return viewFormater(view);
    },
    imgproxy(img, rs) {
      return proxyimg(img, rs);
    }
  }
};
</script>

<style scoped>
.slide {
  padding-right: 10px;
}
</style>