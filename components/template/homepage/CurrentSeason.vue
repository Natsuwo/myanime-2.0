<template>
  <div class="recent-anime">
    <h2 class="anime-head-title">Current Season</h2>
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
