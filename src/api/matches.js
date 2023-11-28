// pages/api/matches.js


const FetchMatches= async (id) => {
  const response = await fetch("./matchData.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();

  if (id !== undefined) {
    const datas = data.find((item) => item.id === id);
    return datas;
  } else {
    return data;
  }
};
export default FetchMatches;




// pages/api/matches.js
// import matchData from '../../data/matchData.json';

// export default function handler(req, res) {
//   if (req.method === 'GET') {
//     // Envoyer les données JSON en réponse à une requête GET
//     res.status(200).json(matchData);
//   } else {
//     // Méthode non autorisée
//     res.status(405).end();
//   }
// }








// import fs from 'fs/promises';
// import path from 'path';
// import matchData from './matchData.json'

// const filePath = path.join(process.cwd(), 'data', 'matchData.json');

// export default async function handler(req, res) {
//   try {
//     switch (req.method) {
//       case 'GET':
//         // Envoyer les données JSON en réponse à une requête GET
//         res.status(200).json(matchData);
//         break;

//       case 'PUT':
//         // Mettre à jour le fichier JSON avec de nouvelles données
//         const newData = req.body;
//         await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
//         res.status(200).json({ message: 'Données mises à jour avec succès.' });
//         break;

//       default:
//         // Méthode non autorisée pour les autres requêtes
//         res.status(405).end();
//         break;
//     }
//   } catch (error) {
//     console.error('Erreur dans la gestion de la requête :', error);
//     res.status(500).json({ error: 'Une erreur s\'est produite lors du traitement de la requête.' });
//   }
// }
