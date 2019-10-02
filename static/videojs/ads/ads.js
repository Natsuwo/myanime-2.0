var player = videojs('player');
var urlTag = BB.getVASTUrl(2008513)
var options = {
  id: 'player',
  adTagUrl: urlTag,
  timeout: 5000
};
player.ima(options);

var contentPlayer = document.getElementById('player_html5_api');
if ((navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/Android/i)) &&
  contentPlayer.hasAttribute('controls')) {
  contentPlayer.removeAttribute('controls');
}
var startEvent = 'click';
if (navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/Android/i)) {
  startEvent = 'touchend';
}

player.one(startEvent, function () {
  player.ima.initializeAdDisplayContainer();
  player.ima.requestAds();
  player.play();
});

player.on('contentchanged', function () {
  player.trigger('adsready');
});
