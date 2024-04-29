document.addEventListener("DOMContentLoaded", () => {
    function fetchTMDB(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => makeCard(data.results))
            .catch((error) => console.error(error));
    }

    const 영화카드 = document.querySelector("#movieCard");

    function makeCard(movies) {
        영화카드.innerHTML = "";

        movies.forEach(function (movie) {
            const 카드틀 = document.createElement("div");
            카드틀.classList.add("mvcCard");

            const posterUrl = movie.poster_path !== null ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://placehold.jp/696969/ffffff/300x450.png?text=NO%20IMAGE";

            // 영화 id데이터를 이미지에 세팅
            카드틀.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title}" data-movieId="${movie.id}">
                <div class="mvcInfo">
                    <h2 class="mvcTitle">${movie.title}</h2>
                    <p class="mvcOverview">${movie.overview}</p>
                    <p class="mvcScore">Average Score: ${movie.vote_average}</p>
                </div>
            `;

            영화카드.appendChild(카드틀);
        });

        // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 클릭시 ID ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
        const 이미지클릭 = document.querySelectorAll(".mvcCard img");
        이미지클릭.forEach(function (image) {
            image.addEventListener("click", function () {
                const movieTitle = image.getAttribute("alt");
                const movieId = image.getAttribute("data-movieId");
                alert(`
                Movie Title : ${movieTitle}
                Movie ID : ${movieId}`);
            });
        });
    }

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 평점 높은 영화 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    fetchTMDB("https://api.themoviedb.org/3/movie/top_rated?api_key=de30b78e5d14a77a302cb1aa2c0ceb6b&language=en-US");

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 영화 검색 함수 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    const 검색창 = document.querySelector("#searchText");

    function 영화검색() {
        const 검색어 = 검색창.value.toLowerCase();
        if (검색어 !== "") {
            fetchTMDB(`https://api.themoviedb.org/3/search/movie?query=${검색어}&api_key=de30b78e5d14a77a302cb1aa2c0ceb6b`);
        } else {
            alert("Enter your search term");
        }
    }

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 클릭 검색 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    const 검색버튼 = document.querySelector("#searchBtn");

    검색버튼.addEventListener("click", function () {
        영화검색();
    });

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 엔터 검색 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    검색창.addEventListener("keydown", function (엔터) {
        if (엔터.key === "Enter") {
            영화검색();
        }
    });
});
