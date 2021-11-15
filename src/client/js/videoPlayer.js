const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

// play 버튼
const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

// mute 버튼
const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

// 볼륨 버튼
const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up";
  }
  volumeValue = Number(value);
  video.volume = value;
  if (volumeValue === 0) {
    video.muted = true;
    muteBtnIcon.classList = "fas fa-volume-mute";
  }
};

// 원하는 포맷을 가진 date를 생성
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

// 비디오 시간 마지막 부분
const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

// 비디오 시간 처음 부분
const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

// Timeline바
const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

// 풀스크린 버튼
const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

// 마우스 움직임 -> 비디오 컨트롤러
const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

// 마우스 사라짐 -> 비디오 컨트롤러 사라짐
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

// 비디오 화면 클릭시 시작, 멈춤
const handleVideoClick = () => {
  handlePlayClick();
};

const handleKeydown = (event) => {
  switch (event.keyCode) {
    case 32: // space
      handlePlayClick();
      break;
    case 70: // fullScreen
      handleFullscreen();
      break;
    case 39: // right arrow
      video.currentTime = Math.floor(video.currentTime + 5);
      break;
    case 37: // left arrow
      video.currentTime = Math.floor(video.currentTime - 5);
      break;
    case 38: // up arrow
      volumeValue += 0.1;
      volumeRange.value = volumeValue;
      video.volume = volumeRange.value;
      event.preventDefault();
      break;
    case 40: //down arrow
      volumeValue -= 0.1;
      volumeRange.value = volumeValue;
      video.volume = volumeRange.value;
      event.preventDefault();
      break;
  }
};
console.log(videoContainer.dataset);
// 비디오 끝나고 조회수+1 : API를 받아오자
const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/views`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handleVideoClick);
window.addEventListener("keydown", handleKeydown);
video.addEventListener("ended", handleEnded);

// 미디어 준비상태: 예외처리
if (video.readyState == 4) {
  handleLoadedMetadata();
}
