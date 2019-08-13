<template>
  <div class="player-left-content">
    <v-layout row wrap class="anime-player">
      <v-responsive :aspect-ratio="18/9">
        <Player :source="episode.source" />
      </v-responsive>
    </v-layout>
    <div
      class="pt-3 player-episode-title"
    >{{`${anime.title} - Ep.${episode.number} ${!episode.title ? '' : '- ' + episode.title}`}}</div>
    <v-layout row wrap>
      <div class="views flex" style="display: inline;">{{episode.views}} views</div>
      <v-spacer></v-spacer>
      <Vote :likes="episode.likes" :dislikes="episode.dislikes" :usermeta="usermeta" />
    </v-layout>
    <v-divider />
    <v-layout row wrap pt-3>
      <v-avatar class="player-fansub mr-3">
        <img :src="anime.thumbnail" alt="avatar-fansub" />
      </v-avatar>
      <div class="flex column">
        <span class="title fansub-title">
          <nuxt-link :to="`/anime/${anime.anime_id}`">
            {{episode.fansub}}
            <v-img width="18px" class="anime-flag" :src="getFlag(episode.subtitle)"></v-img>
            <!-- <v-tooltip right v-if="episode.fansub.trusted">
              <template v-slot:activator="{ on }">
                <v-icon dark v-on="on" class="fansub-verify" size="14px">mdi-check-circle</v-icon>
              </template>
              <span>Trusted fansub</span>
            </v-tooltip>-->
          </nuxt-link>
        </span>
        <div class="player-update-at">{{episode.updated_at | moment("from", "now")}}</div>
      </div>
      <Follow class="text-right" :follow="follow" :anime="anime" />
    </v-layout>
    <Description :anime="anime" :episode="episode" />
    <v-divider />
    <Comment />
  </div>
</template>
<script>
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
  },
  methods: {
    getFlag(lang) {
      return this.flags
        .filter(x => x.key === lang)
        .map(x => x.value)
        .toString();
    }
  },
  watch: {
    "$store.state.auth.isLogin"(val) {
      if (val) {
        var data = {
          headers: {
            "X-User-Session": this.$store.state.auth.userToken
          },
          episode_id: this.episode.episode_id,
          anime_id: this.episode.anime_id
        };
        this.$store.dispatch("episode/getUserMeta", data);
      }
    }
  }
};
</script>