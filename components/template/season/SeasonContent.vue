<template>
  <div class="myanime-home">
    <h3>{{animeSeasons.season}}</h3>
    <InfiniteScroll :has-next="hasNext" :is-loading="isLoading" @loadmore="loadmore">
      <v-layout wrap>
        <v-flex
          xs6
          sm4
          md3
          lg2
          class="season-anime-content"
          v-for="(item, index) in animeSeasons.animes"
          :key="index"
        >
          <nuxt-link class="season-anime-link" :to="`/anime/${item.anime_id}`">
            <div class="season-anime-card">
              <div class="season-anime-cover">
                <v-img
                  :lazy-src="imgproxy(item.thumbnail, 270)"
                  :src="imgproxy(item.thumbnail, 270)"
                ></v-img>
              </div>
              <div>
                <div class="season-anime-title">{{item.title}}</div>
              <div
                class="season-anime-total-eps"
              >{{animeSeasons.totalEps[index][item.anime_id]}} Eps</div>
              <div class="season-anime-total-views">{{viewFormater(item.views)}} views</div>
            </div>
              </div>
          </nuxt-link>
        </v-flex>
      </v-layout>
    </InfiniteScroll>
    <Loading v-if="isLoading" class="mt-3" />
  </div>
</template>
<script>
import InfiniteScroll from "@/components/main/item/InfiniteScroll";
import { proxyimg, viewFormater } from "@/plugins/helpers";
import { getSeason } from "@/services/Anime";
import Loading from "@/components/main/item/Loading";
import { mapMutations } from "vuex";
export default {
  props: ["isLoading", "animeSeasons", "season"],
  data() {
    return {
      hasNext: true,
      skip: 30
    };
  },
  methods: {
    ...mapMutations(["SET_LOADING"]),
    async loadmore() {
      this.SET_LOADING(true);
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var response = await getSeason(headers, this.season, this.skip);
      if (response.data.success) {
        this.$emit("loadData", response.data);
        this.skip += 30;
        if (this.skip >= this.animeSeasons.total) {
          this.hasNext = false;
        }
      }
      this.SET_LOADING(false);
    },
    viewFormater(view) {
      return viewFormater(view);
    },
    imgproxy(img, rs) {
      return proxyimg(img, rs);
    }
  },
  created() {
    if (this.skip >= this.animeSeasons.total) {
      this.hasNext = false;
    }
  },
  components: {
    Loading,
    InfiniteScroll
  }
};
</script>