let Genre = "音楽";

const key = "AIzaSyClFvpitcXamidqH3lf2UR9CQA8Wp2ScSQ"; // 自分のキーに書き換えます。
const num = 5;
const part = "snippet";
const type = "video";
const query = Genre;
fetch(
  `https://www.googleapis.com/youtube/v3/search?type=${type}&part=${part}&maxResults=${num}&key=${key}&q=${query}&playsinline=1`
)
  .then((data) => {
    if (!data.ok) {
      throw new Error("Network response was not ok");
    }
    return data.json();
  })
  .then((obj) => {
    // 動画情報を表示するコンテナを選択または作成
    const container = document.querySelector(".card");
    container.innerHTML = ""; // コンテナをクリア

    for (let movie of obj["items"]) {
      // 各videoIdとタイトル、サムネイル画像を取得して変数に代入
      const ytId = movie["id"]["videoId"];
      const ytTitle = movie["snippet"]["title"];
      const ytImage = movie["snippet"]["thumbnails"]["default"]["url"];

      // カード要素を作成
      const card = document.createElement("div");
      card.classList.add("card-item");

      const Item = document.createElement("div");
      Item.classList.add("card__content");
      Item.setAttribute("data-youtube-id", ytId);
      // 画像を表示する要素を作成
      const imageElement = document.createElement("img");
      imageElement.classList.add("card__image");
      imageElement.src = ytImage;

      // タイトルを表示する要素を作成
      const titleElement = document.createElement("h3");
      titleElement.classList.add("card__title");
      titleElement.textContent = ytTitle;

      Item.appendChild(titleElement);
      Item.appendChild(imageElement);

      card.appendChild(Item);

      // 作成したカードをコンテナに追加
      container.appendChild(card);

      container.addEventListener("click", (e) => {
        if (e.target.closest(".card__content")) {
          const youtubeId = e.target
            .closest(".card__content")
            .getAttribute("data-youtube-id");
          window.location.href = `movie.html?youtubeId=${youtubeId}`; // YouTube IDをクエリパラメータとしてmovie.htmlに渡す
        }
      });
    }
  });

const Search = document.querySelector(".search");
const SearchBtn = document.querySelector(".header__search");
const Find = document.querySelector(".find");

SearchBtn.addEventListener("click", function () {
  Find.classList.toggle("display");
});

const SearchInput = document.querySelector(".search__input");
const SearchSubmit = document.querySelector(".search__btn");

SearchSubmit.addEventListener("click", function () {
  console.log(SearchInput.value);
  window.location.href = `result.html?Keyword=${SearchInput.value}`;
});
