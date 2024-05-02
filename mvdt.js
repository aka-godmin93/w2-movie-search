document.addEventListener("DOMContentLoaded", () => {
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ URL에서 정보추출 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const overview = params.get("overview");
  const score = params.get("score");
  const posterUrl = params.get("posterUrl");

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ HTML에 옮겨담기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
  document.getElementById("movieTitle").textContent = title;
  document.getElementById("movieOverview").textContent = overview;
  document.getElementById("movieScore").textContent = "Average Score: " + score;
  document.getElementById("posterImage").src = posterUrl;
});
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 리뷰 등록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
function submitReview() {
  const author = document.getElementById("cmtId").value;
  const review = document.getElementById("reviewContent").value;
  const password = document.getElementById("cmtPw").value;

  const newReview = {
    id: Date.now(),
    author: author,
    review: review,
    password: password,
  };

  let reviews = localStorage.getItem("reviews");
  reviews = reviews ? JSON.parse(reviews) : [];
  reviews.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  displayReviews();
  resetForm();
}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 리뷰 표시 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
function displayReviews() {
  const reviewsDiv = document.getElementById("reviews");
  reviewsDiv.innerHTML = "";

  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.forEach((review) => {
    const reviewDiv = document.createElement("div");
    reviewDiv.innerHTML = `
          <p><strong>${review.author}</strong>: ${review.review}</p>
          <button onclick="editReview(${review.id})">Edit</button>
          <button onclick="deleteReview(${review.id})">Delete</button>
      `;
    reviewsDiv.appendChild(reviewDiv);
  });
}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  리뷰 수정 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
function editReview(id) {
  const newReview = prompt("Enter your edited review:");
  if (newReview === null || newReview.trim() === "") return;

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const index = reviews.findIndex((review) => review.id === id);
  if (index !== -1) {
    reviews[index].review = newReview;
    localStorage.setItem("reviews", JSON.stringify(reviews));
    displayReviews();
  }
}

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 리뷰 삭제 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
function deleteReview(id) {
  const confirmDelete = confirm("Are you sure you want to delete this review?");
  if (!confirmDelete) return;

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews = reviews.filter((review) => review.id !== id);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  displayReviews();
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 입력폼 초기화 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
function resetForm() {
  document.getElementById("cmtId").value = "";
  document.getElementById("reviewContent").value = "";
  document.getElementById("cmtPw").value = "";
}

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 페이지 로드 시 이전에 작성된 리뷰를 표시 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
displayReviews();
