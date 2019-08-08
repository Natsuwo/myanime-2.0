<template>
  <div ref="player" id="player">{{source}}</div>
</template>
<script>
export default {
  props: ["source"],
  methods: {
    Player(source) {
      var playSettings = {
        container: this.$refs.player,
        screenshot: true,
        hotkey: true,
        preload: "auto",
        danmaku: false,
        video: {
          url: source,
          type: "mp4"
        }
      };
      var dp = new DPlayer(playSettings);
    }
  },
  async mounted() {
    this.Player(this.source);
  },
  watch: {
    source(val) {
      this.Player(val);
    }
  }
};
</script>
