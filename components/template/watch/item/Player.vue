<template>
  <video id="player" class="video-js vjs-16-9" controls playsinline></video>
</template>
<script>
import { loadScript, loadStyle, loadVideojs } from "@/plugins/helpers";
export default {
  props: ["source", "backup", "thumbnail"],
  methods: {
    validm3u8(url) {
      var result = /^(.*\.m3u8)*$/g.test(url);
      return result;
    },
    async loadscript() {
      const scriptPromise = (async () => {
        await loadScript("/videojs/videojs.min.js");
        await loadScript("/videojs/videojs.logo.js");
        // await loadScript("https://imasdk.googleapis.com/js/sdkloader/ima3.js");
        // await loadScript("/videojs/ads/videojs-contrib-ads.js");
        // await loadScript("/videojs/ads/videojs.ima.js");

        await loadStyle("/videojs/videojs.css");
        // await loadStyle("/videojs/ads/videojs.ima.css");
        await loadStyle("/videojs/videojs.myani.css");
        await loadStyle("/videojs/videojs.logo.css");
      })();
      await scriptPromise;
    },
    async Player(renew) {
      if (renew) {
        var player = videojs("player");
        var options = {
          autoplay: true,
          preload: "auto",
          type: "application/x-mpegURL",
          src: this.source
        };
        player.src(options);
        player.poster(this.thumbnail);
        player.on("error", err => {
          options.type = "video/mp4";
          options.src = this.backup;
          player.src(options);
        });

        player.ready(() => {
          player.play();
        });
      } else {
        var player = await loadVideojs(
          this.source,
          this.backup,
          this.thumbnail
        );
        // await loadScript("/videojs/ads/ads.js");
      }
    }
  },
  async mounted() {
    if (process.client) {
      document.exitPictureInPicture();
      await this.loadscript();
      await this.Player();
    }
  },
  watch: {
    source() {
      this.Player(true);
    },
    backup() {
      this.Player(true);
    }
  }
};
</script>