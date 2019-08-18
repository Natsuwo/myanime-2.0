<template>
  <v-container fuild grid-list-md>
    <div class="myanime-home">
      <AnimeData :title="'Recent Uploads'" :data="recent" :flags="flags" :animes="animes" />
      <AnimeDataSlider :title="'Recommended'" :data="recoment" :flags="flags" :animes="animes" />
      <AnimeDataSlider :title="'Random'" :data="random" :flags="flags" :animes="animes" />
      <AnimeDataSlider :title="'Trending'" :data="trending" :flags="flags" :animes="animes" />
      <AnimeDataThumb
        :title="'Current Season'"
        :data="current"
        :flags="flags"
        :animes="animes"
      />
      <!-- <AnimeDataSlider :title="'Current Season'" :data="current" :flags="flags" :animes="animes" /> -->
    </div>
  </v-container>
</template>
<script>
import AnimeData from "@/components/template/homepage/AnimeData";
import AnimeDataSlider from "@/components/template/homepage/AnimeDataSlider";
import AnimeDataThumb from "@/components/template/homepage/AnimeDataThumb";
import { getEpisodes } from "../services/Episode";
import setting from "@/items/settings.json";
export default {
  head() {
    return {
      titleTemplate: "%s - " + setting.site_title,
      title: "Home",
      meta: [
        {
          hid: "description",
          name: "description",
          content: setting.descriptions
        }
      ]
    };
  },
  async fetch({ store, query }) {
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var response = (await getEpisodes(headers)).data;
    store.dispatch("anime/animesData", response.animes);
    store.dispatch("episode/episodesData", response.episodes);
  },
  computed: {
    animes() {
      return this.$store.state.anime.animes;
    },
    episodes() {
      return this.$store.state.episode.episodes;
    },
    recent() {
      return this.episodes.recent;
    },
    recoment() {
      return this.episodes.recoment;
    },
    random() {
      return this.episodes.random;
    },
    trending() {
      return this.episodes.trending;
    },
    current() {
      return this.episodes.current;
    },
    flags() {
      return this.$store.state.flags;
    }
  },
  components: {
    AnimeDataSlider,
    AnimeData,
    AnimeDataThumb
  }
};
</script>

