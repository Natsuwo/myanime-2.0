<template>
  <v-layout wrap row>
    <v-tabs v-model="tab">
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#tab-all">All</v-tab>
      <v-tab href="#tab-watching">Watching</v-tab>
      <v-tab href="#tab-considering">Considering</v-tab>
      <v-tab href="#tab-completed">Completed</v-tab>
      <v-tab href="#tab-skipping">Skipping</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(type, index) in picking" :key="index" :value="'tab-' + type.title">
        <v-layout row wrap ma-auto>
          <v-flex xs12 sm6 md6 lg4 v-for="item in followType(type.title)" :key="item.parent_id">
            <v-card class="mx-auto" outlined :color="color(item.meta_value)">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title
                    class="headline user-lists-title mb-1"
                  >{{getAnime(item.parent_id).title}}</v-list-item-title>
                  <div class="overline mb-4">{{getTerm(item)}}</div>
                  <v-list-item-subtitle
                    class="user-lists-description"
                    v-html="getAnime(item.parent_id).description"
                  />
                </v-list-item-content>

                <v-list-item-avatar width="75" height="100%" tile>
                  <v-img :lazy-src="getAnime(item.parent_id).thumbnail" :src="getAnime(item.parent_id).thumbnail"></v-img>
                </v-list-item-avatar>
              </v-list-item>
              <v-card-actions>
                <v-btn color="primary" :to="`/anime/${getAnime(item.parent_id).anime_id}`">Watch</v-btn>
                <v-btn color="error" @click="unfollow(getAnime(item.parent_id))">Remove</v-btn>
                <v-spacer></v-spacer>
                <v-menu offset-x :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <v-btn text icon fab small v-on="on">
                      <v-icon>mdi-bookmark</v-icon>
                    </v-btn>
                  </template>
                  <v-list position-y>
                    <v-list-item
                      v-for="(option, index) in picking.slice(1)"
                      :key="index"
                      @click="changeType(item, option, type)"
                    >
                      <v-list-item-title>{{ option.title.toUpperCase() }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-btn
            text
            block
            v-if="followType(type.title).length >= 12"
            @click="loadmore(type.title)"
          >Loadmore</v-btn>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </v-layout>
</template>
<script>
import Picking from "@/items/picking.json";
import { loadmoreLists } from "@/services/User";
import { mapMutations } from "vuex";
import { unFollow, changeType } from "@/services/Follow";
export default {
  props: ["animes", "metas", "follows", "terms"],
  data() {
    return {
      tab: null,
      picking: Picking,
      headers: {
        "x-user-session": this.$store.state.auth.userToken
      }
    };
  },
  methods: {
    ...mapMutations("auth", ["loadLists"]),
    async loadmore(type) {
      var response = await loadmoreLists(
        this.headers,
        type,
        this.follows[type].length
      );
      if (response.data.success) {
        this.loadLists({ type, response: response.data });
      }
    },
    followType(type) {
      return this.follows[type];
    },
    color(type) {
      return Picking.filter(x => x.title === type)[0].color;
    },
    getAnime(id) {
      return this.animes.filter(x => x.anime_id === id)[0];
    },
    async changeType(item, option, type) {
      var form = {
        anime_id: item.parent_id,
        type: option.title
      };
      var response = await changeType(this.headers, form);
      var oldType = item.meta_value;
      if (response.data.success) {
        this.$store.commit("auth/updateLists", { item, option, type });
      }
      if (option.title === "watching" || option.title === "considering") {
        if (oldType === "watching" || oldType === "considering") return;
        var index = this.animes.findIndex(x => x.anime_id === item.parent_id);
        if (index >= 0) {
          var anime = this.animes[index];
          return this.$store.commit("auth/follow", anime);
        }
      }
    },
    getTerm(item) {
      var anime_id = item.parent_id;
      var index = this.metas.findIndex(x => x[anime_id]);
      var terms = [];
      if (index >= 0) {
        for (var item of this.metas[index][anime_id]) {
          var term = this.terms
            .filter(x => x.term_id === item)
            .map(x => x.key)
            .join();
          terms.push(term);
        }
        return terms.join(", ");
      }
      return "";
    },
    async unfollow(item) {
      var form = {
        anime_id: item.anime_id
      };
      var response = await unFollow(this.headers, form);
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
      if (response.data.success)
        return this.$store.commit("auth/unfollow", item);
    }
  }
};
</script>
<style scoped>
.v-item-group {
  flex: 1 auto!important;
}
</style>