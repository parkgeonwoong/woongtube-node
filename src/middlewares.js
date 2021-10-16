export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Youtube";
  res.locals.loggedInUser = req.session.user || {};
  // console.log(req.session.user);
  // console.log(res.locals);
  next();
};

// 유저가 loggedIn 돼 있으면, 요청을 계속하고 없으면 로그인페이지로 되돌아감
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};
// 유저가 로그아웃 돼 있어야 실행시키는 것을 허락
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
