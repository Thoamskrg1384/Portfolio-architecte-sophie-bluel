const logout = document.querySelector("#log");
const btnModale = document.querySelector("#btnModale");
console.log(btnModale);
// Redirection vers la page d'acceuil au click sur logout
logout.addEventListener("click", () => {
  window.location.href = "index.html";
});

//  Disparition des catégories
categories.innerHTML = "";

// ouvrir la modale
btnModale.addEventListener("click", () => {
  console.log("j'ouvre la modale");
});
