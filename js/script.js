var tag = document.createElement("script");

var VideoID;
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("video__player", {
    height: "250px",
    width: "360px",
    videoId: VideoID,
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  fetchVideoTitle(VideoID);
}

function fetchVideoTitle(videoId) {
  var apiKey = "AIzaSyDOTz-MrSa47Ns4zo35hKiWD6t-5SMYBRk";
  var url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var title = data.items[0].snippet.title;
      document.querySelector(".video__title").textContent = title;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  let isGyroEnabled = false; // ジャイロセンサーが有効かどうかを追跡する変数

  // イベントリスナーを追加/削除する関数
  function toggleDeviceOrientationListener(enable) {
    if (enable) {
      window.addEventListener("deviceorientation", deviceorientationHandler);
    } else {
      window.removeEventListener("deviceorientation", deviceorientationHandler);
    }
  }

  // ジャイロセンサーのアクセス許可をリクエストする関数
  function requestGyroAccess() {
    if (DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission()
        .then(function (response) {
          if (response === "granted") {
            toggleDeviceOrientationListener(true);
            isGyroEnabled = true;
          }
        })
        .catch(function (e) {
          console.log(e);
        });
    } else {
      toggleDeviceOrientationListener(true);
      isGyroEnabled = true;
    }
  }

  // footer__jes 要素がクリックされたときの処理
  var sensor_contents = document.querySelector(".footer__jes");

  sensor_contents.addEventListener("click", function () {
    if (!isGyroEnabled) {
      requestGyroAccess();
      sensor_contents.src = "./images/footer__jesnone.svg";
    } else {
      toggleDeviceOrientationListener(false);
      isGyroEnabled = false;
      sensor_contents.src = "./images/footer__jes.svg";
    }
  });

  // ジャイロセンサーが有効かどうかをチェック
  if (
    window.DeviceOrientationEvent &&
    !DeviceOrientationEvent.requestPermission
  ) {
    toggleDeviceOrientationListener(true);
    isGyroEnabled = true;
  }
});

let alertShown = false;

function deviceorientationHandler(event) {
  const { beta, gamma } = event;
  if (!alertShown) {
    if (gamma > 30) {
      let currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 10);
    } else if (gamma < -30) {
      let currentTime = player.getCurrentTime();
      player.seekTo(currentTime - 10);
    }
  }

  if (beta > -5 && beta < 15) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  Setcode();
});

function Setcode() {
  // 現在のページのURLを取得
  var currentPageUrl = window.location.href;

  const url = new URL(currentPageUrl);

  const queryString = url.search.slice(11);
  VideoID = queryString;
}

document.querySelector(".header__back").addEventListener("click", function () {
  window.history.back();
});

const Search = document.querySelector(".search");
const SearchBtn = document.querySelector(".header__search");
const Find = document.querySelector(".find");

SearchBtn.addEventListener("click", function () {
  Find.classList.toggle("display");
});
