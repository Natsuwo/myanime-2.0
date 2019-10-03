<template>
  <div id="player-container">
    <video id="player" class="video-js vjs-16-9" controls playsinline></video>
  </div>
</template>
<script>
import {
  loadScript,
  loadStyle,
  loadVideojs,
  loadNewEp,
  loadAds
} from "@/plugins/helpers";
export default {
  props: ["source", "backup", "thumbnail"],
  methods: {
    validm3u8(url) {
      var result = /^(.*\.m3u8)*$/g.test(url);
      return result;
    },
    async loadscript() {
      const scriptPromise = (async () => {
        await loadStyle("/videojs/videojs.css");
        await loadStyle("/videojs/ads/videojs.ads.css");
        await loadStyle("/videojs/ads/videojs.ima.css");
        await loadStyle("/videojs/videojs.myani.css");
        await loadStyle("/videojs/videojs.logo.css");

        await loadScript("//imasdk.googleapis.com/js/sdkloader/ima3.js");
        await loadScript("/videojs/videojs.min.js");
        await loadScript("/videojs/ads/videojs-contrib-ads.js");
        await loadScript("/videojs/ads/videojs.ima.js");
        await loadScript("/videojs/videojs.logo.js");
      })();
      await scriptPromise;
    },
    async Player() {
      await loadAds();
      var player = await loadVideojs(this.source, this.backup, this.thumbnail);
    }
  },
  async mounted() {
    if (process.client) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
      await this.loadscript();
      await this.Player();
    }
  },
  watch: {
    async source() {
      await loadNewEp();
      await this.Player();
    },
    async backup() {
      await loadNewEp();
      await this.Player();
    }
  }
};
</script>