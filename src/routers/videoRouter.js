import express from "express";
import {
  watch,
  upload,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get("/upload", upload); // 순서 중요 :가 먼저 나오면 express가 인식을 : 로 먼저 한다
videoRouter.get("/:id([0-9a-f]{24})", watch); // express routing => 정규식
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(postUpload);

export default videoRouter;
