<template>
  <v-app dark>
    <no-ssr>
      <AppBar />
    </no-ssr>
    <v-content>
      <v-container fuild grid-list-md>
        <DialogSignIn />
        <SnackBar />
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import DialogSignIn from "@/components/template/dialog/requireSignIn";
import SnackBar from "@/components/template/SnackBar";
import AppBar from "@/components/main/AppBarWatch";
export default {
  components: {
    AppBar,
    DialogSignIn,
    SnackBar
  },
};
</script>
