<template>
  <div>
    <v-divider></v-divider>
    <v-list>
      <v-list-item>
        <v-list-item-title class="user-follower-anime">Animes following</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="item in following"
        :key="item.anime_id"
        :to="`/anime/${item.anime_id}`"
        router
        exact
      >
        <v-list-item-action>
          <v-avatar size="24">
            <v-img :src="item.thumbnail"></v-img>
          </v-avatar>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  computed: {
    following() {
      return this.$store.state.auth.following;
    }
  }
};
</script>