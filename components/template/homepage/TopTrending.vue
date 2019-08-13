<template>
  <div class="recent-anime">
    <h2 class="anime-head-title">Top Trending</h2>
    <AnimeSlider :data="episodes" :flags="flags" :animes="animes" />
  </div>
</template>
<script>
import AnimeSlider from "./item/AnimeDataSlider";
export default {
  computed: {
    animes() {
      return this.$store.state.anime.animes;
    },
    episodes() {
      return this.$store.state.episode.episodes.random;
    },
    flags() {
      return this.$store.state.flags;
    }
  },
  components: {
    AnimeSlider
  }
};
</script>
