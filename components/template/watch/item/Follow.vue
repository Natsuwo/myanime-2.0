<template>
  <v-flex text-right>
    <v-snackbar
      left
      bottom
      v-model="snackbar"
      :timeout="4000"
      :color="messages.success ? 'green' : 'red'"
    >
      <span>{{messages.success ? messages.message : messages.error}}</span>
      <v-btn text @click="snackbar = false" color="white">Close</v-btn>
    </v-snackbar>
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
    <v-btn color="red" @click="followAction" v-if="!follow.follow">
      Follow
      <span class="count-followers">{{anime.followers}}</span>
    </v-btn>
    <div v-else>
      <v-btn color="#AAA" @click="unFollowAction">
        Unfollow
        <span class="count-followers">{{anime.followers}}</span>
      </v-btn>
      <v-btn small text icon @click="notiAction" v-if="!follow.noti">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn small text icon @click="unNotiAction" v-else>
        <v-icon>mdi-bell-ring-outline</v-icon>
      </v-btn>
    </div>
  </v-flex>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      snackbar: false,
      messages: ""
    };
  },
  props: ["follow", "anime"],
  methods: {
    async followAction() {
      if (!this.$store.state.auth.isLogin) {
        return (this.dialog = true);
      }
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          anime_id: this.anime.anime_id,
          user_id: this.$store.state.auth.user_id
        }
      };
      var response = await this.$store.dispatch("follow/follow", data);
      this.snackbar = true;
      this.messages = response.data;
    },
    async unFollowAction() {
      if (!this.$store.state.auth.isLogin) {
        return (this.dialog = true);
      }
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          anime_id: this.anime.anime_id,
          user_id: this.$store.state.auth.user_id
        }
      };
      var response = await this.$store.dispatch("follow/unFollow", data);
      this.snackbar = true;
      this.messages = response.data;
    },
    async notiAction() {
      if (!this.$store.state.auth.isLogin) {
        return (this.dialog = true);
      }
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          anime_id: this.anime.anime_id,
          user_id: this.$store.state.auth.user_id,
          isNoti: true
        }
      };
      var response = await this.$store.dispatch("follow/getNoti", data);
      this.snackbar = true;
      this.messages = response.data;
    },
    async unNotiAction() {
      if (!this.$store.state.auth.isLogin) {
        return (this.dialog = true);
      }
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          anime_id: this.anime.anime_id,
          user_id: this.$store.state.auth.user_id,
          isNoti: false
        }
      };
      var response = await this.$store.dispatch("follow/unNoti", data);
      this.snackbar = true;
      this.messages = response.data;
    },
    signIn() {
      this.$store.commit("signIn", true);
      this.dialog = false;
    }
  }
};
</script>
