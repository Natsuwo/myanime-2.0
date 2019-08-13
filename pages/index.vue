<template>
  <v-container fuild grid-list-md>
    <div class="myanime-home">
      <NewUpdate />
      <Recommended />
      <RandomAnime />
      <TopTrending />
    </div>
  </v-container>
</template>
<script>
import NewUpdate from "@/components/template/homepage/NewUpdate";
import Recommended from "@/components/template/homepage/Recommended";
import RandomAnime from "@/components/template/homepage/RandomAnime";
import TopTrending from "@/components/template/homepage/TopTrending";
import { getEpisodes } from "../services/Episode";
export default {
  head() {
    return {
      title: 'Home'
    }
  },
  async fetch({ store, query }) {
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var response = (await getEpisodes(headers)).data;
    store.dispatch("anime/animesData", response.animes);
    store.dispatch("episode/episodesData", response.episodes);
  },
  components: {
    NewUpdate,
    Recommended,
    RandomAnime,
    TopTrending
  }
};
</script>

