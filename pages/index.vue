<template>
  <div class="myanime-home">
    <NewUpdate />
    <Recommended />
    <CurrentSeason />
    <TopTrending />
  </div>
</template>
<script>
import NewUpdate from "@/components/template/homepage/NewUpdate";
import Recommended from "@/components/template/homepage/Recommended";
import CurrentSeason from "@/components/template/homepage/CurrentSeason";
import TopTrending from "@/components/template/homepage/TopTrending";
export default {
  async fetch({ store, params }) {
    await store.dispatch("episode/getEpisodes");
  },
  components: {
    NewUpdate,
    Recommended,
    CurrentSeason,
    TopTrending
  }
};
</script>

