// server.js => express & server의 configuration에 관련된 코드만!!
import express from "express"; // "express"라는 package를 express라는 이름으로 import
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

// console.log(process.cwd()); // 현재 작업 디렉토리
const app = express();
const logger = morgan("dev");
app.set("view engine", "pug"); // view engine을 express에게 설정
app.set("views", process.cwd() + "/src/views"); // 뷰의 현재 작업 디렉토리를 바꾸는 설정
app.use(logger);
app.use(express.urlencoded({ extended: true })); // express application가 form의 value 이해할 수 있게함
app.use(express.json());
// 서버는 항상 켜져있는 컴퓨터와 같다. 즉 서버는 듣고 답하는 것
// request를 listening 하고 있다.
// 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 한다

// webm -> mp4 보안 에러
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

// Session middleware
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   maxAge: 1000000,
    // },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// Router
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); // 서버가 폴더 볼수 있게 요청 static(폴더)
app.use(
  "/static",
  express.static("assets"),
  express.static("node_modules/@ffmpeg/core/dist")
);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
