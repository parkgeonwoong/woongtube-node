const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

// 코맨트 생성 함수
const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  // const icon = document.createElement("i");
  // icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;

  // newComment.appendChild(icon);
  newComment.appendChild(span);
  videoComments.prepend(newComment);
};

// 코멘트 제출시 함수
const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  // console.log(json);

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
    // location.reload();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
