# Youtube Coding Reloaded

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
