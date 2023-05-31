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
        lieu.titre,
        lieu.description,
        lieu.adresse,
        0,
        lieu.latitude,
        lieu.longitude,
        idResponsable,
      ]
    );
    var idPI = await connection.query(
      `select last_insert_id(idPointInteret) from pointInteret order by LAST_INSERT_ID(idPointinteret) desc limit 1;`
    );
    idPI = idPI[0][0]["last_insert_id(idPointInteret)"]; // id du point d'interet ajouté

    await connection.query(`insert into coordoones values (?,?)`, [
      lieu.latitude,
      lieu.longitude,
    ]);

    await connection.query(
      `insert into statistiques(nbrVisites,nbrQuizsPris,idPointInteret) values (?,?,?)`,
      [0, 0, idPI]
    );
    for (var theme of themes) {
      await connection.query(`insert into estDeTheme values (?,?)`, [
        idPI,
        theme,
      ]);
    }

    for (var categorie of categories) {
      await connection.query(`insert into estdecategorie values (?,?)`, [
        idPI,
        categorie,
      ]);
    }
    for (var path of photos) {
      await connection.query(
        `insert into photos(path,alt,idPointInteret) values (?,?,?)`,
        [path, lieu.titre, idPI]
      );
    }
    for (var horaire of horaires) {
      await connection.query(`insert into ouvrir values (?,?,?,?)`, [
        idPI,
        horaire.jour,
        horaire.heureDebut,
        horaire.heureFin,
      ]);
    }
    for (var arret of arretsTransport) {
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
      `insert into quiz(NbQuestions,idPointinteret) values(?,?)`,
      [quiz.nbquestions, idPI]
    );

    var idQuiz = await connection.query(
      `select last_insert_id(idQuiz) from quiz order by LAST_INSERT_ID(idQuiz) desc limit 1;`
    );
    idQuiz = idQuiz[0][0]["last_insert_id(idPointInteret)"];

    for (var question of quiz.questions) {
      await connection.query(
        `insert into question(question,choix1,choix2,choix3,choix4,choixJuste,reponseDetaille,idQuiz)
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
      `insert into evenement(titre,description,date,idPointInteret) values(?,?,?,?)`,
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
        offre.prixOriginal,
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
async function AfficherStatistiques(idPI) {
  const connection = await pool.getConnection();
  try {
    var [statistiques] = await connection.query(
      `select nbrVisites,nbrQuizsPris from statistiques where idPointInteret = ?`,
      [idPI]
    );
    var [nbrCommentaires] = await connection.query(
      `select count(*) from commentaire where idPointInteret = ?`,
      [idPI]
    );
    var [nbrFavoris] = await connection.query(
      `select count(*) from favoris where idPointInteret = ?`,
      [idPI]
    );
    var [avgRatings] = await connection.query(
      `select avg(nbrEtoile) from commentaire where idPointInteret = ?`,
      [idPI]
    );
    return { statistiques, nbrCommentaires, nbrFavoris, avgRatings };
  } catch (err) {
    console.log(err);
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
  AfficherStatistiques,
};