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
