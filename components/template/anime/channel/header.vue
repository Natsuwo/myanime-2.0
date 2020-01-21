<template>
  <v-layout class="anime-channel-header" row wrap align-center>
    <v-img class="anime-channel-banner" :lazy-src="data.cover  || '/default-cover.jpg'" :src="data.cover || '/default-cover.jpg'"></v-img>
    <div class="anime-overlay"></div>
    <v-layout row wrap justify-center align-center>
      <div class="anime-channel-content">
        <div class="anime-channel-cover">
          <v-img width="184px" :lazy-src="data.thumbnail" :src="data.thumbnail"></v-img>
        </div>
        <div class="anime-channel-details">
          <div class="anime-channel-title">{{data.title}}</div>
          <div class="anime-channel-studio">{{data.studio}}</div>
          <div
            class="anime-channel-description"
            :title="data.description"
            v-html="data.description"
          ></div>
          <div class="anime-channel-season">
            <nuxt-link :to="`/season/${data.season}`">{{data.season}}</nuxt-link>
          </div>
          <div class="anime-channel-genre">
            <v-chip v-for="item in getTerm()" :key="item" class="ma-2" small label>{{item}}</v-chip>
          </div>
          <div class="anime-channel-follow">
            <Follow :follow="follow" :anime="data" />
          </div>
        </div>
      </div>
    </v-layout>
  </v-layout>
</template>
<script>
import Follow from "../../watch/item/Follow";
export default {
  components: {
    Follow
  },
  props: ["data", "meta", "terms", "usermeta"],
  computed: {
    follow() {
      if (this.usermeta.length === 0) {
        return null;
      }
      return this.usermeta[0].meta_value;
    }
  },
  methods: {
    getTerm(key) {
      var meta = this.meta.find(x => x.meta_key === "genre");
      if (meta) {
        var genres =
          this.meta.find(x => x.meta_key === "genre").meta_value || [];
        var terms = [];
        for (var item of genres) {
          var term = this.terms
            .filter(x => x.term_id === parseInt(item))
            .map(x => x.key)
            .join();
          terms.push(term);
        }
        return terms;
      }
    }
  }
};
</script>