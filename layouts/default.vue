<template>
  <v-app dark>
    <no-ssr>
      <AppBar />
    </no-ssr>
    <v-content>
      <v-container fuild grid-list-md>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/main/AppBar";
export default {
  components: {
    AppBar
  }
};
</script>
