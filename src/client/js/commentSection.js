const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".video__comment__delete");

const deleteComment = (li) => {
  const commentList = document.querySelector(".video__comments ul");
  commentList.removeChild(li);
};

// 코맨트 생성 함수
const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const i = document.createElement("i");
  i.addEventListener("click", handleDelete);
  i.className = "far fa-trash-alt fa-lg video__comment__delete";
  // const span = document.createElement("span");
  // span.innerText = ` ${id.name}`;
  const span2 = document.createElement("span");
  span2.innerText = ` ${text}`;

  // newComment.appendChild(span);
  newComment.appendChild(span2);
  newComment.appendChild(i);
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

// 코멘트 삭제
const handleDelete = async (event) => {
  const li = event.target.parentNode;
  const commentid = li.dataset.id;
  const response = await fetch(`/api/videos/comments/${commentid}/delete`, {
    method: "DELETE",
  });

  if (response.status === 200) {
    deleteComment(li);
    // location.reload();
  }
};

if (deleteBtn) {
  deleteBtn.forEach(function (currentBtn) {
    currentBtn.addEventListener("click", handleDelete);
  });
}
