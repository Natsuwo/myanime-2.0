<template>
  <div ref="player" id="player"></div>
</template>
<script>
export default {
  props: ["source"],
  data() {
    return {
      data: ""
    };
  },
  async mounted() {
    var playSettings = {
      container: this.$refs.player,
      screenshot: true,
      hotkey: true,
      preload: "auto",
      danmaku: false,
      video: {
        url: this.source,
        type: "mp4"
      }
    };
    var dp = new DPlayer(playSettings);
  }
};
</script>
