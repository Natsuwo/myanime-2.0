<template>
  <div class="player-left-content">
    <v-layout row wrap class="anime-player">
      <v-responsive :aspect-ratio="18/9">
        <Player :backup="episode.backup" :source="episode.source" :thumbnail="episode.thumbnail" />
      </v-responsive>
    </v-layout>
    <div
      class="pt-3 player-episode-title"
      v-html="`${anime.title} ${episode.title ? `- ${episode.title}` : `- Episode ${episode.number}`}`"
    ></div>
    <v-layout row wrap>
      <div class="views flex" style="display: inline;">{{viewFormater(episode.views)}} views</div>
      <v-spacer></v-spacer>
      <Vote :likes="episode.likes" :dislikes="episode.dislikes" :usermeta="usermeta" />
    </v-layout>
    <v-divider />
    <v-layout row wrap pt-3>
      <v-avatar class="player-fansub mr-3">
        <img :src="imgproxy(anime.thumbnail, 48)" alt="avatar-fansub" />
      </v-avatar>
      <div class="flex column">
        <span class="title fansub-title">
          <nuxt-link :to="`/anime/${anime.anime_id}`">{{anime.title}}</nuxt-link>
        </span>
        <div class="player-update-at">{{episode.updated_at | moment("from", "now")}}</div>
      </div>
      <Follow class="text-right" :follow="follow" :anime="anime" />
    </v-layout>
    <client-only>
      <Description :anime="anime" :episode="episode" :flags="flags" />
    </client-only>
    <v-divider />
    <Comment />
  </div>
</template>
<script>
import { proxyimg, viewFormater } from "@/plugins/helpers";
import Player from "./item/Player";
import Vote from "./item/Vote";
import Follow from "./item/Follow";
import Comment from "./item/Comment";
import Description from "./item/Description";
export default {
  props: ["episode", "usermeta", "flags", "anime"],
  components: {
    Player,
    Vote,
    Follow,
    Comment,
    Description
  },
  methods: {
    imgproxy(img, rs) {
      return proxyimg(img, rs);
    },
    viewFormater(view) {
      return viewFormater(view);
    }
  },
  computed: {
    follow() {
      if (this.usermeta.length === 0) {
        return null;
      }
      var index = this.usermeta.findIndex(x => x.meta_key === "follow");
      if (index >= 0) {
        return this.usermeta[index].meta_value;
      }
      return null;
    }
  }
};
</script>