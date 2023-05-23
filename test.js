//Test Ajouter Lieu

function testAjouterlieu() {
  const url = "http://localhost:3000/responsable/ajouterLieu/1";

  //Ajouter lieu: idRespo(int), lieu: {titre,description,adresse,latitude,longitude},photos:[paths],themes:[int],
  //categories,ajouter ligne coordoones, horaires:[{jour(str),heureDebut(int),heureFin(int)}],
  //arretsTransport:[{nom,type(str: bus|train|tram|metro)}]]

  const data = {
    lieu: {
      titre: "test",
      description: "test",
      adresse: "test",
      latitude: 0,
      longitude: 0,
    },
    photos: ["path1", "path2"],
    themes: [1, 2], // themes sont prédéfinis dans la bdd ex : 1: "histoire", 2: "culture", 3: "nature", 4: "sport", 5: "gastronomie"
    categories: [1, 2], // categories sont prédéfinis dans la bdd ex : 1: "monument", 2: "musée", 3: "parc", 4: "plage", 5: "restaurant"
    horaires: [
      { jour: "lundi", heureDebut: 0, heureFin: 0 },
      { jour: "mardi", heureDebut: 0, heureFin: 0 },
    ],
    arretsTransport: [{ nom: "test", type: "bus" }],
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then()
    .then((responseData) => {
      console.log("Response:", responseData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// quiz : {nbquestions,questions: [ {question,choix1,choix2,choix3,choix4,choixJuste,reponseDetaillé} ]   }
function testAjouterQuiz() {
  const url = "http://localhost:3000/responsable/AjouterQuiz/1";
  const data = {
    nbquestions: 2,
    questions: [
      {
        question: "qst1",
        choix1: "choix1",
        choix2: "choix2",
        choix3: "choix3",
        choix4: "choix4",
        choixJuste: 1,
        reponseDetaillé: "reponseDetaillé",
      },
      {
        question: "qst2",
        choix1: "choix1",
        choix2: "choix2",
        choix3: "choix3",
        choix4: "choix4",
        choixJuste: 2,
        reponseDetaillé: "reponseDetaillé2",
      },
    ],
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then()
    .then((responseData) => {
      console.log("Response:", responseData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function testAjouterEvenement() {
  const url = "http://localhost:3000/responsable/AjouterEvenement/1";

  // evenement = {titre,description,date}   // date:'YYYY-MM-DD'
  const data = {
    titre: "Evenement test",
    description: "description test",
    date: "2021-05-20",
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then()
    .then((responseData) => {
      console.log("Response:", responseData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function testAjouterOffre() {
  const url = "http://localhost:3000/responsable/AjouterOffre/1";
  // offre = {designation,prixOriginal(decimal),reduction(decimal),dateDebut,dateFin}   // date:'YYYY-MM-DD'
  const data = {
    designation: "Offre test",
    prixOriginal: 100,
    reduction: 10,
    dateDebut: "2021-05-20",
    dateFin: "2021-05-25",
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then()
    .then((responseData) => {
      console.log("Response:", responseData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
