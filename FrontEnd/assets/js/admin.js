const userConnected = localStorage.getItem("token");
console.log(userConnected);
const editionMode = document.getElementById("edition-mode");
console.log(editionMode);
// Si on est connecté
if (userConnected) {
  console.log("user connected");

  // Apparition du bandeau noir dans le header
  const span = document.createElement("span");
  editionMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
  editionMode.append(span);
  span.innerHTML = "Mode édition";
  span.classList.add("adminHeaderSpan");
  editionMode.classList.add("adminHeader");

  // 1/ Modification de la navigation login => logout
  const logNav = document.getElementById("log");
  logNav.innerText = "Logout";

  // 2/ Création des boutons "accès administration"
  const btnModaleContainer = document.createElement("div");
  portfolio.insertBefore(btnModaleContainer, categories);
  btnModaleContainer.id = "btnModaleContainer";
  btnModaleContainer.classList.add("btnModaleContainer");

  const openBtnModale = document.createElement("div");
  btnModaleContainer.append(openBtnModale);
  openBtnModale.innerHTML = `<i class="fa-regular fa-pen-to-square padding10"></i>Modifier`;
  openBtnModale.classList.add("buttonModale");
  openBtnModale.classList.add("buttonModale:hover");

  // 3/ Listeners au click sur les bouton pour afficher les modals

  // Ouverture de la modale au click sur le bouton "Modifier"
  openBtnModale.addEventListener("click", () => {
    console.log("test ouverture modals");
    modale.style.display = "flex";
  });

  // Logique des modales

  // Déconnexion et retour à la page d'accueil
  const logout = document.getElementById("log");
  logout.addEventListener("click", () => {
    if ((logout.value = "logout")) {
      console.log("déconnexion");
      localStorage.removeItem("token");
      window.location.href = "index.html";
    }
  });
}

//TODO : 1, 2, 3 et créer la modal des projets + si possible la remplir avec les projets
