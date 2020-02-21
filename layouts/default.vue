<template>
  <v-app dark>
    <client-only>
      <AppBar />
    </client-only>
    <v-content>
      <v-container fluid>
        <v-alert type="info" elevation="2" v-if="settings.noti">{{settings.noti}}</v-alert>
      </v-container>
      <SnackBar />
      <DialogSignIn />
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/main/AppBarWatch";
import SnackBar from "@/components/template/SnackBar";
import DialogSignIn from "@/components/template/dialog/requireSignIn";
import { mapState } from "vuex";
export default {
  components: {
    AppBar,
    SnackBar,
    DialogSignIn
  },
  computed: {
    ...mapState(["settings"])
  },
  watch: {
    "$store.state.auth.isLogin"(val) {
      this.$router.go({
        path: "/a/1",
        force: true
      });
    }
  }
};
</script>
