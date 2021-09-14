import express from "express";
import {
  watch,
  edit,
  upload,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload); // 순서 중요 :가 먼저 나오면 express가 인식을 : 로 먼저 한다
videoRouter.get("/:id(\\d+)", watch); // express routing => 정규식
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
