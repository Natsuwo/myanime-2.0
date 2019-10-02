<template>
  <div id="player">
    <div id="loading"></div>
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
    validm3u8(url) {
      var result = /^(.*\.m3u8)*$/g.test(url);
      return result;
    },
    Player(source) {
      try {
        var engine = new p2pml.hlsjs.Engine(this.config);
        var player = jwplayer("player");
        var type = this.validm3u8(this.source) ? "hls" : "mp4";
        var source = this.validm3u8(this.source) ? this.source : this.backup;
        var config = {
          type,
          image: this.thumbnail || "/thumb-error.jpg",
          autostart: true,
          logo: {
            file: "/logo/logo-player.svg",
            link: "https://www.myanime.co",
            hide: true,
            position: "control-bar"
          }
        };
        config.file = source;
        player.setup(config);
        player.on("setupError", error => {
          config.file = this.backup;
          player.setup(config);
        });
        jwplayer_hls_provider.attach();
        p2pml.hlsjs.initJwPlayer(player, {
          liveSyncDurationCount: 7,
          loader: engine.createLoaderClass()
        });
      } catch (err) {
        console.log(err.message);
        var err1 =
          "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.";
        var err2 = "Cannot convert undefined or null to object";
        if (err.message === err1 || err.message === err2) {
          setTimeout(() => {
            this.$router.go({
              path: "/a/1",
              force: true
            });
          }, 500);
        }
      }
    }
  },
  mounted() {
    if (process.client) {
      this.Player();
    }
  },
  watch: {
    source() {
      this.Player();
    },
    backup() {
      this.Player();
    }
  }
};
</script>