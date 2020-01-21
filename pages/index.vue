<template>
  <v-container fuild grid-list-md>
    <div class="myanime-home">
      <AnimeData :title="'Recent Uploads'" :data="episodes.recent" :flags="flags" :animes="animes" />
      <AnimeDataThumb
        :title="'Trending'"
        :data="episodes.trending"
        :flags="flags"
        :animes="animes"
      />
      <AnimeDataThumb :title="'Random'" :data="episodes.random" :flags="flags" :animes="animes" />
      <AnimeDataThumb
        :title="'Current Season'"
        :data="episodes.current"
        :flags="flags"
        :animes="animes"
      />
      <!-- <AnimeDataSlider :title="'Current Season'" :data="current" :flags="flags" :animes="animes" /> -->
    </div>
  </v-container>
</template>
<script>
import AnimeData from "@/components/template/homepage/AniDataNew";
import AnimeDataSlider from "@/components/template/homepage/AnimeDataSlider";
import AnimeDataThumb from "@/components/template/homepage/AnimeDataThumb";
import { getEpisodes } from "../services/Episode";
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
  asyncData({ store, query, error }) {
    var headers = {
      key: "home",
      "X-User-Session": store.state.auth.userToken
    };
    return getEpisodes(headers)
      .then(res => {
        var episodes = res.data.episodes;
        var animes = res.data.animes;
        return {
          animes,
          episodes
        };
      })
      .catch(() => {
        error({
          message: "You are not connected",
          statusCode: 403
        });
      });
  },
  computed: {
    ...mapState(["flags", "settings"])
  },
  components: {
    AnimeDataSlider,
    AnimeData,
    AnimeDataThumb
  }
};
</script>

