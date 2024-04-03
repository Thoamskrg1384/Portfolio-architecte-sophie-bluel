//  Variables

let email = document.getElementById("email");
let password = document.getElementById("password");
const inputLogin = document.querySelector("#loginForm input");
const span = document.querySelector("#loginForm span");
const formLogin = document.querySelector("#loginForm");

const logo = document.querySelector("#logo");
const contacts = document.querySelector("#contacts");
const projets = document.querySelector("#projets");
const token = localStorage.getItem("token");

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

/**
 * Verifier que le format de l'adresse mail est correct
 */
const emailChecker = (value) => {
  if (!value.match(/^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("Erreur dans l’identifiant", false);
    return false;
  } else {
    errorDisplay("", true);
    return true;
  }
};
email.addEventListener("input", (e) => {
  const value = e.target.value;
  emailChecker(value);
  // console.log(e.target.value);
});

// Verifier que le mdp est valide
const passwordChecker = (value) => {
  if (!value.match("S0phie")) {
    errorDisplay("Erreur dans le mot de passe", false);
    return false;
  } else {
    errorDisplay("", true);
    return true;
  }
};
password.addEventListener("input", (e) => {
  const value = e.target.value;
  passwordChecker(value);
  // console.log(e.target.value);
});

// Rediriger vers la page d'acceuil, au click sur le bouton "se connecter", si le token est bon

const connexionSubmit = (emailValue, passwordValue) => {
  const dataToSend = {
    email: "sophie.bluel@test.tld",
    password: "S0phie",
  };
  if (emailChecker(emailValue) && passwordChecker(passwordValue)) {
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then((response) => {
        // Il y a eun problème, on stop les then avec une erreur qui va dans le catch
        if (response.status !== 200) {
          throw new Error("Une erreur est survenue");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      })
      .catch((err) => {
        errorDisplay("Une erreur est survenue", false);
      });
  }
};

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  connexionSubmit(emailValue, passwordValue);
});

// Actions au clic sur les liens dans la nav
logo.addEventListener("click", () => {
  // Click sur le logo = retour sur la page d'accueil
  window.location.href = "./index.html";
});
contacts.addEventListener("click", () => {
  // Click sur le bouton contact = redirection sur la section contact de la page d'accueil
  window.location.href = "./index.html#contact";
});
projets.addEventListener("click", () => {
  // Click sur le bouton projets = redirection sur la section "Mes projets" de la page d'accueil
  window.location.href = "./index.html#portfolio";
  // console.log("projets");
});
