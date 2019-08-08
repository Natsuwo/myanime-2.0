<template>
  <div style="display: inline;">
    <span :class="`player-thumb_up ${isLike === true ? 'active' : ''}`" @click="like">
      <v-btn small icon text>
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>
      <span class="player-thumb_up number">{{likes}}</span>
    </span>
    <span :class="`player-thumb_down ${isLike === false ? 'active' : ''}`" @click="dislike">
      <v-btn small icon text>
        <v-icon>mdi-thumb-down</v-icon>
      </v-btn>
      <span class="player-thumb_down number">{{dislikes}}</span>
    </span>
    <span class="player-report pl-4">
      <v-btn text icon small>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </span>
    <v-progress-linear height="2" style="width: 120px;" :value="percent"></v-progress-linear>
  </div>
</template>
<script>
export default {
  props: ["likes", "dislikes"],
  computed: {
    percent() {
      var likes = this.likes;
      var total = this.likes + this.dislikes;
      return (likes * 100) / total || 0;
    },
    usermeta() {
      return this.$store.state.episode.episode.usermeta;
    },
    isLike() {
      if (this.$store.state.auth.isLogin) {
        return (
          this.usermeta
            .filter(x => {
              return x.meta_key === "vote";
            })
            .map(x => x.meta_value)[0]
        );
      }
      return null;
    }
  },
  methods: {
    async like() {
      if (!this.$store.state.auth.isLogin) {
        return this.$store.commit("dialog/signIn", true)
      }
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          episode_id: this.$route.query.a,
          user_id: this.$store.state.auth.user_id,
          isLike: true
        }
      };
      if (this.isLike === undefined) {
        return this.$store.dispatch("vote/add", data);
      }
      if (this.isLike === false) {
        return this.$store.dispatch("vote/like", data);
      }
      return this.$store.dispatch("vote/unlike", data);
    },
    async dislike() {
      if (!this.$store.state.auth.isLogin) {
        return this.$store.commit("dialog/signIn", true)
      }
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          episode_id: this.$route.query.a,
          user_id: this.$store.state.auth.user_id,
          isLike: false
        }
      };
      if (this.isLike === undefined) {
        return this.$store.dispatch("vote/add", data);
      }
      if (this.isLike) {
        return this.$store.dispatch("vote/dislike", data);
      }
      return this.$store.dispatch("vote/unlike", data);
    },
    signIn() {
      this.$store.commit("signIn", true);
      return this.$store.commit("dialog/signIn", false)
    }
  }
};
</script>
