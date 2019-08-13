<template >
  <v-layout row wrap>
    <v-flex xs6 sm4 md2 v-for="episode in data" :key="episode.id">
      <nuxt-link class="anime-url" :to="`/watch?a=${episode.episode_id}`">
        <v-img :src="episode.thumbnail">
          <div class="play-icon">
            <v-icon>mdi-play</v-icon>
          </div>
        </v-img>
        <div
          :title="`${animeTitle(episode.anime_id)} episode ${episode.number} ${episode.title ? '-' : ''} ${episode.title}`"
          class="subheading episode-title"
        >{{`${animeTitle(episode.anime_id)} Ep. ${episode.number} ${episode.title ? '-' : ''} ${episode.title}`}}</div>
      </nuxt-link>
      <div class="metadata-line">
        <div class="title-anime">
          <nuxt-link v-if="animes" :to="`/anime/${episode.anime_id}`">
            {{episode.fansub}}
            <!-- <v-tooltip right v-if="episode.fansub.trusted">
              <template v-slot:activator="{ on }">
                <v-icon dark v-on="on" class="fansub-verify" size="14px">mdi-check-circle</v-icon>
              </template>
              <span>Trusted fansub</span>
            </v-tooltip>-->
            <v-img width="18px" class="anime-flag" :src="getFlag(episode.subtitle)"></v-img>
          </nuxt-link>
        </div>
        <span class="episode-view">{{episode.views}} views</span>
        <span>{{episode.updated_at | moment("from", "now")}}</span>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: ["data", "flags", "animes"],
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