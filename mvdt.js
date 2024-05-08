document.addEventListener("DOMContentLoaded", () => {
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ URL에서 정보추출 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const overview = params.get("overview");
  const score = params.get("score");
  const posterUrl = params.get("posterUrl");
  const movieId = params.get("movieId");

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ HTML에 옮겨담기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
  document.getElementById("movieTitle").textContent = title;
  document.getElementById("movieOverview").textContent = overview;
  document.getElementById("movieScore").textContent = "Average Score: " + score;
  document.getElementById("posterImage").src = posterUrl;

  //-----------------------------------등장인물 api 가져오기-----------------------------------//
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjRiY2YyNWI3OTM3ZWVlMGVjYWRjOGM4ZjE1YjJmNSIsInN1YiI6IjY2MmIxNTQ4OWFjNTM1MDExYjhmMDU0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M1r320lu2Si701H2m4OWV8IeELv2hByZoQBWZnou36Q",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((data) => makeCard(data))
    .catch((err) => console.error(err));

  function makeCard(data) {
    makeActor(data.cast);
    makeDirector(data.crew);
  }

  //----------------------등장인물 정보 넣기----------------------------

  function makeActor(actors) {
    const actorCard = document.querySelector("#actorCard");
    actorCard.innerHTML = "";

    actors.forEach(function (actor) {
      const cardBox = document.createElement("div");
      cardBox.classList.add("actCard");

      const profileUrl =
        actor.profile_path !== null
          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
          : "https://placehold.jp/696969/ffffff/300x450.png?text=NO%20IMAGE";

      cardBox.innerHTML = `
      <div class="imgBox">
                <img src="${profileUrl}"><div/>
                <div class="actInfo">
                    <h4 class="actName">${actor.name}</h4>
                    <p class="actCharacter">${actor.character}</p>
                </div> `;

      actorCard.appendChild(cardBox);
    });
  }

  //----------------------감독 정보 넣기----------------------------

  function makeDirector(crews) {
    const directorCard = document.querySelector("#directorCard");
    directorCard.innerHTML = "";

    crews.forEach(function (director) {
      const cardBox = document.createElement("div");
      if (director.job === "Director") {
        cardBox.classList.add("drcCard");
        cardBox.innerHTML = `
                <div class="imgBox">
                <img src="https://image.tmdb.org/t/p/w500${director.profile_path}"></div>
                <div class="drcInfo">
                    <h4 class="drcName">${director.name}</h4>
                </div> `;

        directorCard.appendChild(cardBox);
      }
    });
  }
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
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 페이지 로드 시 이전에 작성된 리뷰부분를 표시 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
//displayReviews();
displayControl("reviewPart");

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 리뷰 및 출연진 표시버튼 js ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
function displayControl(str) {
  if (str === "reviewPart") {
    document.getElementById("actorPart").style = "display:none";
    document.getElementById("reviewPart").style = "";
  } else if (str === "actorPart") {
    document.getElementById("actorPart").style = "";
    document.getElementById("reviewPart").style = "display:none";
  }
}
