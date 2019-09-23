<template>
  <v-container fuild grid-list-md>
    <div class="myanime-home">
      <v-layout column wrap>
        <div v-if="results.length > 0">
          <div class="search-content py-1" v-for="(item, index) in results" :key="item.anime_id">
            <nuxt-link class="search-thumbnail-link" :to="`/watch?a=${item.episode_id}`">
              <div class="search-thumbnail">
                <v-img width="246px" :src="item.thumbnail"></v-img>
                <div class="search-overlay">
                  <v-img class="search-anime-thumbnail" :src="getAnime(item.anime_id, 'thumbnail')"></v-img>
                  <div class="search-anime">
                    <div class="count">{{counts[index]}}</div>
                    <v-icon>mdi-animation-play</v-icon>
                  </div>
                </div>
              </div>
            </nuxt-link>
            <nuxt-link class="search-thumbnail-link" :to="`/anime/${item.anime_id}`">
              <div class="search-right-content">
                <div class="search-title">{{getAnime(item.anime_id, 'title')}}</div>
                <div
                  class="search-views"
                >{{item.views}} views - {{getAnime(item.anime_id, 'followers') || 0}} followers</div>
                <client-only>
                  <div
                    class="search-description"
                    v-html="$options.filters.truncate(getAnime(item.anime_id, 'description'), 200, '...')"
                  ></div>
                </client-only>
              </div>
            </nuxt-link>
          </div>
        </div>
      </v-layout>
    </div>
  </v-container>
</template>
<script>
import { search } from "@/services/Search";
export default {
  head() {
    return {
      title: 'Search'
    }
  },
  async fetch({ store, query }) {
    var headers = {
      "x-user-session": store.state.auth.userToken
    };
    var response = await search(headers, query.q);
    store.dispatch("search/searchQuery", response);
  },
  computed: {
    animes() {
      return this.$store.state.search.animes;
    },
    results() {
      return this.$store.state.search.results;
    },
    counts() {
      return this.$store.state.search.counts;
    }
  },
  methods: {
    getAnime(id, type) {
      return (
        this.animes.filter(x => x.anime_id === id).map(x => x[type])[0] || ""
      );
    }
  },
  filters: {
    truncate: function(text, length, suffix) {
      return text.substring(0, length) + suffix;
    }
  },
  watchQuery: ["q"]
};
</script>