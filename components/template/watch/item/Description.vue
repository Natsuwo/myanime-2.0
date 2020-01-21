<template>
  <div class="description-anime">
    <div
      v-if="!isShow"
      class="player-description pt-3"
      v-html="$options.filters.truncate(anime.description, 300, '...')"
    ></div>
    <div v-else class="player-description py-2 clearfix">
      <div class="description" v-html="anime.description"></div>
      <div class="anime-info pt-10">
        <div class="anime-cover">
          <v-img :lazy-src="anime.thumbnail" :src="anime.thumbnail"></v-img>
        </div>
        <div class="anime-info-content" v-for="item in animeInfo" :key="item.key">
          <div v-if="hideKeyDes" class="title-name">{{item.key}}</div>
          <div class="title-content" v-html="item.value"></div>
        </div>
      </div>
    </div>
    <div v-if="!isShow" class="player-show-more" @click="isShow = !isShow">Show more</div>
    <div v-else class="player-show-more pt-3" @click="isShow = !isShow">Show less</div>
  </div>
</template>
<script>
export default {
  props: ["episode", "anime", "flags"],
  data() {
    return {
      isShow: false
    };
  },
  filters: {
    truncate: function(text, length, suffix) {
      if (text && text.length > 0) return text.substring(0, length) + suffix || "";
    }
  },
  computed: {
    animeInfo() {
      return [
        { key: "title", value: this.anime.title },
        { key: "premiered", value: this.anime.premiered },
        { key: "rating", value: this.anime.rating },
        { key: "status", value: this.anime.status },
        { key: "fansub", value: this.episode.fansub },
        {
          key: "audio",
          value: `<img width="18px" src="${this.getFlag(
            this.episode.audio
          )}" />`
        },
        {
          key: "subtitle",
          value: `<img width="18px" src="${this.getFlag(
            this.episode.subtitle
          )}" />`
        }
      ];
    },
    hideKeyDes() {
      return this.$vuetify.breakpoint.smAndUp;
    }
  },
  methods: {
    getFlag(lang) {
      return this.flags
        .filter(x => x.key === lang)
        .map(x => x.value)
        .toString();
    }
  }
};
</script>
