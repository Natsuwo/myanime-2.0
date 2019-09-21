<template>
  <v-flex>
    <v-btn color="red" @click="followAction" v-if="follow === null">
      Save
      <span class="count-followers">{{anime.followers}}</span>
    </v-btn>
    <div v-else>
      <v-btn color="purple" @click="unFollowAction">
        Delete
        <span class="count-followers">{{anime.followers}}</span>
      </v-btn>
    </div>
  </v-flex>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
export default {
  props: ["follow", "anime"],
  data() {
    return {
      headers: {
        "X-User-Session": this.$store.state.auth.userToken
      }
    };
  },
  methods: {
    ...mapMutations("snackbar", ["snackBar"]),
    ...mapMutations("dialog", ["signIn"]),
    ...mapActions("follow", ["setFollow", "setUnfollow"]),
    async followAction() {
      if (!this.$store.state.auth.isLogin) {
        return this.$store.commit("dialog/signIn", true);
      }
      var data = {
        headers: this.headers,
        form: {
          anime_id: this.anime.anime_id,
          user_id: this.$store.state.auth.profile.user_id
        }
      };
      var response = await this.setFollow(data);
      return this.snackBar({ active: true, message: response.data });
    },
    async unFollowAction() {
      if (!this.$store.state.auth.isLogin) {
        return this.$store.commit("dialog/signIn", true);
      }
      var data = {
        headers: this.headers,
        form: {
          anime_id: this.anime.anime_id
        }
      };
      var response = await this.setUnfollow(data);
      return this.snackBar({ active: true, message: response.data });
    }
  }
};
</script>