console.log("coucou scripts");

const projet = {
  id: 1,
  title: "Abajour Tahina",
  imageUrl: "http://localhost:5678/images/abajour-tahina1651286843956.png",
  categoryId: 1,
  userId: 1,
  category: {
    id: 1,
    name: "Objets",
  },
};

const projets = [
  {
    id: 1,
    title: "Abajour Tahina",
    imageUrl: "http://localhost:5678/images/abajour-tahina1651286843956.png",
    categoryId: 1,
    userId: 1,
    category: {
      id: 1,
      name: "Objets",
    },
  },
  {
    id: 1,
    title: "Abajour Tahina",
    imageUrl: "http://localhost:5678/images/abajour-tahina1651286843956.png",
    categoryId: 1,
    userId: 1,
    category: {
      id: 1,
      name: "Objets",
    },
  },
];

fetch("http://localhost:5678/api/categories", {
  method: "GET",
})
  .then((response) => {
    return response.json(); // Transmet le contenu au prochain then()
  })
  .then((data) => {
    // On récupère la liste des résultats de l'API
    console.log(data);
  });

// 1) Afficher les projets
// Insérer quelques chose au bon endroit dans le HTML
// Sans API, créer un projet (createElement) puis on l'affiche au bon endroit
// Fais un tableau de projets je le parcours et je l'affiche au bon endroit
// On récupère les projets avec l'api
// On parcours la réponse et on créer les projets et on les ajoute au bon endroit

// 2) Afficher les catégories

// 3) Trier les projets quand on clique sur une catégorie
//--- Quand je clique sur une catégorie
//------ On supprime tous les projets
//------ On récupère de nouveaux tous les projets
//------ On affiche que ceux de la bonne catégorie
