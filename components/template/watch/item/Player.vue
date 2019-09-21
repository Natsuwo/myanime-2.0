<template>
  <div id="player">
    <div id="loading"></div>
  </div>
</template>
<script>
export default {
  props: ["source"],
  data() {
    return {
      p2p: false,
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
      if (p2pml.hlsjs.Engine.isSupported()) {
        this.p2p = true;
        var engine = new p2pml.hlsjs.Engine(this.config);
        var player = jwplayer("player");

        player.setup({
          file: this.source,
          type: "mp4",
          logo: {
            file: "/logo-season.png",
            link: "https://www.myanime.co",
            hide: true,
            position: "control-bar"
          }
        });

        jwplayer_hls_provider.attach();
        p2pml.hlsjs.initJwPlayer(player, {
          liveSyncDurationCount: 7,
          loader: engine.createLoaderClass()
        });
      } else {
        var player = jwplayer("player");
        player.setup({
          logo: {
            file: "/logo-season.png",
            link: "https://www.myanime.co",
            hide: true,
            position: "control-bar"
          },
          file: this.source,
          type: "mp4"
        });
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