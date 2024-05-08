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
