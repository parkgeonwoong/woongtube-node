import express from "express"; // "express"라는 package를 express라는 이름으로 import  
// const express = require("express");

const PORT = 4000;

// 1. express application 만들어야 함  
const app = express(); // express function을 사용하면 express apllication을 생성해줌

// 서버는 항상 켜져있는 컴퓨터와 같다. 즉 서버는 듣고 답하는 것  
// request를 listening 하고 있다.  
// 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 한다

// 4. MiddleWare  
// middleware <--> handler => Controller  
// next() 함수만 호출하면 middleware가 되버린다.  
const loggerMiddleware = (req, res, next) => {  
console.log(`${req.method} ${req.url}`); // 확인작업 : 요청받은 method, url  
next();  
};

const privateMiddleware = (req, res, next) => {  
const url = req.url;  
if (url === "/protected") {  
return res.send("Not Allowed ");  
}  
console.log("Allowed, you may continue.");  
next();  
};

// 2-1 argument = request object  
// argument = response object  
const handleHome = (req, res) => {  
// console.log(req); // express가 request object를 제공해주는것을 보여줌  
return res.send("I still NodeJS ");  
// return res.end(); // 서버가 request를 끝내버린 것  
// 브라우저가 request를 보내면, 우리는 응답을 해야함 => return  
};  
// 즉 home으로 get request가 오면, express는 handleHome에다가 request와 response object를 넣어줌

const handleLogin = (req, res) => {  
return res.send("Login here");  
};

const handledProtected = (req, res) => {  
return res.send("Welcome to the private lounge.");  
};

// 2. application 설정  
app.use(loggerMiddleware); // 순서가 중요하다 middleware를 use -> URL의 get이 와야함  
app.use(privateMiddleware);

app.get("/", handleHome);  
// app.get("/", loggerMiddleware, handleHome); 하나만 쓸때  
app.get("/login", handleLogin);  
app.get("/protected", handledProtected);

const handleListening = () =>  
console.log(`Server Listening on port http://localhost:${PORT} 🔥`);

// 3. 외부 접속 listen  
app.listen(PORT, handleListening); // listen(port, callback)

### Template

1. Pug 설치
2. Pug 설정 NodeJS Server

```javascript
app.set("view engine", "pug"); // view engine을 express에게 설정
app.set("views", process.cwd() + "/src/views"); // 뷰의 현재 작업 디렉토리를 바꾸는 설정
```

#### Partial

부분화 작업으로 중복화 가능

```javascript
include 폴더/이름
```

#### Iteration

```pug
each item in 배열이름

// Controller에서 배열을 만든다.
```

- res.render(파일이름, 오브젝트화 변수)

#### Mixin

- HTML에서 JS 함수처럼 쓰임

```pug
mixin video(info)
    li #{info.-- }
....

each item in videos
        +video(item)
```
