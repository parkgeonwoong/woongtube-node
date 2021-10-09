// server.js => express & server의 configuration에 관련된 코드만!!
import express from "express"; // "express"라는 package를 express라는 이름으로 import
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import session from "express-session";
import { localsMiddleware } from "./middlewares";

// console.log(process.cwd()); // 현재 작업 디렉토리
const app = express();
const logger = morgan("dev");
app.set("view engine", "pug"); // view engine을 express에게 설정
app.set("views", process.cwd() + "/src/views"); // 뷰의 현재 작업 디렉토리를 바꾸는 설정
app.use(logger);
app.use(express.urlencoded({ extended: true })); // express application가 form의 value 이해할 수 있게함
// 서버는 항상 켜져있는 컴퓨터와 같다. 즉 서버는 듣고 답하는 것
// request를 listening 하고 있다.
// 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 한다

// Session middleware
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
);

// Router
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
