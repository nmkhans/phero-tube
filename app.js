const categoryContainer = document.querySelector(
  "#category_container"
);

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

function handleCategoryClick(e) {
  const categoryButtons = document.getElementsByClassName(
    "btn btn-sm"
  );

  for(const button of categoryButtons) {
    if(button.classList.contains("bg-red-500")) {
      button.classList.remove("bg-red-500");
      button.classList.remove("text-white");
      button.classList.add("btn-neutral")
    }
  }

  e.target.classList.remove("btn-neutral");
  e.target.classList.add("bg-red-500", "text-white");
}

loadCategories();
