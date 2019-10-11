<template>
  <v-container fuild grid-list-md>
    <SeasonContent
      @loadData="data => loadData(data)"
      :is-loading="isLoading"
      :anime-seasons="animeSeasons"
      :season="season"
    />
  </v-container>
</template>
<script>
import SeasonContent from "@/components/template/season/SeasonContent";
import { getSeason } from "@/services/Anime";
import { mapState } from "vuex";
export default {
  head() {
    return {
      titleTemplate: "%s - " + this.settings.site_title,
      title: this.animeSeasons.season,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.settings.descriptions
        }
      ]
    };
  },
  asyncData({ store, params }) {
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var season = params.id;
    return getSeason(headers, season).then(res => {
      var results = res.data;
      return {
        animeSeasons: results.data,
        season
      };
    });
  },
  methods: {
    loadData(res) {
      var newAnimes = this.animeSeasons.animes.concat(res.data.animes);
      var newEps = this.animeSeasons.totalEps.concat(res.data.totalEps);
      this.animeSeasons.animes = newAnimes;
      this.animeSeasons.totalEps = newEps;
    }
  },
  computed: {
    ...mapState(["isLoading", "settings"])
  },
  components: {
    SeasonContent
  }
};
</script>