<template >
  <div class="recent-anime">
    <h1 class="anime-head-title">{{title}}</h1>
    <v-layout row wrap>
      <v-flex xs12 sm4 md2 v-for="episode in data" :key="episode.id">
        <nuxt-link class="anime-url" :to="`/watch?a=${episode.episode_id}`">
          <v-img class="episode-thumbnail" :src="episode.thumbnail">
            <div class="play-icon">
              <v-icon>mdi-play</v-icon>
            </div>
          </v-img>
          <div
            :title="`${animeTitle(episode.anime_id)} ${episode.title ? `- ${episode.title}` : `- Episode ${episode.number}`}`"
            class="subheading episode-title"
            v-html="`${animeTitle(episode.anime_id)} ${episode.title ? `- ${episode.title}` : `- Episode ${episode.number}`} `"
          ></div>
        </nuxt-link>
        <div class="metadata-line">
          <div class="title-anime">
            <nuxt-link v-if="animes" :to="`/anime/${episode.anime_id}`">
              {{episode.fansub}}
              <v-img maxWidth="18px" class="anime-flag" :src="getFlag(episode.subtitle)"></v-img>
            </nuxt-link>
          </div>
          <span class="episode-view">{{episode.views}} views</span>
          <span class="episode-moment">{{episode.updated_at | moment("from", "now")}}</span>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: ["title", "data", "flags", "animes"],
  methods: {
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