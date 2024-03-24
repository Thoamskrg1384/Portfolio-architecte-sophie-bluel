// Création de la modale dans le html
const modale = document.createElement("div");
document.body.append(modale);
modale.id = "modale";
modale.classList.add("modale");

// Création de lseconde modale dans le html
const modale2 = document.createElement("div");
document.body.append(modale2);
modale2.id = "modale2";
modale2.classList.add("modale2");

// Variables pour l'importation des projets
let modaleProjects = [];
let modaleGallery;

// Composition modale de base
const firstModale = function () {
  modale.innerHTML = `
    <div id="modaleContent" class="modale-content">
      <span id="spanClose" class="close">&times;</span>
      <h3>Galerie photo</h3>
      <div class="modaleGallery"></div>
      <div class="gray-line"></div>
      <button id="btnAddPic" class="btnAddPic">Ajouter une photo</button>
    </div>
  `;
  // Récupérer l'élément modaleGallery après l'avoir ajouté au DOM
  modaleGallery = document.querySelector(".modaleGallery");

  // Récupérer l'élément <span> qui ferme la modale
  const spanClose = document.querySelector("#spanClose");

  // Récupérer l'élément <button> qui permet d'ajouter une photo
  const btnAddPic = document.querySelector("#btnAddPic");

  // Quand on clique sur <span> (x), fermer la modale
  spanClose.addEventListener("click", () => {
    modale.style.display = "none";
    window.location.reload();
  });
  // Quand on clique sur l'élément <button>, afficher la deuxième modale
  btnAddPic.addEventListener("click", () => {
    modale.style.display = "none";
    modale2.style.display = "flex";

    console.log("test ajout photo");
  });

  // Afficher les projets dans la modale après avoir créé les éléments de la modale
  modaleProjectsDisplay(modaleGallery);
};
// ---------------------------------------------------------------------------------------------------------------------------

// Composition modale de base
const secondModale = function () {
  modale2.innerHTML = `
    <div id="modaleContent" class="modale-content">
      <span id="spanClose" class="close">&times;</span>
      <span id="spanBack"><i class="fa-solid fa-arrow-left arrow"></i></span>
      <h3>Ajout photo</h3>
      <div class="addPicContainer">
          <img src="#" class="imageDisplay" id="imageDisplay" alt="image choisie" style="display: none;">
          <span id="iconPic" class="iconPic"><i class="fa-regular fa-image"></i></span>
          <input type="file" name="addPicInput" class="addPicInput" id="addPicInput">
          <label id="addPicLabel" class="addPicLabel" for="addPicInput">+ Ajouter photo</label>
          <p id="addPicTxt">jpg, png : 4mo max</p>
      </div>
      <div class="inputContainer">
          <label for="inputTitle">Titre</label>
          <input type="text" name="title" id="inputTitle">
          <label for="inputCategory">Catégorie</label>
          <select id="selection" class="selection">
              <option value="Objets">Objets</option>
              <option value="Appartements">Appartements</option>
              <option value="Hotels & Restaurants">Hotels & Restaurants</option>
          </select>
      </div>
      <div class="gray-line"></div>
      <input type="submit" id="btnPost" class="btnPost" value="Valider">
    </div>
  `;

  // Récupérer l'élément <span> qui ferme la modale
  const spanClose = document.querySelector("#spanClose");

  // Récupérer l'élément <button> qui permet d'ajouter une photo
  const btnPost = document.querySelector("#btnPost");

  // Récupérer l'élement <span> spanBack, qui permet d'afficher la modale précedente.
  const spanBack = document.querySelector("#spanBack");

  // Récupérer l'input de type file
  const addPicInput = document.querySelector("#addPicInput");

  // Récupérer l'élément image où on veut afficher l'image séléctionnée
  const imageDisplay = document.querySelector("#imageDisplay");

  // Des qu'on selectionne une image, l'afficher et masquer le reste du container
  addPicInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      imageDisplay.src = e.target.result;
      imageDisplay.style.display = "flex";
      iconPic.style.display = "none";
      addPicLabel.style.display = "none";
      addPicTxt.style.display = "none";
    });
    reader.readAsDataURL(file);
  });

  // Quand on clique sur l'élement <span> spanBack, afficher la modale précedente.
  spanBack.addEventListener("click", () => {
    modale.style.display = "flex";
    modale2.style.display = "none";
  });

  // Quand on clique sur <span> (x), fermer la modale
  spanClose.addEventListener("click", () => {
    modale2.style.display = "none";
    window.location.reload();
  });
  // Quand on clique sur l'élément <button>, afficher la deuxième modale
  btnPost.addEventListener("click", () => {
    modale2.style.display = "none";
    console.log("test envoi photo");
  });
};
secondModale();
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

    // Ajouter l'ID du projet comme attribut de données à l'icône "supprimer"
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

    deleteIcon.addEventListener("click", () => {
      deleteWork(modaleProject.id);
    });
  });
}

// Quand on clique n'importe où en dehors de la modale, la fermer
window.addEventListener("click", (e) => {
  if (e.target == modale) {
    modale.style.display = "none";
    window.location.reload();
  }
});

// Idem pour la seconde modale
window.addEventListener("click", (e) => {
  if (e.target == modale2) {
    modale2.style.display = "none";
    window.location.reload();
  }
});

// Fonction qui permet de supprimer les projets de la modale
const deleteIcons = document.querySelectorAll(".deleteSpan");

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
    console.log("work delete", response);

    // Supprimer le projet de la liste modaleProjects
    const index = modaleProjects.findIndex(
      (project) => project.id === projectId
    );
    if (index !== -1) {
      modaleProjects.splice(index, 1);

      // Recharge l'affichage des projets dans la modale
      modaleGallery.innerHTML = "";
      modaleProjectsDisplay(modaleGallery);
    }

    // Recharge l'affichage des projets dans le portfolio
    const deletedProject = document.querySelector(
      `[data-project-id="${projectId}"]`
    );
    if (deletedProject) {
      deletedProject.remove();
    }
  });
};
