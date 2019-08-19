<template>
  <v-flex xs9>
    <v-container>
      <v-layout wrap row>
        <v-flex xs12 sm6 md4 v-for="(item, index) in animes" :key="item.anime_id">
          <v-card class="mx-auto" outlined :color="color">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{item.title}}</v-list-item-title>
                <div class="overline mb-4">{{getTerm(index, item.anime_id)}}</div>
                <v-list-item-subtitle v-html="item.description" />
              </v-list-item-content>

              <v-list-item-avatar width="75" height="100%" tile>
                <v-img :src="item.thumbnail"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions>
              <v-btn color="primary" :to="`/anime/${item.anime_id}`">Watch</v-btn>
              <v-btn color="error" @click="unfollow(item)">Unfollow</v-btn>
              <v-spacer></v-spacer>
              <v-menu
                offset-x
                open-on-hover
                :close-on-click="false"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ on }">
                  <v-btn text icon small v-on="on">
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in picking"
                    :key="index"
                    :style="`background: ${item.color}`"
                    @click="color = item.color"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>
<script>
import { unFollow } from "@/services/Follow";
import { getFollowProfile } from "@/services/User";
import Picking from "@/items/picking.json";
export default {
  async fetch({ store }) {
    var headers = {
      "x-user-session": store.state.auth.userToken
    };
    var response = await getFollowProfile(headers);
    store.commit("auth/getFollowProfile", response.data.data);
  },
  data() {
    return {
      color: "",
      picking: Picking
    };
  },
  computed: {
    followP5() {
      return this.$store.state.auth.followprofile;
    },
    animes() {
      return this.followP5.animes;
    },
    metas() {
      return this.followP5.metas;
    },
    terms() {
      return this.$store.state.anime.terms;
    }
  },
  methods: {
    getTerm(index, id) {
      var terms = [];
      for (var item of this.metas[index][id] || []) {
        var term = this.terms
          .filter(x => x.term_id === item)
          .map(x => x.key)
          .join();
        terms.push(term);
      }
      return terms.join(", ");
    },
    async unfollow(item) {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var form = {
        anime_id: item.anime_id
      };

      var response = await unFollow(headers, form);
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
      if (response.data.success)
        return this.$store.commit("auth/unfollow", item);
    }
  },
  middleware: "auth",
  layout: "profile"
};
</script>