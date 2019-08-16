<template>
  <v-text-field
    class="mx-4"
    flat
    hide-details
    label="Search"
    prepend-inner-icon="mdi-magnify"
    solo-inverted
    v-bind="$attrs"
    v-model="q"
    @keyup.enter="search"
  ></v-text-field>
</template>
<script>
export default {
  data() {
    return {
      q: ""
    };
  },
  methods: {
    search() {
      if (this.q) {
        this.$router.push(`/search/?q=${this.q}`);
      }
    }
  },
  mounted() {
    if (this.$route.query.q) {
      this.q = this.$route.query.q;
    }
  }
};
</script>