<template>
  <div style="display: inline;">
    <v-dialog transition="slide-x-reverse-transition" v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline red lighten-1" primary-title>Sign in required!</v-card-title>
        <v-card-text class="pt-3">You must sign in to perform this action.</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="signIn">Sign In</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  data() {
    return {
      dialog: false,
      isLike: null
    };
  },
  created() {
    if (this.$store.state.auth.isLogin) {
      return (this.isLike = this.$store.state.episode.episode.user_vote);
    }
  },
  computed: {
    percent() {
      var likes = this.likes;
      var total = this.likes + this.dislikes;
      return (likes * 100) / total || 0;
    }
  },
  methods: {
    async like() {
      if (!this.$store.state.auth.isLogin) {
        return (this.dialog = true);
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

      if (this.isLike === null) {
        this.isLike = true;
        return this.$store.dispatch("vote/add", data);
      }
      if (this.isLike === false) {
        this.isLike = true;
        return this.$store.dispatch("vote/like", data);
      }
      this.isLike = null;
      return this.$store.dispatch("vote/unlike", data);
    },
    async dislike() {
      if (!this.$store.state.auth.isLogin) {
        return (this.dialog = true);
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

      if (this.isLike === null) {
        this.isLike = false;
        return this.$store.dispatch("vote/add", data);
      }
      if (this.isLike) {
        this.isLike = false;
        return this.$store.dispatch("vote/dislike", data);
      }
      this.isLike = null;
      return this.$store.dispatch("vote/unlike", data);
    },
    signIn() {
      this.$store.commit("signIn", true);
      this.dialog = false;
    }
  }
};
</script>
