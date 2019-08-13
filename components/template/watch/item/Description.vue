<template>
  <div class="description-anime">
    <div
      v-if="!isShow"
      class="player-description pt-3"
    >{{anime.description | truncate(300, '...')}}</div>
    <div v-else class="player-description py-2 clearfix">
      {{anime.description}}
      <div class="anime-info pt-10">
        <div class="anime-cover">
          <v-img :src="anime.thumbnail"></v-img>
        </div>
        <div class="anime-info-content" v-for="item in animeInfo" :key="item.key">
          <div class="title-name">{{item.key}}</div>
          <div class="title-content">{{item.value}}</div>
        </div>
      </div>
    </div>
    <div v-if="!isShow" class="player-show-more" @click="isShow = !isShow">Show more</div>
    <div v-else class="player-show-more pt-3" @click="isShow = !isShow">Show less</div>
  </div>
</template>
<script>
export default {
  props: ["episode", "anime"],
  data() {
    return {
      isShow: false
    };
  },
  filters: {
    truncate: function(text, length, suffix) {
      return text.substring(0, length) + suffix;
    }
  },
  computed: {
    animeInfo() {
      return [
        { key: "title", value: this.anime.title },
        { key: "premiered", value: this.anime.premiered },
        { key: "rating", value: this.anime.rating },
        { key: "status", value: this.anime.status }
      ];
    }
  }
};
</script>
