<template>
  <div class="sidebar">
    <div class="sidebar-playlist">
      <v-card flat>
        <div class="player-playlist-header pa-4">
          <div style="float: right;">
            <v-img width="40" :src="getFlag(episode.subtitle)"></v-img>
          </div>
          <div class="player-playlist-title">{{anime.title}}</div>
          <div class="player-playlist-fansub-title">
            <div class="episode-select">
              {{episode.fansub}} -
              <div class="esbox">
                <input
                  v-on:keyup.enter="findEp(episode.anime_id, number, episode.fansub)"
                  class="jump-ep"
                  type="number"
                  v-model="number"
                  min="0"
                  :max="total"
                />
                <div class="play-button" @click="findEp(episode.anime_id, number, episode.fansub)">
                  <i class="mdi mdi-play"></i>
                </div>
                <div class="total-epsiode">/{{total}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="player-playlist-video">
          <div
            :class="'layout align-center player-playlist py-2 px-3 ep-' +item.episode_id"
            v-for="item in playList"
            :key="item.episode_id"
          >
            <div class="player-sidebar">
              <nuxt-link :to="`/watch?a=${item.episode_id}`">
                <div class="player-sidebar-thumbnail">
                  <v-img width="168px" :src="item.thumbnail"></v-img>
                  <div class="now-playing" v-if="$route.query.a === item.episode_id">Now Playing</div>
                </div>
                <div class="player-sidebar-right-content column">
                  <div class="player-sidebar-title">{{anime.title}} {{item.number}}</div>
                  <div class="player-sidebar-fansub-name">{{item.fansub}}</div>
                  <div class="player-sidebar-views">{{item.views}} views</div>
                </div>
              </nuxt-link>
            </div>
          </div>
          <v-btn
            v-if="total !== playList.length"
            block
            @click="loadmore"
            :loading="loading"
          >Load more</v-btn>
        </div>
      </v-card>
    </div>
    <Banner300 />
    <h3 class="py-2">May you like</h3>
    <div class="player-sidebar py-1" v-for="item in random" :key="item.data.episode_id">
      <nuxt-link :to="`/watch?a=${item.data.episode_id}`">
        <div class="player-sidebar-thumbnail">
          <v-img width="168px" :src="item.data.thumbnail"></v-img>
          <div class="search-overlay">
            <div class="multiple-episode">
              <div class="count">{{item.data.count}}</div>
              <v-icon>mdi-playlist-play</v-icon>
            </div>
          </div>
        </div>
        <div class="player-sidebar-right-content column">
          <div class="player-sidebar-title">{{item.anime.title}} {{item.data.number}}</div>
          <div class="player-sidebar-fansub-name">{{item.data.fansub}}</div>
          <div class="player-sidebar-views">{{item.data.views}} views</div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { sidebarLoadmore, jumpEpisode } from "@/services/Episode";
import Banner300 from "@/components/main/item/300x250";
import { mapMutations } from "vuex";
export default {
  components: {
    Banner300
  },
  props: ["flags", "episode", "sidebar", "anime"],
  data() {
    return {
      skip: 24,
      number: 0,
      loading: false
    };
  },
  computed: {
    playList() {
      return this.sidebar.playList;
    },
    random() {
      return this.sidebar.animeRandom;
    },
    total() {
      return this.sidebar.total;
    }
  },
  mounted() {
    this.number = this.episode.number;
    var id = this.$route.query.a;
    var currentEp = this.$el.getElementsByClassName("ep-" + id)[0];
    if (currentEp) {
      currentEp.scrollIntoView();
    }
  },
  methods: {
    ...mapMutations("snackbar", ["snackBar"]),
    async findEp(anime_id, number, fansub) {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var resp = await jumpEpisode(headers, anime_id, number, fansub);
      if (resp.data.success) {
        this.$router.push({ path: "/watch?a=" + resp.data.result });
      } else {
        this.snackBar({ active: true, message: resp.data });
      }
    },
    getFlag(lang) {
      return this.flags
        .filter(x => x.key === lang)
        .map(x => x.value)
        .toString();
    },
    async loadmore() {
      this.loading = true;
      var headers = { "x-user-session": this.$store.state.auth.userToken };
      var episode_id = this.$route.query.a;
      var response = await sidebarLoadmore(headers, episode_id, this.skip);
      if (response.data.success) {
        this.$store.dispatch("episode/sidebarLoadmore", response.data);
        this.skip += 24;
        this.loading = false;
      }
    }
  },
  watch: {
    "episode.number"() {
      this.number = this.episode.number;
    }
  }
};
</script>