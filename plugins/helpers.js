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

export function getDomain(url) {
    var arr = url.split("/")
    var result = arr[2]
    return result
}

export function viewFormater(num, digits) {
    if (!digits)
        digits = 1
    num = (num + 121) * 1111
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "K" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export function proxyimg(img, rsw) {
    if (!rsw) rsw = false
    var proxy =
        `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=${rsw}&gadget=a&no_expand=1&refresh=86400&url=${encodeURIComponent(img)}`;
    return proxy;
}