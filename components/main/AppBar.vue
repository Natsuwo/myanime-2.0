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
      <v-list-item class="px-1" v-if="$vuetify.breakpoint.mdAndDown">
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <nuxt-link to="/">
          <v-img width="150" src="./summer.svg"></v-img>
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
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mdAndDown" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn v-else icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp">
        <nuxt-link to="/">
          <v-img width="150" src="./summer.svg"></v-img>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        class="mx-4"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ></v-text-field>
      <v-spacer />
      <LoginMenu v-if="$store.state.auth.isLogin" />
      <Auth v-else />
    </v-app-bar>
  </span>
</template>
<script>
import Auth from "../template/user/auth";
import LoginMenu from "./item/LoginMenu";
import Items from "@/items/items";
export default {
  components: {
    LoginMenu,
    Auth
  },
  data() {
    return {
      drawer: true,
      temporary: false,
      miniVariant: false,
      items: Items
    };
  },
  watch: {
    "$vuetify.breakpoint.md"(val) {
      if (val) {
        return (this.miniVariant = false);
      }
    }
  }
};
</script>
