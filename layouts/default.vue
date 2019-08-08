<template>
  <v-app dark>
    <no-ssr>
      <AppBar />
    </no-ssr>
    <v-content>
      <v-container fuild grid-list-md>
        <SnackBar />
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/main/AppBar";
import SnackBar from "@/components/template/SnackBar";
export default {
  components: {
    AppBar,
    SnackBar
  }
};
</script>
