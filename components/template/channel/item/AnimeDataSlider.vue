<template>
  <div placeholder="loading...">
    <siema class="siema" ref="siema" :options="options" :current.sync="currentSlide">
      <template v-for="(episode, index) in animes">
        <div class="slide" :key="index">
          <div class="flex">
            <nuxt-link class="anime-url" :to="`/watch?a=${episode.episode_id}`">
              <v-img :src="episode.thumbnail" @error="onImgError(index)">
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
                <nuxt-link :to="`/anime/${episode.anime_id}`">
                  {{episode.fansub}}
                  <v-img width="18px" class="anime-flag" :src="getFlag(episode.subtitle)"></v-img>
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
</template>
<script>
export default {
  props: ["data", "flags", "anime"],
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
      animes: []
    };
  },
  created() {
    if (this.data) {
      this.animes = JSON.parse(JSON.stringify(this.data));
    }
  },
  methods: {
    onImgError: function(index) {
      this.animes[index].thumbnail = "/thumb-error.jpg";
    },
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
    }
  }
};
</script>

<style scoped>
.slide {
  padding-right: 10px;
}
</style>