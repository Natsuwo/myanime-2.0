<template>
  <div id="player-container">
    <v-alert color="error" dark dismissible>{{noti}}</v-alert>
    <div v-if="adblock">
      <v-row align="center" justify="center" style="height: 720px;">
        <h3>We are supported primarily by advertisements. We hope you will disable Adblock on our site, thank you.</h3>
      </v-row>
    </div>
    <video v-else id="player" class="video-js vjs-16-9" controls playsinline></video>
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
  data() {
    return {
      adblock: false
    };
  },
  computed: {
    noti() {
      return this.$store.state.settings.noti || "";
    }
  },
  methods: {
    validm3u8(url) {
      var result = /^(.*\.m3u8)*$/g.test(url);
      return result;
    },
    async loadscript() {
      try {
        await loadStyle("/videojs/videojs.css");
        await loadStyle("/videojs/ads/videojs.ads.css");
        await loadStyle("/videojs/ads/videojs.ima.css");
        await loadStyle("/videojs/videojs.myani.css");
        await loadStyle("/videojs/videojs.logo.css");

        await loadScript("//imasdk.googleapis.com/js/sdkloader/ima3.js");
        await loadScript("/js/hls.min.js");
        await loadScript("/js/p2p-core.min.js");
        await loadScript("/js/p2p-hls.min.js");
        await loadScript("/videojs/videojs.min.js");
        await loadScript("/videojs/videojs-contrib-hls.js");
        await loadScript("/videojs/ads/videojs-contrib-ads.js");
        await loadScript("/videojs/ads/videojs.ima.js");
        await loadScript("/videojs/videojs.logo.js");
        return true;
      } catch (err) {
        this.adblock = true;
        return false;
      }
    },
    async Player() {
      var player = await loadVideojs(this.source, this.backup, this.thumbnail);
      await loadAds();
    }
  },
  async mounted() {
    if (process.client) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
      await this.loadscript();
      var ads = await this.loadscript();
      if (ads !== true) {
        this.adblock = true;
      } else {
        await this.Player();
      }
    }
  },
  watch: {
    async source() {
      await loadNewEp(this.source, this.backup, this.thumbnail);
    },
    async backup() {
      await loadNewEp(this.source, this.backup, this.thumbnail);
    }
  }
};
</script>