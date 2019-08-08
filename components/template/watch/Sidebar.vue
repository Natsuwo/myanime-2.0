<template>
  <div class="sidebar">
    <div class="sidebar-playlist">
      <v-card flat>
        <div class="player-playlist-header pa-4">
          <div style="float: right;">
            <v-img width="40" :src="getFlag(subtitle)"></v-img>
          </div>
          <div class="player-playlist-title">{{anime.title}}</div>
          <div
            class="player-playlist-fansub-title"
          >{{fansub}} - {{currentEp($route.query.a)}}/{{recent.length}}</div>
        </div>
        <div class="player-playlist-video">
          <div
            class="layout align-center player-playlist py-2 px-3"
            v-for="item in recent"
            :key="item.episode_id"
          >
            <div class="player-sidebar">
              <nuxt-link :to="`/watch?a=${item.episode_id}`">
                <div class="player-sidebar-thumbnail">
                  <v-img width="168px" src="https://www.myanime.co/file/cache/Ksu4I29-320x180.png"></v-img>
                </div>
                <div class="player-sidebar-right-content column">
                  <div class="player-sidebar-title">{{anime.title}} {{item.number}}</div>
                  <div class="now-playing" v-if="$route.query.a === item.episode_id">Now Playing</div>
                  <div class="player-sidebar-fansub-name">{{fansub}}</div>
                  <div class="player-sidebar-views">{{item.views}} views</div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <h3 class="py-2">May you like</h3>
    <div class="player-sidebar py-1" v-for="item in random" :key="item.data.episode_id">
      <nuxt-link :to="`/watch?a=${item.data.episode_id}`">
        <div class="player-sidebar-thumbnail">
          <v-img width="168px" src="https://www.myanime.co/file/cache/Ksu4I29-320x180.png"></v-img>
        </div>
        <div class="player-sidebar-right-content column">
          <div class="player-sidebar-title">{{item.anime.title}} {{item.data.number}}</div>
          <div class="player-sidebar-fansub-name">{{getFansub(item.meta)}}</div>
          <div class="player-sidebar-views">{{item.data.views}} views</div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    sidebar() {
      return this.$store.state.episode.sidebar;
    },
    recent() {
      return this.sidebar.rencent;
    },
    fansub() {
      return this.sidebar.meta
        .filter(x => x.meta_key === "fansub")
        .map(x => x.meta_value)
        .toString();
    },
    subtitle() {
      return this.sidebar.meta
        .filter(x => x.meta_key === "subtitle")
        .map(x => x.meta_value)
        .toString();
    },
    flags() {
      return this.sidebar.flags;
    },
    random() {
      return this.sidebar.randomEp;
    },
    anime() {
      return this.$store.state.episode.episode.anime;
    }
  },
  methods: {
    currentEp(id) {
      return this.recent
        .filter(x => x.episode_id === id)
        .map(x => x.number)
        .toString();
    },
    getFansub(item) {
      return item
        .filter(x => x.meta_key === "fansub")
        .map(x => x.meta_value)
        .toString();
    },
    getFlag(lang) {
      return this.flags
        .filter(x => x.key === lang)
        .map(x => x.value)
        .toString();
    }
  }
};
</script>

<style scoped>
.now-playing {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  line-height: 100px;
  text-align: center;
  font-size: 18px;
}
.player-sidebar a {
  display: inline-flex;
  text-decoration: none;
  color: #fff;
}
.playlist-playlist-right-title {
  width: 100%;
}

.player-playlist-video-title {
  display: -webkit-box;
  max-height: 3.2rem;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  line-height: 20px;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
}
</style>
