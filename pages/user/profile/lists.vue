<template>
  <v-container>
    <Lists :animes="lists.animes" :metas="lists.metas" :follows="lists.follow" :terms="terms" />
  </v-container>
</template>
<script>
import { getLists } from "@/services/User";
import { mapState } from "vuex";
import Lists from "@/components/template/profile/Lists";
export default {
  components: { Lists },
  async fetch({ store }) {
    var headers = {
      "x-user-session": store.state.auth.userToken
    };
    var response = await getLists(headers);
    store.commit("auth/getLists", response.data.data);
  },
  computed: {
    ...mapState("auth", ["lists"]),
    terms() {
      return this.$store.state.anime.terms;
    }
  },
  middleware: "auth",
  layout: "profile"
};
</script>