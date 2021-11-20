import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

// 동영상 다운로드 & 동영상 타입 변환 & 썸네일 jpg
const handleDownload = async () => {
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "/static/ffmpeg-core.js",
  }); // 콘솔에서 확인
  await ffmpeg.load(); // await 하는 이유 사용자가 소프트웨어를 사용할 것이기 때문

  // ffmpeg 파일을 만들자
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile)); // 가상 컴퓨터에 파일 생성

  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4"); // webm -> mp4

  await ffmpeg.run(
    "-i",
    "recording.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg"
  ); // 썸네일 작업 -ss: 원하는 특정시간

  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "MyRecording.mp4";
  document.body.appendChild(a);
  a.click();

  const thumbA = document.createElement("a");
  thumbA.href = thumbUrl;
  thumbA.download = "MyThumbnail.jpg";
  document.body.appendChild(thumbA);
  thumbA.click();

  ffmpeg.FS("unlink", "recording.webm");
  ffmpeg.FS("unlink", "output.mp4");
  ffmpeg.FS("unlink", "thumbnail.jpg");

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);
};

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
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    console.log("recording End");
    // console.log(event.data);
    videoFile = URL.createObjectURL(event.data);
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
