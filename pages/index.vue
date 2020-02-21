<template>
  <v-container fuild grid-list-md>
    <div class="myanime-home">
      <AnimeData
        :title="'Recent Uploads'"
        :data="episodes.recent.episodes"
        :flags="flags"
        :animes="episodes.recent.animes"
      />
      <AnimeSlider
        :title="'Trending'"
        :data="episodes.trending.animes"
        :flags="flags"
      />
      <AnimeSlider
        :title="'Random'"
        :data="episodes.random.animes"
        :flags="flags"
      />
      <AnimeSlider
        :title="'Current Season'"
        :data="episodes.current.animes"
        :flags="flags"
      />
    </div>
  </v-container>
</template>
<script>
import AnimeData from "@/components/template/homepage/AniDataNew";
import AnimeSlider from "@/components/template/homepage/AnimeSlider"
import AnimeDataThumb from "@/components/template/homepage/AnimeDataThumb";
import {
  getRecent,
  getTrending,
  getRandom,
  getCurrent
} from "../services/Episode";
import { mapState } from "vuex";
export default {
  head() {
    return {
      titleTemplate: "%s - " + this.settings.site_title,
      title: "Home",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.settings.descriptions
        }
      ]
    };
  },
  beforeCreate() {
    var store = this.$store
    var headers = {
      key: "episodes",
      "X-User-Session": store.state.auth.userToken
    };
    getRecent(headers).then(res => {
      var result = res.data;
      var { episodes, animes } = result;
      store.dispatch("episode/episodesData", {
        type: "recent",
        data: { animes, episodes }
      });
    });
    getTrending(headers).then(res => {
      var result = res.data;
      var { episodes, animes } = result;
      store.dispatch("episode/episodesData", {
        type: "trending",
        data: { animes, episodes }
      });
    });
    getRandom(headers).then(res => {
      var result = res.data;
      var { episodes, animes } = result;
      store.dispatch("episode/episodesData", {
        type: "random",
        data: { animes, episodes }
      });
    });
    getCurrent(headers).then(res => {
      var result = res.data;
      var { episodes, animes } = result;
      store.dispatch("episode/episodesData", {
        type: "current",
        data: { animes, episodes }
      });
    });
  },
  computed: {
    ...mapState(["flags", "settings"]),
    ...mapState("episode", ["episodes"])
  },
  components: {
    AnimeSlider,
    AnimeData,
    AnimeDataThumb
  }
};
</script>

