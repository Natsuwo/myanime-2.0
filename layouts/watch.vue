<template>
  <v-app dark>
    <client-only>
      <AppBar />
    </client-only>
    <v-content>
      <v-container fuild grid-list-md>
        <v-alert type="info" elevation="2" v-if="settings.noti">{{settings.noti}}</v-alert>
        <DialogSignIn />
        <SnackBar />
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import DialogSignIn from "@/components/template/dialog/requireSignIn";
import SnackBar from "@/components/template/SnackBar";
import AppBar from "@/components/main/AppBarWatch";
import { mapState } from "vuex";
export default {
  components: {
    AppBar,
    DialogSignIn,
    SnackBar
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
