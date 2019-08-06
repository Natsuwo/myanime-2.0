<template>
  <div class="player-left-content">
    <v-layout row wrap class="anime-player">
      <v-responsive :aspect-ratio="18/9">
        <Player :source="episode.source" />
      </v-responsive>
    </v-layout>
    <div
      class="pt-3 player-episode-title"
    >{{`${episode.anime.title} ${episode.number} ${!episode.title ? '' : '- ' + episode.title}`}}</div>
    <v-layout row wrap>
      <div class="views flex" style="display: inline;">{{episode.views}} views</div>
      <v-spacer></v-spacer>
      <Vote :likes="episode.likes" :dislikes="episode.dislikes" />
    </v-layout>
    <v-divider />
    <v-layout row wrap pt-3>
      <v-avatar class="player-fansub mr-3">
        <img :src="episode.anime.thumbnail" alt="avatar-fansub" />
      </v-avatar>
      <div class="flex column">
        <span class="player-fansub-title">
          <nuxt-link :to="`/anime/${episode.anime.anime_id}`">
            {{episode.anime.title}}
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
      <Follow :follow="this.episode.user_follow" :anime="this.episode.anime" />
    </v-layout>
    <div class="player-description pt-3">{{episode.description}}</div>
    <v-layout class="player-anime-card" row wrap my-3>
      <v-flex>
        <v-card>
          <div class="layout row wrap">
            <div class="player-anime-thumbnail mr-3">
              <v-img :src="episode.anime.thumbnail" alt="anime-thumbnail" width="70px"></v-img>
            </div>
            <div class="flex player-anime-card-container mt-3">
              <div class="player-anime-card-container-title">{{episode.anime.title}}</div>
              <div class="player-anime-card-container-year">{{episode.anime.premiered}}</div>
              <div class="player-anime-card-container-show-more">Show all</div>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
    <v-divider />
    <Comment />
  </div>
</template>
<script>
import Player from "./item/Player";
import Vote from "./item/Vote";
import Follow from "./item/Follow";
import Comment from "./item/Comment";
import { likeEpisode } from "@/services/Episode";
export default {
  components: {
    Player,
    Vote,
    Follow,
    Comment
  },
  computed: {
    episode() {
      return this.$store.state.episode.episode;
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>