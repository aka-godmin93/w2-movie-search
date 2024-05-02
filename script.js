document.addEventListener("DOMContentLoaded", () => {
    function fetchTMDB(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => makeCard(data.results))
            .catch((error) => console.error(error));
    }

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 카드 생성 함수 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    function makeCard(movies) {
        const movieCard = document.querySelector("#movieCard");
        movieCard.innerHTML = "";

        movies.forEach(function (movie) {
            const cardBox = document.createElement("div");
            cardBox.classList.add("mvcCard");

            const posterUrl = movie.poster_path !== null ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://placehold.jp/696969/ffffff/300x450.png?text=NO%20IMAGE";

            // 영화 디테일 데이터를 이미지에 전부 세팅
            cardBox.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title}" data-movieId="${movie.id}" data-movieOverview="${movie.overview}" data-movieScore="${movie.vote_average}">
                <div class="mvcInfo">
                    <h2 class="mvcTitle">${movie.title}</h2>
                    <p class="mvcOverview">${movie.overview}</p>
                    <p class="mvcScore">Average Score: ${movie.vote_average}</p>
                </div>
            `;

            movieCard.appendChild(cardBox);
        });

        // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 디테일 표시 사항 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
        const movieImage = document.querySelectorAll(".mvcCard img");
        movieImage.forEach(function (image) {
            image.addEventListener("click", function () {
                const movieId = image.getAttribute("data-movieId");
                const movieTitle = image.getAttribute("alt");
                const movieOverview = image.getAttribute("data-movieOverview");
                const movieScore = image.getAttribute("data-movieScore");
                const posterUrl = image.getAttribute("src");
                detailInfo(movieId, movieTitle, movieOverview, movieScore, posterUrl);
            });
        });
    }

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ URL에 쑤셔넣자 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    function detailInfo(movieId, movieTitle, movieOverview, movieScore, posterUrl) {
        const mvdtUrl = `mvdt.html?movieId=${movieId}&title=${movieTitle}&overview=${movieOverview}&score=${movieScore}&posterUrl=${posterUrl}`;
        window.location.href = mvdtUrl;
    }

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 평점 높은 영화 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    fetchTMDB("https://api.themoviedb.org/3/movie/top_rated?api_key=de30b78e5d14a77a302cb1aa2c0ceb6b&language=en-US");

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 영화 검색 함수 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    function movieSearch() {
        const searchText = document.querySelector("#searchText").value.toLowerCase();
        if (searchText !== "") {
            fetchTMDB(`https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=de30b78e5d14a77a302cb1aa2c0ceb6b`);
        } else {
            alert("Enter your search term");
        }
    }

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 클릭 검색 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    const searchBtn = document.querySelector("#searchBtn");
    searchBtn.addEventListener("click", function () {
        movieSearch();
    });

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 엔터 검색 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    const searchText = document.querySelector("#searchText");
    searchText.addEventListener("keydown", function (enter) {
        if (enter.key === "Enter") {
            movieSearch();
        }
    });
});
