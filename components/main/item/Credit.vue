<template>
  <div>
    <v-divider></v-divider>
    <v-list>
      <v-list-item>
        <v-list-item-title class="user-follower-anime">About Myanime</v-list-item-title>
      </v-list-item>
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.to" router exact>
        <v-list-item-action>
          <v-icon>{{ item.ico }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.text" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div class="contact">Contact: admin@myanime.co</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Supported Browsers",
          ico: "mdi-speedometer",
          to: "/support-browsers"
        },
        {
          text: "Privacy Policy",
          ico: "mdi-information-variant",
          to: "/privacy-policy"
        }
      ]
    };
  }
};
</script>
<style scoped>
.contact {
  margin-left: 20px;
  color: #aaa;
}
</style>