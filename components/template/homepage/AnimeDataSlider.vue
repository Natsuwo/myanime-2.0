<template>
  <div class="recent-anime">
    <h2 class="anime-head-title">{{title}}</h2>
    <div placeholder="loading...">
      <siema class="siema" ref="siema" :options="options" :current.sync="currentSlide">
        <template v-for="(episode, index) in data">
          <div class="slide" :key="index">
            <div class="flex">
              <nuxt-link class="anime-url" :to="`/watch?a=${episode.episode_id}`">
                <v-img class="episode-thumbnail" :src="episode.thumbnail">
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
                    <v-img maxWidth="18px" class="anime-flag" :src="getFlag(episode.subtitle)"></v-img>
                  </nuxt-link>
                </div>
                <span class="episode-view">{{episode.views}} views</span>
                <span class="episode-moment">{{episode.updated_at | moment("from", "now")}}</span>
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
      currentSlide: 0,
      anime: []
    };
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