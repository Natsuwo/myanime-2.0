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

export async function loadNewEp(source, backup, thumbnail) {
    var player = videojs("player")
    player.pause()
    player.reset()
    player.ima.setContentWithAdTag()
    var options = {
        autoplay: true,
        preload: "auto",
        type: "application/x-mpegURL",
        src: source
    };
    player.poster(thumbnail)
    await player.src(options);
    await player.ima.requestAds()
    await player.play()

    player.one("error", async err => {
        options.type = "video/mp4";
        options.src = backup;
        await player.src(options);
        await player.play()
    });
}

export function loadAds() {
    try {
        var player = videojs('player');
        var options = { id: 'player', adTagUrl: BB.getVASTUrl(2008513) };
        player.ima(options);
        var contentPlayer = document.getElementById('content_video_html5_api');
        if ((navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) &&
            contentPlayer.hasAttribute('controls')) {
            contentPlayer.removeAttribute('controls');
        }
        var initAdDisplayContainer = function () {
            player.ima.initializeAdDisplayContainer();
            wrapperDiv.removeEventListener(startEvent, initAdDisplayContainer);
        }
        var startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            startEvent = 'touchend';
        }
        var wrapperDiv = document.getElementById('player');
        wrapperDiv.addEventListener(startEvent, initAdDisplayContainer);
    } catch (err) {
        console.log(err.message)
    }
}

// export async function loadVideojs(source, backup, thumbnail) {
//     var id = "player"
//     if (p2pml && p2pml.hlsjs.Engine.isSupported()) {
//         var config = {
//             loader: {
//                 trackerAnnounce: [
//                     "wss://tracker.novage.com.ua",
//                     "wss://tracker.openwebtorrent.com",
//                     "udp://tracker.leechers-paradise.org:6969",
//                     "udp://tracker.coppersurfer.tk:6969",
//                     "udp://exodus.desync.com:6969",
//                     "wss://tracker.btorrent.xyz",
//                     "wss://tracker.fastcast.nz"
//                 ]
//             },
//             rtcConfig: {
//                 iceServers: [
//                     { urls: "stun:stun2.l.google.com:19302" },
//                     { urls: "stun:stun3.l.google.com:19302" },
//                     { urls: "stun:stun4.l.google.com:19302" }
//                 ]
//             }
//         }
//         var engine = new p2pml.hlsjs.Engine(config);
//         var player = videojs(id, {
//             html5: {
//                 hlsjsConfig: {
//                     liveSyncDurationCount: 7,
//                     loader: engine.createLoaderClass()
//                 }
//             }
//         })
//         p2pml.hlsjs.initVideoJsContribHlsJsPlayer(player);
//     } else {
//         var player = videojs(id)
//     }

//     player.watermark({
//         image: '/logo/logo-player.png',
//         url: 'https://www.myanime.co',
//         width: "200px"
//     });
//     var options = {
//         autoplay: true,
//         preload: "auto",
//         type: "application/x-mpegURL",
//         src: source
//     };

//     player.poster(thumbnail)
//     player.src(options);
//     player.one("error", err => {
//         options.type = "video/mp4";
//         options.src = backup;
//         player.src(options);
//         player.play()
//     });
//     player.ready(() => {
//         player.play();
//     });
// }


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

// engine.on("peer_connect", peer => console.log("peer_connect", peer.id, peer.remoteAddress));
// engine.on("peer_close", peerId => console.log("peer_close", peerId));
// engine.on("segment_loaded", (segment, peerId) => console.log("segment_loaded from", peerId ? `peer ${peerId}` : "HTTP", segment.url));