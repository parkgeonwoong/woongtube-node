export const trending = (req, res) => res.render("home", { pageTitle: "Home" });

export const see = (req, res) => {
  // console.log(`Watch video ${req.params.id}`);
  return res.render("watch");
};
export const edit = (req, res) => {
  console.log(req.params);
  return res.send("Edit");
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");
