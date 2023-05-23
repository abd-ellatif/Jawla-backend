pool = require("../database.js");

//Ajouter lieu: idRespo(int), lieu: {titre,description,adresse,latitude,longitude},photos:[paths],themes:[int],
//categories,ajouter ligne coordoones, horaires:[{jour(str),heureDebut(int),heureFin(int)}],
//arretsTransport:[{nom,type(str: bus|train|tram|metro),idPI}]]

async function AjouterLieu(
    idResponsable,
    lieu,
    photos,
    themes,
    categories,
    horaires,
    arretsTransport
  ) {
    const connection = await pool.getConnection();
    try {
      await connection.query(
        `insert into PointInteret 
          (titre,description,Adresse,valide,latitude,longitude,idResponsable)
           values (?,?,?,0,?,?,?);`,
        [
          lieu.nom,
          lieu.description,
          lieu.adresse,
          0,
          lieu.latitude,
          lieu.longitude,
          idResponsable,
        ]
      );
  
      await connection.query(`insert into coordoones values (?,?)`, [
        lieu.latitude,
        lieu.longitude,
      ]);
      const [idPI] = await connection.query(`select last_insert_id()`);
      idPI = idPI[0];
      for (var theme in themes) {
        await connection.query(`insert into estDeTheme values (?,?)`, [
          theme,
          idPI,
        ]);
      }
      for (var categorie in categories) {
        await connection.query(`insert into estDeCategorie values (?,?)`, [
          categorie,
          idPI,
        ]);
      }
      for (var path in photos) {
        await connection.query(
          `insert into photos(path,alt,idPointInteret) values (?,?,?)`,
          [path, lieu.titre, idPI]
        );
      }
      for (var horaire in horaires) {
        await connection.query(`insert into ouvrir values (?,?,?,?)`, [
          idPI,
          horaire.jour,
          horaire.heureDebut,
          horaire.heureFin,
        ]);
      }
      for (var arret in arretsTransport) {
        await connection.query(
          `insert into arrettransport(nom,type,idPointInteret) values (?,?,?)`,
          [arret.nom, arret.type, idPI]
        );
      }
    } finally {
      connection.release();
    }
  }
  
  // A discuter
  async function ModifierLieu(idPI) {}

// Le responsable a le id de chaxque commentaire, dans aficher details lieu le id des commentaires est retourné
async function SupprimerCommentaire(idCommentaire) {
  const connection = await pool.getConnection();
  try {
    await connection.query(`delete from commentaire where idCommentaire = ?`, [
      idCommentaire,
    ]);
  } finally {
    connection.release();
  }
}

// quiz : {nbquestions,questions: [ {question,choix1,choix2,choix3,choix4,choixJuste,reponseDetaillé} ]   }
async function AjouterQuiz(idPI, quiz) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      `insert into quiz(NbQuestions,idPointinteret) values()`,
      [quiz.nbquestions, idPI]
    );
    const [idQuiz] = await connection.query(`select last_insert_id()`);
    idQuiz = idQuiz[0];

    for (var question in quiz.questions) {
      await connection.query(
        `insert into question(question,choix1,choix2,choix3,choix4,choixJuste,reponseDetaillé,idQuiz)
             values(?,?,?,?,?,?,?,?)`,
        [
          question.question,
          question.choix1,
          question.choix2,
          question.choix3,
          question.choix4,
          question.choixJuste,
          question.reponseDetaillé,
          idQuiz,
        ]
      );
    }
  } finally {
    connection.release();
  }
}

// evenement = {titre,description,date}   // date:'YYYY-MM-DD'
async function AjouterEvenement(idPI, evenement) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      `insert into evenement(titre,description,date,idPointInteret) values(?,?,?)`,
      [evenement.titre, evenement.description, evenement.date, idPI]
    );
  } finally {
    connection.release();
  }
}

// offre = {designation,prixOriginal(decimal),reduction(decimal),dateDebut,dateFin}   // date:'YYYY-MM-DD'
async function AjouterOffre(idPI, offre) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      `insert into offre(Designation,PrixOriginal,reduction,dateDebut,DateFin,idPointInteret) values(?,?,?,?,?,?)`,
      [
        offre.designation,
        offre.prixoriginal,
        offre.reduction,
        offre.dateDebut,
        offre.dateFin,
        idPI,
      ]
    );
  } finally {
    connection.release();
  }
}

module.exports = {
  AjouterLieu,
  ModifierLieu,
  SupprimerCommentaire,
  AjouterQuiz,
  AjouterEvenement,
  AjouterOffre,
};
