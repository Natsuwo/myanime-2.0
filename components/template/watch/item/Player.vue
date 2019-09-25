<template>
  <div class="player">
    <div id="player">
      <div id="loading"></div>
    </div>
    <div id="player2">
      <div id="loading"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["source", "backup", "thumbnail"],
  data() {
    return {
      config: {
        loader: {
          trackerAnnounce: [
            "wss://tracker.novage.com.ua",
            "wss://tracker.openwebtorrent.com",
            "udp://tracker.leechers-paradise.org:6969",
            "udp://tracker.coppersurfer.tk:6969",
            "udp://exodus.desync.com:6969",
            "wss://tracker.btorrent.xyz",
            "wss://tracker.fastcast.nz"
          ]
        },
        rtcConfig: {
          iceServers: [
            { urls: "stun:stun2.l.google.com:19302" },
            { urls: "stun:stun3.l.google.com:19302" },
            { urls: "stun:stun4.l.google.com:19302" }
          ]
        }
      }
    };
  },
  methods: {
    Player(source) {
      try {
        var engine = new p2pml.hlsjs.Engine(this.config);
        var player = jwplayer("player");
        player.setup({
          file: this.source || "error.mp4",
          type: "hls",
          image: this.thumbnail || "/thumb-error.jpg",
          autostart: true,
          logo: {
            file: "/logo-season.png",
            link: "https://www.myanime.co",
            hide: true,
            position: "control-bar"
          }
        });
        player.on("error", () => {
          var player = jwplayer("player2");
          player.setup({
            file: this.backup,
            type: "mp4",
            autostart: true
          });
          jwplayer("player").remove();
        });
        player.on("setupError", error => {
          var player = jwplayer("player2");
          player.setup({
            file: this.backup,
            type: "mp4",
            autostart: true
          });
          jwplayer("player").remove();
        });
        jwplayer_hls_provider.attach();
        p2pml.hlsjs.initJwPlayer(player, {
          liveSyncDurationCount: 7,
          loader: engine.createLoaderClass()
        });
      } catch (err) {
        setTimeout(() => {
          this.$router.go({
            path: "/a/1",
            force: true
          });
        }, 500);
      }
    }
  },
  mounted() {
    var source = this.source;
    this.Player(source);
  },
  watch: {
    source(val) {
      this.Player(val);
    }
  }
};
</script>