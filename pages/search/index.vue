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
            <nuxt-link class="search-thumbnail-link" :to="`/watch?a=${item.episode_id}`">
              <div class="search-right-content">
                <div class="search-title">{{getAnime(item.anime_id, 'title')}}</div>
                <div
                  class="search-views"
                >{{item.views}} views - {{getAnime(item.anime_id, 'followers') || 0}} followers</div>
                <no-ssr>
                  <div
                    class="search-description"
                    v-html="$options.filters.truncate(getAnime(item.anime_id, 'description'), 200, '...')"
                  ></div>
                </no-ssr>
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
<style scoped>
.search-content {
  display: flex;
  position: relative;
  flex-direction: row;
}
.search-thumbnail {
  width: 246px;
  margin-right: 16px;
  display: inline-block;
  position: relative;
  -ms-flex: none;
  -webkit-flex: none;
  flex: none;
}
.search-thumbnail-link {
  text-decoration: none;
}
.search-thumbnail-link .search-title {
  color: #fff;
}
.search-right-content {
  max-width: 600px;
  min-width: 0;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  -ms-flex: 1 1 0.000000001px;
  -webkit-flex: 1;
  flex: 1;
  -webkit-flex-basis: 0.000000001px;
  flex-basis: 0.000000001px;
  display: flex;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.search-title {
  font-size: 20px;
  display: flex;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.search-views {
  color: #aaa;
  font-weight: 400;
}
.search-description {
  color: #aaa;
  font-weight: 400;
  display: block;
  line-height: 1.8rem;
  max-height: 5.6rem;
  overflow: hidden;
  text-transform: none;
}
.search-description > a {
  text-decoration: none;
}
.search-overlay {
  display: block;
}
.search-anime-thumbnail {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
}
.search-anime {
  width: 108px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 6.7%, 0.8);
  color: hsla(0, 0%, 100%, 0.8);
  text-align: center;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2rem;
  display: flex;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
</style>