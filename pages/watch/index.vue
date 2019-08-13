<template>
  <div class="anime-container">
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md8 lg9 pt-2 pr-4>
        <no-ssr>
          <Main :episode="episode" :usermeta="usermeta" :flags="flags" :anime="anime" />
        </no-ssr>
      </v-flex>
      <v-flex xs12 sm12 md4 lg3 pt-2 pr-4>
        <Sidebar
          :episode="episode"
          :usermeta="usermeta"
          :anime="anime"
          :sidebar="sidebar"
          :flags="flags"
        />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Main from "@/components/template/watch/Main";
import Sidebar from "@/components/template/watch/Sidebar";
import "@/static/css/DPlayer.min.css";
import { getEpisode } from "@/services/Episode";
export default {
  head() {
    return {
      title: `${this.anime.title} Ep.${this.episode.number} ${this.episode.title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.anime.description
        }
      ]
    };
  },
  async fetch({ store, query }) {
    var episode_id = query.a;
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var response = (await getEpisode(headers, episode_id)).data;
    var result = response.result;
    store.commit("comment/loading", true);
    store.dispatch("anime/animeData", result.anime);
    store.dispatch("episode/episodeData", result.episode);
    store.dispatch("episode/sidebarData", result.sidebar);
    if (store.state.auth.isLogin) {
      await store.dispatch("auth/userMetaData", result.usermeta);
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.episode.sidebar;
    },
    anime() {
      return this.$store.state.anime.anime;
    },
    episode() {
      return this.$store.state.episode.episode;
    },
    usermeta() {
      return this.$store.state.auth.usermeta;
    },
    flags() {
      return this.$store.state.flags;
    }
  },
  layout: "watch",
  components: {
    Main,
    Sidebar
  },
  watchQuery: ["a"]
};
</script>
