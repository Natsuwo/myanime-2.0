<template>
  <v-app dark>
    <no-ssr>
      <AppBar />
    </no-ssr>
    <v-content>
      <SnackBar />
      <DialogSignIn />
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/main/AppBar";
import SnackBar from "@/components/template/SnackBar";
import DialogSignIn from "@/components/template/dialog/requireSignIn";
export default {
  components: {
    AppBar,
    SnackBar,
    DialogSignIn
  }
};
</script>
