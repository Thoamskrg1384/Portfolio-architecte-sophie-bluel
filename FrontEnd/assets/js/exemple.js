// Déclaration de fonction

/**
 * Retourne TRUE / FALSE si l'utilisateur est connecté
 */
function isUserConnected() {
  const token = localStorage.getItem("token");

  if (token) {
    return true;
  } else {
    return false;
  }
}

/**
 * Modifie l'affichage dans la navigation du bouton login
 */
function toggleButtonLogout() {
  const buttonLogin = document.querySelector("#buttonLogin");
  buttonLogin.innerText = "logout";
}

/**
 * Créer les boutons d'administration et les affiches sur la page
 */
function createAdminButtons() {
  // Création de la banner
  const banner = document.createElement("div");
  banner.classList.add("banner-edit");
  banner.innerHTML = `<div>
    <span>Administration</span>
  </div>`;

  // Création du bouton modifier
  const button = document.createElement("button");
  button.classList.add("btn-edit");
  button.innerHTML = `<span>Administration</span>`;

  // Ajout dans le DOM
  const editionMode = document.querySelector("#editionMode");
  editionMode.append(banner);

  const editAdmin = document.querySelector("#editAdmin");
  editAdmin.append(button);

  // Events : affiche la modal works
  banner.addEventListener("click", createModalWorks);
  button.addEventListener("click", createModalWorks);
}

/**
 * Récupère les projets
 */
async function getWorks() {
  let works = [];

  await fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      works = data;
    });

  return works;
}

/**
 * Suppression de l'affichagte sur la page d'accueil + suppression affichage dans la modale
 */
function removeDisplayWork(id) {}

/**
 * Suppression d'un projet
 */
function removeWork(id) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    removeDisplayWork(id);
  });
}

/**
 * Créer la modal des projets et l'affiche sur la page
 */
async function createModalWorks() {
  const spaceModals = document.querySelector("#spaceModals");

  // Création de la modale
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", "modalWorks");
  modal.innerHTML = ``;
  spaceModals.append(modal); // Ajout de la modale dans le DOM

  // Création de l'intérieur de la modale
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.innerHTML = ``;
  modal.append(modalContent); // Ajout de l'intérieur de la modale dans la modale

  // Remplissage de la modale avec les projets
  const works = await getWorks();
  works.forEach((work) => {
    // Création de la div d'un projet
    const item = document.createElement("div");
    item.classList.add("work");
    item.innerHTML = `
      <img src="" alt="" />
    `;
    modalContent.append(item); // Ajout de l'affichage du projet dans la modale

    const button = document.createElement("button");
    button.classList.add("btnWorkRemove");
    button.innerHTML = "Supprimer";
    item.append(button); // AJout du boutton à la fin de l'affichage du work

    // Event : Suppression d'un projet
    button.addEventListener("click", () => {
      removeWork(work.id);
    });
  });

  // Event : passage à la modale suivante
  //1- Créer le bouton "ajout d'un projet" et l'ajouter dans la modale
  //2- event au click sur le bouton (removeModalWorks + createModalForm)
}

/**
 * Supprime la modal des projets
 */
function removeModalWorks() {
  const modal = document.querySelector("#modalWorks");
  modal.remove();
}

/**
 * Envoi des données pour création d'un projet
 */
function submitForm() {}

/**
 * Créer la modal du formulaire et l'affiche sur la page
 */
function createModalForm() {
  // Affichage du contenu (formulaire)
  // Event : Envoi du formulaire (submitForm)
  // Event : Passage à la première modale (removeModalForm + createModalWorks)
}

/**
 * Supprime la modal du formulaire
 */
function removeModalForm() {}

// Execution du code
if (isUserConnected()) {
  toggleButtonLogout();
  createAdminButtons();
}
