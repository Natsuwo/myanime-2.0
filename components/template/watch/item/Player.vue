<template>
  <div id="player">
    <div id="loading"></div>
  </div>
</template>
<script>
export default {
  props: ["source", "thumbnail"],
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
      var result = /^.+\\([^.]+)\.pdf$/g.test(url);
      return result
    },
    Player(source) {
      var engine = new p2pml.hlsjs.Engine(this.config);
      var player = jwplayer("player");
      player.setup({
        file: this.source,
        type: this.validm3u8(this.source) ? 'hls' : 'mp4',
        image: this.thumbnail || "/thumb-error.jpg",
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