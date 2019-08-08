<template>
  <v-flex text-right>
    <v-btn color="red" @click="followAction" v-if="follow === null">
      Follow
      <span class="count-followers">{{anime.followers}}</span>
    </v-btn>
    <div v-else>
      <v-btn color="purple" @click="unFollowAction">
        Unfollow
        <span class="count-followers">{{anime.followers}}</span>
      </v-btn>
      <v-btn small text icon @click="notiAction" v-if="!follow">
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
  props: ["follow", "anime"],
  methods: {
    async followAction() {
      if (!this.$store.state.auth.isLogin) {
        return this.$store.commit("dialog/signIn", true);
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
      return this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
    },
    async unFollowAction() {
      if (!this.$store.state.auth.isLogin) {
        return this.$store.commit("dialog/signIn", true);
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
      return this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
    },
    async notiAction() {
      if (!this.$store.state.auth.isLogin) {
        return this.$store.commit("dialog/signIn", true);
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
      return this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
    },
    async unNotiAction() {
      if (!this.$store.state.auth.isLogin) {
        return this.$store.commit("dialog/signIn", true);
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
      return this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
    }
  }
};
</script>
