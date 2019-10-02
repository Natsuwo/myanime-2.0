export function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            console.log("Failed to load script", src);
            reject();
        };
        script.src = src;
        document.head.appendChild(script);
    });
}

export function loadStyle(src) {
    return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.onload = () => {
            resolve();
        };
        link.onerror = () => {
            console.log("Failed to load CSS", src);
            reject();
        };
        link.href = src;
        document.head.appendChild(link);
    });
}

export async function loadVideojs(source, backup, thumbnail) {
    try {
        var id = "player"
        var config = {
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
        var engine = new p2pml.hlsjs.Engine(config);
        var player = videojs(id, {
            html5: {
                hlsjsConfig: {
                    liveSyncDurationCount: 7,
                    loader: engine.createLoaderClass()
                }
            }
        });
        player.watermark({
            image: '/logo/logo-player.png',
            url: 'https://www.myanime.co',
            width: "200px"
        });
        // var button = videojs.getComponent('Button');
        // var closeButton = videojs.extend(button, {
        //     constructor: function () {
        //         button.apply(this, arguments);
        //         this.addClass('vjs-icon-fullscreen-enter');
        //         this.addClass('custom-button-videojs');
        //     },
        //     handleClick: function () {
        //         this.player().dispose();
        //     }
        // });
        // videojs.registerComponent('closeButton', closeButton);
        // player.getChild('controlBar').addChild('closeButton', {});
        p2pml.hlsjs.initVideoJsContribHlsJsPlayer(player);
        var options = {
            autoplay: true,
            preload: "auto",
            type: "application/x-mpegURL",
            src: source
        };
        player.poster(thumbnail)

        player.src(options);
        player.one("error", err => {
            options.type = "video/mp4";
            options.src = backup;
            player.src(options);
        });
        player.ready(() => {
            player.play();
        });
        return player
    } catch (err) {
        console.log(err.message)
    }
}