import express from "express"; // "express"라는 package를 express라는 이름으로 import
// const express = require("express");

const PORT = 4000;

// 1. express application 만들어야 함
const app = express(); // express function을 사용하면 express apllication을 생성해줌

// 서버는 항상 켜져있는 컴퓨터와 같다. 즉 서버는 듣고 답하는 것
// request를 listening 하고 있다.
// 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 한다

const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT} 🔥`);

app.listen(PORT, handleListening); // listen(port, callback)
