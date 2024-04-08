let projects = [];
let btnCategories = [];
const gallery = document.querySelector(".gallery");
const categories = document.querySelector(".categories");
const contacts = document.querySelector("#contacts");
const projets = document.querySelector("#projets");
const log = document.querySelector("#buttonLogin");

// Redirige vers la page d'accueil administrateur ou sur la page de login et gère la suppression du token à la déconnexion.
log.addEventListener("click", () => {
  if (log.innerText == "logout") {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  } else {
    window.location.href = "login.html";
  }
});

// Redirection au clic sur les liens dans la nav
contacts.addEventListener("click", () => {
  window.location.href = "#contact"; // Redirection vers la section Contact
});
projets.addEventListener("click", () => {
  window.location.href = "#portfolio"; // Redirection vers la section Mes projets
  // console.log("projets");
});

// Récupération des projets sur l'api
async function getProjects() {
  await fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (projects = data));
  // console.log(projects);
  projectsDisplay();
}
getProjects();

// Affichage des projets
function projectsDisplay() {
  // pour chaque projet, on crée les éléments suivants
  projects.forEach((project) => {
    // console.log(project);
    const item = document.createElement("div");
    const figure = document.createElement("figure");
    const picture = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // on leur donne les valeurs suivantes
    picture.src = project.imageUrl;
    picture.alt = project.title;
    figcaption.innerText = project.title;

    // puis on les ajoute à cet endroit dans le html
    gallery.append(item);
    item.append(figure);
    figure.append(picture);
    figure.append(figcaption);

    item.classList.add("project");
    item.setAttribute("id", project.id);
  });
}

// // Affichage des catégories dans le html
// categories.innerHTML = `
// <div class="filters-container">
// <input class="input-categories input-selected" id="0" type="button" name="Tous" value="Tous">
// <input class="input-categories" id="1" type="button" name="Objets" value="Objets">
// <input class="input-categories" id="2" type="button" name="Appartements" value="Appartements">
// <input class="input-categories" id="3" type="button" name="Hotels & Restaurants" value="Hotels & Restaurants">
// </div>
// `;

// Recupérer les catégories
async function getCategories() {
  await fetch("http://localhost:5678/api/categories", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (btnCategories = data));
  // console.log(btnCategories);
  btnCategoriesDisplay();
}
getCategories();

// Affichage des boutons de catégories
function btnCategoriesDisplay() {
  // Crée un container
  const filtersContainer = document.createElement("div");
  categories.append(filtersContainer);
  filtersContainer.classList.add("filters-container");

  // Crée le bouton de filtre "Tous"
  const input = document.createElement("input");
  filtersContainer.append(input);
  input.classList.add("input-categories");
  input.classList.add("input-selected");
  input.setAttribute("id", 0);
  input.setAttribute("type", "button");
  input.setAttribute("value", "Tous");

  // pour chaque catégorie, on crée les éléments suivants
  btnCategories.forEach((btnCategory) => {
    const inputCategories = document.createElement("input");
    inputCategories.classList.add("input-categories");

    // on leur donne les valeurs suivantes
    inputCategories.id = btnCategory.id;
    inputCategories.name = btnCategory.name;
    inputCategories.value = btnCategory.name;

    // puis on les ajoute à cet endroit dans le html
    filtersContainer.append(inputCategories);
    inputCategories.setAttribute("type", "button");
  });
  filterCategories();
}

// Filtrer les projets en cliquant sur les catégories
function filterCategories() {
  const inputCategories = document.querySelectorAll(".input-categories");
  inputCategories.forEach((inputCategory) => {
    inputCategory.addEventListener("click", (e) => {
      // console.log(e.target.id);

      // changer la couleur du bouton du filtre séléctionné
      inputCategories.forEach((category) => {
        category.classList.remove("input-selected");
      });
      e.target.classList.add("input-selected");

      // Affichage de la catégorie selectionnée
      if (e.target.value === "Tous") {
        gallery.innerHTML = "";
        projectsDisplay();
      } else {
        const filteredProjects = projects.filter(
          (project) => project.categoryId === parseInt(e.target.id)
        );
        gallery.innerHTML = "";
        filteredProjects.forEach((project) => {
          const figure = document.createElement("figure");
          const picture = document.createElement("img");
          const figcaption = document.createElement("figcaption");

          picture.src = project.imageUrl;
          picture.alt = project.title;
          figcaption.innerText = project.title;

          gallery.append(figure);
          figure.append(picture);
          figure.append(figcaption);
        });
      }
    });
  });
}
filterCategories();
