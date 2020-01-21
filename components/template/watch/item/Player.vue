<template>
  <v-responsive id="player-container" :aspect-ratio="16/9">
    <iframe
      :src="`/api/player?source=${source}&backup=${backup}&thumbnail=${thumbnail}`"
      frameborder="0"
      width="100%"
      height="100%"
      allowfullscreen
    ></iframe>
  </v-responsive>
</template>
<script>
export default {
  props: ["source", "backup", "thumbnail"],
  async mounted() {
    if (process.client) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    }
  }
};
</script>