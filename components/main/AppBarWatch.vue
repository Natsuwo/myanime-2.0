<template>
  <span>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :temporary="temporary"
      clipped
      fixed
      app
    >
      <v-list-item class="px-1 h-64">
        <v-btn class="i-48" icon @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <nuxt-link class="ml-5" to="/">
          <v-img width="150" src="/logo/logo-default.svg">
            <v-img width="150" src="/logo/logo-default.png"></v-img>
          </v-img>
        </nuxt-link>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- Follow -->
      <FollowAnime v-if="$store.state.auth.isLogin" />
      <!-- Credit -->
      <Credit />
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp">
        <nuxt-link to="/">
          <v-img width="150" src="/logo/logo-default.svg">
            <v-img width="150" src="/logo/logo-default.png"></v-img>
          </v-img>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <SearchBar />
      <v-spacer />
      <LoginMenu v-if="$store.state.auth.isLogin" />
      <Auth v-else />
    </v-app-bar>
  </span>
</template>
<script>
import Auth from "../template/user/auth";
import LoginMenu from "./item/LoginMenu";
import FollowAnime from "./item/FollowAnime";
import Credit from "./item/Credit";
import SearchBar from "./item/SearchBar";
import Items from "@/items/items";
export default {
  components: {
    LoginMenu,
    Auth,
    Credit,
    FollowAnime,
    SearchBar
  },
  data() {
    return {
      drawer: false,
      temporary: true,
      miniVariant: false,
      items: Items
    };
  }
};
</script>