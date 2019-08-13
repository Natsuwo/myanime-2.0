<template>
  <div class="sidebar">
    <div class="sidebar-playlist" v-if="sidebar.total > 1">
      <v-card flat>
        <div class="player-playlist-header pa-4">
          <div style="float: right;">
            <v-img width="40" :src="getFlag(episode.subtitle)"></v-img>
          </div>
          <div class="player-playlist-title">{{anime.title}}</div>
          <div
            class="player-playlist-fansub-title"
          >{{episode.fansub}} - {{currentEp($route.query.a)}}/{{playList.length}}</div>
        </div>
        <div class="player-playlist-video">
          <div
            class="layout align-center player-playlist py-2 px-3"
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
        </div>
      </v-card>
    </div>
    <h3 class="py-2">May you like</h3>
    <div class="player-sidebar py-1" v-for="item in random" :key="item.data.episode_id">
      <nuxt-link :to="`/watch?a=${item.data.episode_id}`">
        <div class="player-sidebar-thumbnail">
          <v-img width="168px" :src="item.data.thumbnail"></v-img>
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
export default {
  props: ["flags", "episode", "sidebar", "anime"],
  computed: {
    playList() {
      return this.sidebar.playList;
    },
    random() {
      return this.sidebar.animeRandom;
    }
  },
  methods: {
    currentEp(id) {
      return this.playList
        .filter(x => x.episode_id === id)
        .map(x => x.number)
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
.player-sidebar-thumbnail {
  position: relative;
}
.now-playing {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  line-height: 90px;
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
