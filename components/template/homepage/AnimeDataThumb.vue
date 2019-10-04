<template>
  <div class="recent-anime">
    <h2 class="anime-head-title">{{title}}</h2>
    <div placeholder="loading...">
      <siema class="siema" ref="siema" :options="options" :current.sync="currentSlide">
        <template v-for="(episode, index) in data">
          <div class="slide" :key="index">
            <div class="flex">
              <nuxt-link class="anime-url" :to="`/watch?a=${episode.episode_id}`">
                <div class="season-thumbnail">
                  <v-img class="episode-thumbnail" :src="episode.thumbnail">
                    <div class="play-icon">
                      <v-icon>mdi-play</v-icon>
                    </div>
                  </v-img>
                  <div class="search-overlay">
                    <v-img
                      class="season-anime-thumbnail"
                      :src="getAnime(episode.anime_id, 'thumbnail')"
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
                    <v-img maxWidth="18px" class="anime-flag" :src="getFlag(episode.subtitle)"></v-img>
                  </nuxt-link>
                </div>
                <span class="episode-view">{{getAnime(episode.anime_id, 'views')}} views</span>
                <span
                  class="episode-moment"
                >{{getAnime(episode.anime_id, 'created_at') | moment("from", "now")}}</span>
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
          <v-btn text @click="next" :disabled="currentSlide >= totalSlide ? true : false ">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "data", "flags", "animes"],
  data() {
    return {
      options: {
        duration: 200,
        easing: "ease-out",
        perPage: {
          1640: "6",
          1288: "5",
          1070: "4",
          840: "3",
          576: "2",
          0: "1"
        },
        startIndex: 0
      },
      currentSlide: 0
    };
  },
  computed: {
    totalSlide() {
      return Math.floor(this.data.length / 2) || 0;
    }
  },
  methods: {
    next() {
      return this.$refs.siema.next();
    },
    prev() {
      return this.$refs.siema.prev();
    },
    getFlag(lang) {
      return this.flags
        .filter(x => x.key === lang)
        .map(x => x.value)
        .toString();
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