<template>
  <v-app dark>
    <no-ssr>
      <AppBar />
    </no-ssr>
    <v-content>
      <v-container fluid>
        <DialogSignIn />
        <SnackBar />
        <v-container fluid row grid-list-xl fill-height>
          <v-layout row warp justify-center v-if="$store.state.auth.isLogin">
            <v-flex xs12 md3>
              <v-navigation-drawer width="100%" permanent>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="title">Options</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list dense nav>
                  <v-list-item v-for="item in items" :key="item.title" :to="item.to" router exact>
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-flex>
            <v-flex xs12 md9>
            <nuxt />
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import DialogSignIn from "@/components/template/dialog/requireSignIn";
import SnackBar from "@/components/template/SnackBar";
import AppBar from "@/components/main/AppBarWatch";
export default {
  data() {
    return {
      items: [
        { title: "Profile", icon: "mdi-account", to: "/user/profile" },
        { title: "My lists", icon: "mdi-library-movie", to: "/user/profile/lists" }
      ]
    };
  },
  components: {
    AppBar,
    DialogSignIn,
    SnackBar
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
