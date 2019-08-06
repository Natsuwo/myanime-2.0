<template>
  <div class="anime-container">
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md8 lg9 pt-2 pr-4>
        <no-ssr>
          <Main />
        </no-ssr>
      </v-flex>
      <v-flex xs12 sm12 md4 lg3 pt-2 pr-4>
        <Sidebar />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Main from "@/components/template/watch/Main";
import Sidebar from "@/components/template/watch/Sidebar";
import "@/static/css/DPlayer.min.css";
export default {
  async fetch({ store, query }) {
    var data = {
      headers: {
        "X-User-Session": store.state.auth.userToken
      },
      form: {
        episode_id: query.a
      }
    };
    await store.dispatch("episode/getEpisode", data);
    var headers = {
      "X-User-Session": data.headers["X-User-Session"],
      "X-Episode-Id": data.form.episode_id
    };
    await store.dispatch("comment/get", headers);
  },
  layout: "watch",
  head() {
    return {
      title: "DPLAYER",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  },
  components: {
    Main,
    Sidebar
  },
  data() {
    return {};
  }
};
</script>
