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
          <v-img src="https://i.imgur.com/N5SvkzK.jpg"></v-img>
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
  methods: {
    async signOut() {
      await signOut();
      this.$store.commit("setAuth", false);
    }
  }
};
</script>
