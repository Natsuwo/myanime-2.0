<template >
  <v-layout row wrap>
    <v-flex xs6 sm4 md2 v-for="episode in data" :key="episode.id">
      <nuxt-link class="anime-url" :to="`/watch?a=${episode.episode_id}`">
        <v-img src="https://i.imgur.com/z6RwDqN.jpg">
          <div class="play-icon">
            <v-icon>mdi-play</v-icon>
          </div>
        </v-img>
        <div
          :title="`${episode.anime.title} episode ${episode.number} - ${episode.title}`"
          class="subheading episode-title"
        >{{`Episode ${episode.number} - ${episode.title}`}}</div>
      </nuxt-link>
      <div class="metadata-line">
        <div class="title-anime">
          <nuxt-link v-if="episode.anime" :to="`/anime/${episode.anime.anime_id}`">
            {{episode.anime.title}}
            <!-- <v-tooltip right v-if="episode.fansub.trusted">
              <template v-slot:activator="{ on }">
                <v-icon dark v-on="on" class="fansub-verify" size="14px">mdi-check-circle</v-icon>
              </template>
              <span>Trusted fansub</span>
            </v-tooltip> -->
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
  props: ["data"]
};
</script>
