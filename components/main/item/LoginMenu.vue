<template>
  <v-menu
    transition="slide-x-transition"
    offset-y
    bottom
    left
    :nudge-width="100"
    :nudge-bottom="10"
  >
    <template v-slot:activator="{ on }">
      <v-btn dark icon v-on="on">
        <v-avatar>
          <v-img :lazy-src="avatar" :src="avatar"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-btn text block to="/user/profile">
          <v-icon class="pr-2">mdi-account</v-icon>Profile
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn text block @click="signOut">
          <v-icon class="pr-2">mdi-exit-to-app</v-icon>Logout
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { signOut } from "@/services/Auth";
export default {
  computed: {
    avatar() {
      return this.$store.state.auth.profile.avatar || "/default-avatar.png";
    }
  },
  methods: {
    async signOut() {
      this.$store.commit("auth/setAuth", false);
      return this.$cookies.remove("USER_ACCESS_TOKEN");
    }
  }
};
</script>
