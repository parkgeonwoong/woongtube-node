import express from "express"; // "express"라는 package를 express라는 이름으로 import
// const express = require("express");
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

// console.log(process.cwd()); // 현재 작업 디렉토리

// 1. express application 만들어야 함
const app = express(); // express function을 사용하면 express apllication을 생성해줌
const logger = morgan("dev");
app.set("view engine", "pug"); // view engine을 express에게 설정
app.set("views", process.cwd() + "/src/views"); // 뷰의 현재 작업 디렉토리를 바꾸는 설정
app.use(logger);
app.use(express.urlencoded({ extended: true })); // express application가 form의 value 이해할 수 있게함
// 서버는 항상 켜져있는 컴퓨터와 같다. 즉 서버는 듣고 답하는 것
// request를 listening 하고 있다.
// 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 한다

// 5. Router = 그룹화 , url의 시작부분
// routes를 사용하기 전에 이 middleware를 사용해야 함
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

/*
4. MiddleWare
middleware <--> handler => Controller
next() 함수만 호출하면 middleware가 되버린다.
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`); // 확인작업 : 요청받은 method, url
  next();
};
*/

/*
2-1 argument = request object
   argument = response object
const handleHome = (req, res) => {
  console.log(req); // express가 request object를 제공해주는것을 보여줌
  return res.send("<h1>I still NodeJS </h1>");
  return res.end(); // 서버가 request를 끝내버린 것
  브라우저가 request를 보내면, 우리는 응답을 해야함 => return
};
즉 home으로 get request가 오면, express는 handleHome에다가 request와 response object를 넣어줌

2. application 설정
app.get("/", handleHome);
*/

const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT} 🔥`);

// 3. 외부 접속 listen
app.listen(PORT, handleListening); // listen(port, callback)
