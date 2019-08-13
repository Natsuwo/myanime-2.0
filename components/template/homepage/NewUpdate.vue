<template>
  <div class="recent-anime">
    <h2 class="anime-head-title">Recent Uploads</h2>
    <AnimeData :data="episodes" :flags="flags" :animes="animes" />
  </div>
</template>
<script>
import AnimeData from "./item/AnimeData";
export default {
  computed: {
    animes() {
      return this.$store.state.anime.animes
    },
    episodes() {
      return this.$store.state.episode.episodes.recent;
    },
    flags() {
      return this.$store.state.flags;
    }
  },
  components: {
    AnimeData
  }
};
</script>