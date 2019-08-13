<template>
  <v-layout class="error-wrapper">
    <div class="xs12 mb-3">
      <img :src="imgSrc" />
    </div>
    <div class="text-center">
      <template>
        <p class="headline letter-spacing ma-0">The page you are looking for is not found</p>
        <p class="headline letter-spacing">
          Go back
          <router-link to="/" class="blue--text text--lighten-2 decoration-none">Home</router-link>
        </p>
      </template>
    </div>
  </v-layout>
</template>

<script>
export default {
  props: {
    status: {
      type: [String, Number],
      default: 404
    }
  },
  data() {
    return {
      imgSrc: this.status === 403 ? "/404.png" : "/404.png"
    };
  },
  head() {
    return {
      title: "404 not found"
    };
  }
};
</script>

<style scoped>
.error-wrapper {
  height: 80vh !important;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
