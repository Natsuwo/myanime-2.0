<template>
  <v-container class="page">
    <v-layout wrap>
      <v-flex px-0 xs12 sm6 md4 v-for="(item, i) in items" :key="i">
        <v-card class="pa-2" outlined tile light>
          <v-list-item>
            <v-list-item-avatar :color="item.sp ? 'success' : 'error'">
              <v-icon class="browser-icon--split">{{item.icon}}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{item.text}}</v-list-item-title>
              <v-list-item-subtitle>{{item.sp ? "Supported" : "Not supported"}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  head() {
    return {
      titleTemplate: "%s - " + this.settings.site_title,
      title: "Support Browsers",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.settings.descriptions
        }
      ]
    };
  },
  computed: {
    ...mapState(["settings"])
  },
  data() {
    return {
      items: [
        {
          text: "Chromium (Chrome, Edge Insider)",
          icon: "mdi-google-chrome",
          sp: true
        },
        {
          text: "Firefox",
          icon: "mdi-firefox",
          sp: true
        },
        {
          text: "Edge",
          icon: "mdi-edge",
          sp: true
        },
        {
          text: "Safari 10+",
          icon: "mdi-apple-safari",
          sp: true
        },
        {
          text: "Safari 9 or lower",
          icon: "mdi-apple-safari",
          sp: false
        },
        {
          text: "IE",
          icon: "mdi-internet-explorer",
          sp: false
        }
      ]
    };
  }
};
</script>
<style scoped>
.page {
  max-width: 1185px !important;
}
</style>