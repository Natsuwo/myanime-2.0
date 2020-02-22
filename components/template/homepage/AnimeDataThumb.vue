<template>
  <div class="recent-anime">
    <h1 class="anime-head-title">{{title}}</h1>
    <div v-if="data">
      <client-only>
        <flickity ref="flickity" :options="flickityOptions" @init="onInit">
          <template v-for="(episode, index) in data">
            <div class="slide" :key="index">
              <div class="flex flick-link">
                <nuxt-link class="anime-url" :to="`/watch?a=${episode.episode_id}`">
                  <div class="season-thumbnail">
                    <v-img
                      class="episode-thumbnail"
                      :lazy-src="imgproxy(episode.thumbnail, 260)"
                      :src="imgproxy(episode.thumbnail, 260)"
                    >
                      <div class="play-icon">
                        <v-icon>mdi-play</v-icon>
                      </div>
                    </v-img>
                    <div class="search-overlay">
                      <v-img
                        class="season-anime-thumbnail"
                        :lazy-src="imgproxy(getAnime(episode.anime_id, 'thumbnail'), 60)"
                        :src="imgproxy(getAnime(episode.anime_id, 'thumbnail'), 60)"
                      ></v-img>
                      <div class="season-anime">
                        <div class="count">{{episode.count}}</div>
                        <v-icon>mdi-animation-play</v-icon>
                      </div>
                    </div>
                  </div>
                  <div
                    :title="getAnime(episode.anime_id, 'title')"
                    class="subheading episode-title"
                    v-html="getAnime(episode.anime_id, 'title')"
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