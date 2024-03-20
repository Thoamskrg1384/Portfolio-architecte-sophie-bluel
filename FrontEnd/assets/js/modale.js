// Création de la modale dans le html
const modale = document.createElement("div");
document.body.append(modale);
modale.id = "modale";
modale.classList.add("modale");

// Variables pour l'importation des projets
let modaleProjects = [];
let modaleGallery;

// Composition modale de base
const firstModale = function () {
  modale.innerHTML = `
    <div id="modaleContent" class="modale-content">
      <span id="spanClose" class="close">&times;</span>
      <span id="spanBack"><i class="fa-solid fa-arrow-left arrow"></i></span>
      <h3>Galerie photo</h3>
      <div class="modaleGallery"></div>
      <button id="btnAddPic" class="btnAddPic">Ajouter une photo</button>
    </div>
  `;
  // Récupérer l'élément modaleGallery après l'avoir ajouté au DOM
  modaleGallery = document.querySelector(".modaleGallery");

  // Création ligne grise
  const modaleContent = document.querySelector("#modaleContent");
  const grayLine = document.createElement("div");
  grayLine.classList.add("gray-line");
  modaleContent.append(grayLine);

  // Récupérer l'élément <span> qui ferme la modale
  const spanClose = document.querySelector("#spanClose");

  // Récupérer l'élément <button> qui permet d'ajouter une photo
  const btnAddPic = document.querySelector("#btnAddPic");

  // Récupérer l'élement <span> spanBack, qui permet d'afficher la modale précedente.
  const spanBack = document.querySelector("#spanBack");

  // Quand on clique sur l'élement <span> spanBack, afficher la modale précedente.
  spanBack.addEventListener("click", () => {
    firstModale();
  });
  // Quand on clique sur <span> (x), fermer la modale
  spanClose.addEventListener("click", () => {
    modale.style.display = "none";
  });
  // Quand on clique sur l'élément <button>, afficher la deuxième modale
  btnAddPic.addEventListener("click", () => {
    console.log("test ajout photo");
  });

  // Afficher les projets dans la modale après avoir créé les éléments de la modale
  modaleProjectsDisplay(modaleGallery);
  deleteProjects();
};

// Récupérer les projets
function getWorks() {
  fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // Mettre à jour les projets uniquement lorsque de nouveaux projets sont récupérés
      modaleProjects.splice(0, modaleProjects.length, ...data);
      firstModale();
    })
    .catch((error) => console.error("Error fetching works:", error));
}
getWorks();

// Afficher les projets dans la modale
function modaleProjectsDisplay(modaleGallery) {
  // pour chaque projet, on crée les éléments suivants
  modaleProjects.forEach((modaleProject) => {
    const figure = document.createElement("figure");
    const projectContainer = document.createElement("div");
    const picture = document.createElement("img");
    const deleteIcon = document.createElement("span");

    // on leur donne les valeurs suivantes
    picture.src = modaleProject.imageUrl;
    picture.alt = modaleProject.title;

    // Ajouter l'ID du projet comme attribut de données à l'icône "suprimer"
    deleteIcon.dataset.projectId = modaleProject.id;

    // puis on les ajoute à cet endroit dans le html
    modaleGallery.append(projectContainer);
    projectContainer.append(figure);
    projectContainer.append(deleteIcon);
    figure.append(picture);
    deleteIcon.classList.add("deleteSpan");
    deleteIcon.innerHTML = `
    <i class="fa-solid fa-trash-can trash"></i>
    `;
    projectContainer.classList.add("galleryItems");
  });
}

// Quand on clique n'importe où en dehors de la modale, la fermer
window.addEventListener("click", (e) => {
  if (e.target == modale) {
    modale.style.display = "none";
  }
});

const deleteProjects = function () {
  const deleteIcons = document.querySelectorAll(".deleteSpan");
  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", (e) => {
      const projectId = e.target.dataset.projectId; //Récupérer l'ID du projet
      console.log(e.target);
      deleteWork(projectId); //Appel de deleteWork avec l'ID du projet à supprimer
    });
  });
};
const deleteWork = function (projectId) {
  const token = localStorage.getItem("token"); // On récupère le token pour autoriser la suppression
  const idToDelete = projectId;

  fetch(`http://localhost:5678/api/works/${idToDelete}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, // On envoie le token dans le header
      "Content-Type": "application/json",
    },
  }).then((response) => {
    console.log(response);
  });
};
