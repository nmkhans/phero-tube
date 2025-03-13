const categoryContainer = document.querySelector(
  "#category_container"
);
const videoContainer = document.querySelector("#video_container");

function loadCategories() {
  const url =
    "https://openapi.programming-hero.com/api/phero-tube/categories";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  for (let category of categories) {
    const button = document.createElement("button");
    button.innerText = category.category;
    button.className = "btn btn-neutral btn-sm";

    categoryContainer.appendChild(button);
  }

  const categoryButtons = document.getElementsByClassName(
    "btn btn-neutral btn-sm"
  );

  for (let button of categoryButtons) {
    button.addEventListener("click", handleCategoryClick);
  }
}

function handleButtonColorChange(e) {
  const categoryButtons =
    document.getElementsByClassName("btn btn-sm");

  for (const button of categoryButtons) {
    if (button.classList.contains("bg-red-500")) {
      button.classList.remove("bg-red-500");
      button.classList.remove("text-white");
      button.classList.add("btn-neutral");
    }
  }

  e.target.classList.remove("btn-neutral");
  e.target.classList.add("bg-red-500", "text-white");
}

function handleCategoryClick(e) {
  handleButtonColorChange(e);
}

function loadVideos() {
  const url =
    "https://openapi.programming-hero.com/api/phero-tube/videos";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos));
}

/*

<div class="card bg-base-100 w-96 shadow-sm">
  
</div>
*/

function displayVideo(videos) {
  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.className = "card bg-base-100 shadow-sm";

    videoCard.innerHTML = `
      <figure>
        <img
          src="${video.thumbnail}"
          alt="video thumbnail"
          class="h-[200px]"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          Card Title
        </h2>
        
        <div class="card-actions justify-end">
          <div class="badge badge-outline">Fashion</div>
          <div class="badge badge-outline">Products</div>
        </div>
      </div>
    `;

    videoContainer.appendChild(videoCard)
  });
}

loadCategories();
loadVideos();
