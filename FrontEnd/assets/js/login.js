// 4) Création de la page login (avec design)

// 5) Réaliser la partie connexion sur la page login (sauvegarder le token en localStorage)

// Variables
let email = document.getElementById("email");
let password = document.getElementById("password");
const inputLogin = document.querySelector("#loginForm input");
const span = document.querySelector("#loginForm span");
const connexion = document.querySelector("#connexion");

//  Afficher un message d'erreur si la saisie est mauvaise
const errorDisplay = (message, valid) => {
  if (!valid) {
    inputLogin.classList.remove("inputBorderNone");
    inputLogin.classList.add("error");
    password.classList.add("error");
    span.textContent = message;
    span.classList.add("error_span");
  } else {
    inputLogin.classList.add("inputBorderNone");
    inputLogin.classList.remove("error");
    password.classList.remove("error");
    span.textContent = "";
    span.classList.remove("error_span");
  }
};

// Verifier que le format de l'adresse mail est correct
const emailChecker = () => {
  email.addEventListener("input", (e) => {
    const value = e.target.value;
    if (!value.match(/^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      console.log("erreur mail");
      errorDisplay("Erreur dans l’identifiant ou le mot de passe", false);
    } else {
      errorDisplay("", true);
    }
  });
};

// Verifier que le mdp est identique au token
const passwordChecker = () => {
  password.addEventListener("input", (e) => {
    const value = e.target.value;
    if (
      !value.match(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
      )
    ) {
      console.log("erreur password");
      errorDisplay("Erreur dans l’identifiant ou le mot de passe", false);
    } else {
      errorDisplay("", true);
      localStorage.setItem("password", value);
    }
  });
};

// Rediriger vers la paged'acceuil, au click sur le bouton "se connecter", si le token est bon

const connexionSubmit = () => {
  connexion.addEventListener("click", (e) => {
    e.preventDefault();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (
      emailValue.match(/^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/i) &&
      passwordValue.match(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
      )
    ) {
      window.location.href = "logged.html";
    } else {
      window.location.href = "login.html";
    }
  });
};

emailChecker();
passwordChecker();
connexionSubmit();
