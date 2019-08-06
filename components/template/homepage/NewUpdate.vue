<template>
  <div class="recent-anime">
    <h2 class="anime-head-title">Recent Uploads</h2>
    <AnimeData :data="episodes" />
  </div>
</template>
<script>
import AnimeData from "./item/AnimeData";
export default {
  computed: {
    episodes() {
      return this.$store.state.episode.episodes;
    }
  },
  components: {
    AnimeData
  }
};
</script>