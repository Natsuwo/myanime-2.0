<template>
  <v-app dark>
    <client-only>
      <AppBar />
    </client-only>
    <v-content>
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
export default {
  components: {
    AppBar,
    SnackBar,
    DialogSignIn
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
