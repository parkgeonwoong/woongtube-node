const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;

// 동영상 다운로드
const handleDownload = () => {};

// 동영상 멈춤 버튼
const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);

  recorder.stop();
};

// 동영상 시작 버튼
const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  // 기록하는 개체 stop 이후 생성
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    console.log("recording End");
    // console.log(event.data);
    const videoFile = URL.createObjectURL(event.data);
    // console.log(videoFile);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

// 미리보기 동영상 녹화
const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
