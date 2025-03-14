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
    button.id = category.category_id;

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

  if (e.target.innerText === "All") {
    loadVideos();
  } else {
    loadVideoByCategory(e.target.id);
  }
}

function loadVideos() {
  const url =
    "https://openapi.programming-hero.com/api/phero-tube/videos";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos));
}

function displayVideo(videos) {
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
      <div class="col-span-full text-center py-10">
        <img class="block mx-auto" src="./assets/Icon.png" alt="No video found image" />
        <h2 class="font-semibold text-2xl mt-5">Oops!! Sorry, There is no content here!</h2>
      </div>
    `;
    return;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.className = "card bg-base-100 cursor-pointer";

    videoCard.innerHTML = `
      <figure class="!block relative">
        <img
          src="${video.thumbnail}"
          alt="video thumbnail"
          class="h-[200px] w-full"
        />
        <div class="bg-[#171717] text-white inline-block p-1 rounded-md absolute right-[2%] bottom-[5%]">3hrs 56 min ago</div>
      </figure>
      <div class="py-5 flex gap-x-5">
        <div class="avatar !inline-block">
          <div class="w-12 rounded-full object-contain">
            <img src="${video.authors[0].profile_picture}" />
          </div>
        </div>
        <div>
          <h2 class="card-title">
            ${video.title}
          </h2>
            
          <div class="flex gap-x-2">
            <h4 class="text-[#171717]/70 text-[14px]">${
              video.authors[0].profile_name
            }</h4>
            ${
              video.authors[0].verified
                ? `<div>
                  <img src="./assets/badge.png" />
                </div>`
                : ""
            }
          </div>
          <div class="text-[#171717]/70 text-[14px] mt-2">${
            video.others.views
          } views</div>
        </div>
      </div>
      <button onclick="showVideoDetail('${
        video.video_id
      }')" class="btn btn-block btn-neutral hover:bg-red-500 border-0">Show Detail</button>
    `;

    videoContainer.appendChild(videoCard);
  });
}

function loadVideoByCategory(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideo(data.category));
}

function showVideoDetail(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetail(data.video));
}

function displayVideoDetail(video) {
  const modalContainer = document.getElementById("modal_container");
  const modalContent = document.getElementById("modal_content");

  modalContent.innerHTML = `
    <div>
      <div class="card bg-base-100 image-full shadow-sm">
        <figure>
          <img
            src="${video.thumbnail}" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${video.title}</h2>
          <p>${video.description}</p>
        </div>
      </div>
      <div class="mt-5">
        <div class="py-5 flex gap-x-5">
        <div class="avatar !inline-block">
          <div class="w-12 rounded-full object-contain">
            <img src="${video.authors[0].profile_picture}" />
          </div>
        </div>
        <div>
          <div class="flex gap-x-2">
              <h4 class="text-[#171717]/70 text-[14px]">${
                video.authors[0].profile_name
              }</h4>
              ${
                video.authors[0].verified
                  ? `<div>
                    <img src="./assets/badge.png" />
                  </div>`
                  : ""
              }
            </div>
            <div class="text-[#171717]/70 text-[14px] mt-2">${
              video.others.views
            } views</div>
          </div>
      </div>
      </div>
    </div>
  `;

  modalContainer.showModal();
}

loadCategories();
loadVideos();
