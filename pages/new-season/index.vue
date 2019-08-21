<template>
  <v-container fuild grid-list-md>
    <SeasonContent :is-loading="isLoading" :anime-seasons="animeSeasons" :season="season"/>
  </v-container>
</template>
<script>
import SeasonContent from "@/components/template/season/SeasonContent";
import { getSeason } from "@/services/Anime";
import setting from "@/items/settings.json";
import { mapState } from "vuex";
export default {
  head() {
    return {
      titleTemplate: "%s - " + setting.site_title,
      title: this.animeSeasons.season,
      meta: [
        {
          hid: "description",
          name: "description",
          content: setting.descriptions
        }
      ]
    };
  },
  async fetch({ store }) {
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var season = "new_season";
    var response = await getSeason(headers, season);
    if (response.data.success) {
      store.dispatch("anime/animeSeasons", response.data);
    }
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("anime", ["animeSeasons"]),
    season() {
        return "new_season"
    }
  },
  components: {
    SeasonContent
  }
};
</script>