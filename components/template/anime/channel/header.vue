<template>
  <v-layout class="anime-channel-header" row wrap align-center>
    <v-img class="anime-channel-banner" src="https://i.ytimg.com/vi/2rPxChaPC2E/maxresdefault.jpg"></v-img>
    <div class="anime-overlay"></div>
    <div class="anime-channel-content row">
      <div class="anime-channel-cover">
        <v-img width="184px" :src="data.thumbnail"></v-img>
      </div>
      <div class="anime-channel-details">
        <div class="anime-channel-title">{{data.title}}</div>
        <div class="anime-channel-studio">{{getTerm('studio')}}</div>
        <div class="anime-channel-description" :title="data.description">{{data.description}}</div>
        <div class="anime-channel-season">{{getTerm('season')}}</div>
        <div class="anime-channel-genre">
          <v-chip v-for="item in getGenre('genre')" :key="item" class="ma-2" small label>{{item}}</v-chip>
        </div>
        <div class="anime-channel-follow">
          <abc :follow="follow" :anime="data" />
        </div>
      </div>
    </div>
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
      return (
        this.terms
          .filter(x => x.type === key)
          .map(x => x.key)
          .toString() || ""
      );
    },
    getGenre(key) {
      return this.terms.filter(x => x.type === key).map(x => x.key) || "";
    }
  }
};
</script>