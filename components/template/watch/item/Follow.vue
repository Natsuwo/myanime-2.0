<template>
  <v-flex>
    <v-btn color="red" @click="followAction" v-if="follow === null">
      Add to list
      <span class="count-followers">{{anime.followers}}</span>
    </v-btn>
    <div v-else>
      <v-btn color="purple" @click="unFollowAction">
        Remove to list
        <span class="count-followers">{{anime.followers}}</span>
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
          user_id: this.$store.state.auth.profile.user_id
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
          anime_id: this.anime.anime_id
        }
      };
      var response = await this.$store.dispatch("follow/unFollow", data);
      return this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
    }
  }
};
</script>
