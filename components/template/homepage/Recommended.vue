<template>
  <div class="recent-anime">
    <h2 class="anime-head-title">Recommended</h2>
    <AnimeSlider />
  </div>
</template>
<script>
import AnimeSlider from "./item/AnimeDataSlider";
export default {
  components: {
    AnimeSlider
  }
};
</script>
