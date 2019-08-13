<template>
  <div class="anime-channel">
    <Header :data="anime" :meta="animemetas" :terms="terms" :usermeta="usermeta" />
    <v-layout row wrap align-center>
      <div class="container fuild">
        <div class="myanime-home anime-channel-container">
          <h2>Most viewed</h2>
          <AnimeDataSlider :data="mostViews" :anime="anime" :flags="flags" class="py-2" />
          <h2>New uploaded</h2>
          <AnimeDataSlider :data="newUploads" :anime="anime" :flags="flags" class="py-2" />
          <h2>All</h2>
          <AnimeData :data="AllEpisodes" :anime="anime" :flags="flags" class="pa-2" />
        </div>
      </div>
    </v-layout>
  </div>
</template>
<script>
import AnimeDataSlider from "@/components/template/channel/item/AnimeDataSlider";
import AnimeData from "@/components/template/channel/item/AnimeData";
import Header from "@/components/template/anime/channel/header";
import { getChannel } from "@/services/Anime";
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
    await store.dispatch("anime/animeTermData", response.terms);
    await store.dispatch("episode/episodesData", response.episodes);
    if (store.state.auth.isLogin) {
      await store.dispatch("auth/userMetaData", response.usermeta);
    }
  },
  computed: {
    episodes() {
      return this.$store.state.episode.episodes;
    },
    AllEpisodes() {
      return this.episodes.all
    },
    mostViews() {
      return this.episodes.most;
    },
    newUploads() {
      return this.episodes.new
    },
    anime() {
      return this.$store.state.anime.anime;
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
  components: {
    Header,
    AnimeDataSlider,
    AnimeData
  }
};
</script>