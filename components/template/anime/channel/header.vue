<template>
  <v-layout class="anime-channel-header" row wrap align-center>
    <v-img class="anime-channel-banner" src="/library/upload/anime/cover/default.jpg"></v-img>
    <div class="anime-overlay"></div>
    <v-layout row wrap justify-center align-center>
      <div class="anime-channel-content">
        <div class="anime-channel-cover">
          <v-img width="184px" :src="data.thumbnail"></v-img>
        </div>
        <div class="anime-channel-details">
          <div class="anime-channel-title">{{data.title}}</div>
          <div class="anime-channel-studio">{{data.studio}}</div>
          <div
            class="anime-channel-description"
            :title="data.description"
            v-html="data.description"
          ></div>
          <div class="anime-channel-season">{{data.season}}</div>
          <div class="anime-channel-genre">
            <v-chip v-for="item in getTerm()" :key="item" class="ma-2" small label>{{item}}</v-chip>
          </div>
          <div class="anime-channel-follow">
            <abc :follow="follow" :anime="data" />
          </div>
        </div>
      </div>
    </v-layout>
  </v-layout>
</template>
<script>
import abc from "../../watch/item/Follow";
export default {
  components: {
    abc
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
      if (this.meata) {
        var genres = this.meta.find(x => x.meta_key === "genre").meta_value;
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