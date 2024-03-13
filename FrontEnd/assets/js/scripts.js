let projects = [];
const gallery = document.querySelector(".gallery");
console.log(gallery);
const categories = document.querySelector(".categories");
console.log(categories);

const log = document.querySelector("#log");
log.addEventListener("click", () => {
  window.location.href = "login.html";
});

// Récupération des projets sur l'api
async function fetchProjectsData() {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (projects = data));
  console.log(projects);
  projectsDisplay();
}
fetchProjectsData();

// Affichage des projets
function projectsDisplay() {
  // pour chaque projet, on crée les éléments suivants
  projects.forEach((project) => {
    console.log(project);
    const figure = document.createElement("figure");
    const picture = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // on leur donne les valeurs suivantes
    picture.src = project.imageUrl;
    picture.alt = project.title;
    figcaption.innerText = project.title;

    // puis on les ajoute à cet endroit dans le html
    gallery.append(figure);
    figure.append(picture);
    figure.append(figcaption);
  });
}

// Affichage des catégories dans le html
categories.innerHTML = `
<div class="filtersContainer">
<input class="inputCategories inputSelected" id="0" type="button" name="Tous" value="Tous">
<input class="inputCategories" id="1" type="button" name="Objets" value="Objets">
<input class="inputCategories" id="2" type="button" name="Appartements" value="Appartements">
<input class="inputCategories" id="3" type="button" name="Hotels & Restaurants" value="Hotels & Restaurants">
</div>
`;
// -----------------------------------------------------
// // Filtrer les projets en cliquant sur les catégories
// tentative ultra foireuse

// function filterCategories() {
//   const inputCategories = document.querySelectorAll(".inputCategories");
//   inputCategories.forEach((inputCategory) => {
//     inputCategory.addEventListener("click", (e) => {
//       console.log(e.target.id);
//       if (e.target.value === "Tous") {
//         projectsDisplay();
//       } else if (e.target.value === "Objets") {
//         gallery.innerHTML = "";
//         projects.filter((projects.categoryId = 2));
//         projectsDisplay();
//       } else if (e.target.value === "Appartements") {
//         gallery.innerHTML = "";
//         projects.filter((projects.categoryId = 3));
//         projectsDisplay();
//       } else if (e.target.value === "Hotels & Restaurants") {
//         gallery.innerHTML = "";
//         projects.filter((projects.categoryId = 4));
//         projectsDisplay();
//       }
//     });
//   });
// }

// filterCategories();
// --------------------------------------------------------------

// Filtrer les projets en cliquant sur les catégories
function filterCategories() {
  const inputCategories = document.querySelectorAll(".inputCategories");
  inputCategories.forEach((inputCategory) => {
    inputCategory.addEventListener("click", (e) => {
      console.log(e.target.id);

      // changer la couleur du bouton du filtre séléctionné
      inputCategories.forEach((category) => {
        category.classList.remove("inputSelected");
      });
      e.target.classList.add("inputSelected");

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
