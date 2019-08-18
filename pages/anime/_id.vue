<template>
  <div class="anime-channel">
    <Header :data="anime" :meta="animemetas" :terms="terms" :usermeta="usermeta" />
    <v-layout row wrap align-center>
      <div class="container fuild">
        <div class="myanime-home anime-channel-container">
          <h2>Most viewed</h2>
          <AnimeDataSlider :data="episodes.most" :anime="anime" :flags="flags" class="py-2" />
          <h2>New uploaded</h2>
          <AnimeDataSlider :data="episodes.new" :anime="anime" :flags="flags" class="py-2" />
          <div v-if="episodes.eng.length > 0">
            <h2>English Subtiltes</h2>
            <AnimeDataSlider :data="episodes.eng" :anime="anime" :flags="flags" class="py-2" />
          </div>
          <div v-if="episodes.cn.length > 0">
            <h2>Chinese Subtiltes</h2>
            <AnimeDataSlider :data="episodes.cn" :anime="anime" :flags="flags" class="py-2" />
          </div>
          <h2>All</h2>
          <AnimeData :data="episodes.all" :anime="anime" :flags="flags" class="pa-2" />
          <v-btn @click="loadmore" :loading="loading">Loadmore</v-btn>
        </div>
      </div>
    </v-layout>
  </div>
</template>
<script>
import AnimeDataSlider from "@/components/template/channel/item/AnimeDataSlider";
import AnimeData from "@/components/template/channel/item/AnimeData";
import Header from "@/components/template/anime/channel/header";
import { getChannel, loadMoreChannel } from "@/services/Anime";
export default {
  head() {
    return {
      title: this.anime.title + " Details",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.anime.description
        }
      ]
    };
  },
  async fetch({ store, params }) {
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var anime_id = params.id;
    var response = (await getChannel(headers, anime_id)).data;
    await store.dispatch("anime/animeData", response.anime);
    await store.dispatch("anime/animemetaData", response.animemeta);
    await store.dispatch("anime/episodesData", response.episodes);
    if (store.state.auth.isLogin) {
      await store.dispatch("auth/userMetaData", response.usermeta);
    }
  },
  data() {
    return {
      skip: 12,
      loading: false
    };
  },
  computed: {
    episodes() {
      return this.$store.state.anime.episodes;
    },
    anime() {
      return this.$store.state.anime.anime || "";
    },
    animemetas() {
      return this.$store.state.anime.animemeta;
    },
    terms() {
      return this.$store.state.anime.terms;
    },
    usermeta() {
      return this.$store.state.auth.usermeta;
    },
    flags() {
      return this.$store.state.flags;
    }
  },
  mounted() {
    if (!this.anime) {
      return this.$router.push({ path: "/" });
    }
  },
  methods: {
    async loadmore() {
      this.loading = true;
      var headers = { "x-user-session": this.$store.state.auth.userToken };
      var anime_id = this.$route.params.id;
      var response = await loadMoreChannel(headers, anime_id, this.skip);
      if (response.data.success) {
        this.$store.dispatch("anime/loadMore", response.data);
        this.skip += 12;
        this.loading = false;
      }
    }
  },
  components: {
    Header,
    AnimeDataSlider,
    AnimeData
  }
};
</script>