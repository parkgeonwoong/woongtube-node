import express from "express";
import {
  watch,
  upload,
  getEdit,
  postEdit,
} from "../controllers/videoController";

const videoRouter = express.Router();

// videoRouter.get("/upload", upload); // 순서 중요 :가 먼저 나오면 express가 인식을 : 로 먼저 한다
videoRouter.get("/:id(\\d+)", watch); // express routing => 정규식
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
// videoRouter.get("/:id(\\d+)/edit", getEdit); 위와 일치
// videoRouter.post("/:id(\\d+)/edit", postEdit);

export default videoRouter;
