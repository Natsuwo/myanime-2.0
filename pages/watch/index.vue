<template>
  <div class="anime-container">
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md8 lg9 pt-2 pr-4>
        <client-only>
          <Main :episode="episode" :usermeta="usermeta" :flags="flags" :anime="anime" />
        </client-only>
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
import { getEpisode } from "@/services/Episode";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: `${this.anime.title} ${
        this.episode.title ? this.episode.title : `Ep.${this.episode.number}`
      } - ${this.settings.site_title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.anime.description
        }
      ]
    };
  },
  async fetch({ store, query, redirect }) {
    var episode_id = query.a;
    if (!episode_id) {
      return redirect("/");
    }
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var response = (await getEpisode(headers, episode_id)).data;
    if (!response.success) {
      return redirect("/");
    }
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
    ...mapState(["settings", "flags"]),
    ...mapState("anime", ["anime"]),
    ...mapState("episode", ["episode", "sidebar"]),
    ...mapState("auth", ["usermeta"])
  },
  layout: "watch",
  components: {
    Main,
    Sidebar
  },
  watchQuery: ["a"]
};
</script>