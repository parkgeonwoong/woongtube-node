import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

// 메인 홈
export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

// 동영상 보기
export const watch = async (req, res) => {
  // console.log(`Watch video ${req.params.id}`);
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  // console.log(video);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

// 동영상 편집
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params; // 이 post request는 id를 params로 가지고 있다. (videoRouter.js)
  const video = await Video.findById(id);
  const { title, description, hashtags } = req.body;
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Your are not the owner of the video");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved");
  return res.redirect(`/videos/${id}`);
};

// 동영상 업로드
export const getUpload = (req, res) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  console.log(video, thumb);
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title: title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path.replace(/[\\]/g, "/"),
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    req.flash("info", "Upload Video");
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

// 동영상 삭제
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  const user = await User.findById(_id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  req.flash("info", "Delete Video");
  return res.redirect("/");
};

// 동영상 찾기
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

// 조회수 기록 : apiRouter
export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

// 코멘트 fetch api : apiRouter
export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);
  const userId = await User.findById(user._id).populate("comments");

  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    name: user.name,
    owner: user._id,
    video: id,
  });

  video.comments.push(comment._id);
  video.save();

  userId.comments.push(comment._id);
  userId.save();
  // console.log(req.params);
  // console.log(req.body.text);
  // console.log(req.session.user);
  return res.status(201).json({ newCommentId: comment._id }); // fronted한테 새로 생긴 댓글의 id를 보내기 위해
};

// 코멘트 삭제 fetch api
export const deleteComment = async (req, res) => {
  const {
    params: { id },
    session: { user },
  } = req;
  try {
    const comment = await Comment.findById(id);
    if (user._id === String(comment.owner)) {
      await Comment.findByIdAndDelete(id);
      const video = await Video.findById(comment.video);
      video.comments.remove(comment._id);
      video.save();
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(404);
  }
};
