# 📌 Youtube Coding
- WoongTube
- FullStack = Server + Client + Deployment

<br/>

### 🔥Summary Skill icons

<p>
<strong>• Language</strong>&nbsp&nbsp&nbsp
<img src="https://img.shields.io/badge/Node.js-339933?style&logo=Node.js&logoColor=white"/></a> &nbsp
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style&logo=JavaScript&logoColor=white"/></a> &nbsp
<img src="http://img.shields.io/badge/Pug-A86454?style&logo=Pug&logoColor=white"/></a> &nbsp
</p>
<p> 
<strong>• FrameWork</strong>&nbsp&nbsp&nbsp
<img src="http://img.shields.io/badge/Express.js-000000?style&logo=Express&logoColor=white"/></a> &nbsp
</p>
<p> 
<strong>• DataBase</strong>&nbsp&nbsp&nbsp
<img src="http://img.shields.io/badge/MongoDB-47A248?style&logo=MongoDB&logoColor=white"/></a> &nbsp
</p>
<p>
<strong>• API & Tech Stack</strong>&nbsp&nbsp&nbsp
<img src="http://img.shields.io/badge/npm-CB3837?style&logo=npm&logoColor=white"/></a> &nbsp
<img src="http://img.shields.io/badge/Nodemon-76D04B?style&logo=Nodemon&logoColor=white"/></a> &nbsp
<img src="http://img.shields.io/badge/Babel-F9DC3E?style&logo=Babel&logoColor=white"/></a> &nbsp
<img src="http://img.shields.io/badge/Webpack-8DD6F9?style&logo=Webpack&logoColor=white"/></a> &nbsp
<img src="http://img.shields.io/badge/FFmpeg-007808?style&logo=FFmpeg&logoColor=white"/></a> &nbsp
</p>
<p>
<strong>• Style</strong>&nbsp&nbsp&nbsp
<img src="http://img.shields.io/badge/Sass-CC6699?style&logo=Sass&logoColor=white"/></a> &nbsp
</p>
<p>
<strong>• Deployment</strong>&nbsp&nbsp&nbsp
<img src="http://img.shields.io/badge/Heroku-430098?style&logo=Heroku&logoColor=white"/></a> &nbsp
<img src="http://img.shields.io/badge/GitHub-181717?style&logo=GitHub&logoColor=white"/></a> &nbsp
</p>
<p>
<strong>• Environment</strong>&nbsp&nbsp&nbsp
<img src="http://img.shields.io/badge/Visual Studio Code-007ACC?style&logo=Visual Studio Code&logoColor=white"/></a> &nbsp
<img src="http://img.shields.io/badge/Git-F05032?styl&logo=Git&logoColor=white"/></a> &nbsp
</p>
<br />

## Router Plan

/ -> Home  
/join -> Join 회원가입
/login -> Login 로그인
/search -> Search 홈에서 동영상

/users/:id -> See Profile 로그인 후 프로필 보기  
/users/logout -> Log Out 로그아웃  
/users/edit -> Edit My Profile 프로필 편집  
/users/delete -> Delete My Profile 프로필 삭제

/videos/watch(:id) -> Watch Video 동영상 보기  
/videos/:id/edit -> Edit Video 동영상 편집  
/videos/:id/delete -> Delete Video 동영상 삭제  
/videos/upload -> Upload video 동영상 업로드

```shell
node_modules
package.json
webpack.config.js
nodemon.json
babel.config.json
src
│  db.js
│  init.js
│  middlewares.js
│  server.js
│
├─client
│  ├─js
│  │      main.js
│  │
│  └─scss
│      │  styles.scss
│      │
│      ├─components
│      │      footer.scss
│      │      header.scss
│      │      shared.scss
│      │      video.scss
│      │
│      ├─config
│      │      _reset.scss
│      │      _variables.scss
│      │
│      └─screens
│              home.scss
│              search.scss
│
├─controllers
│      userController.js
│      videoController.js
│
├─models
│      User.js
│      Video.js
│
├─routers
│      rootRouter.js
│      userRouter.js
│      videoRouter.js
│
└─views
    │  404.pug
    │  base.pug
    │  edit-profile.pug
    │  edit.pug
    │  home.pug
    │  join.pug
    │  login.pug
    │  search.pug
    │  upload.pug
    │  watch.pug
    │
    ├─mixins
    │      video.pug
    │
    ├─partials
    │      footer.pug
    │      header.pug
    │
    └─users
            change-password.pug
            profile.pug
```
