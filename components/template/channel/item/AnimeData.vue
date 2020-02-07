<template >
  <v-layout row wrap>
    <v-flex xs12 sm4 md3 lg2 v-for="episode in data" :key="episode.id" pa-1>
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
          v-html="`${anime.title} ${episode.title ? `- ${episode.title}` : `- Episode ${episode.number}`} `"
        ></div>
      </nuxt-link>
      <div class="metadata-line">
        <div class="title-anime">
          <nuxt-link v-if="anime" :to="`/anime/${episode.anime_id}`">
            {{episode.fansub}}
            <!-- <v-tooltip right v-if="episode.fansub.trusted">
              <template v-slot:activator="{ on }">
                <v-icon dark v-on="on" class="fansub-verify" size="14px">mdi-check-circle</v-icon>
              </template>
              <span>Trusted fansub</span>
            </v-tooltip>-->
            <v-img
              maxWidth="18px"
              class="anime-flag"
              :lazy-src="getFlag(episode.subtitle)"
              :src="getFlag(episode.subtitle)"
            ></v-img>
          </nuxt-link>
        </div>
        <span class="episode-view">{{episode.views}} views</span>
        <span class="episode-moment">{{episode.updated_at | moment("from", "now")}}</span>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import { proxyimg } from "@/plugins/helpers";
export default {
  props: ["data", "flags", "anime"],
  methods: {
    getFlag(lang) {
      return this.flags
        .filter(x => x.key === lang)
        .map(x => x.value)
        .toString();
    },
    imgproxy(img, rs) {
      return proxyimg(img, rs);
    }
  }
};
</script>