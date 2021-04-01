import firebase from 'firebase/app';
import { firestore } from './firebase';
import { utilRef, dossRef } from './config';

/**
 * Créer un nouveau dossier pour l'utilisateur connecté
 * @param {String} uid identifiant d'utilisateur Firebase 
 * @param {Object} dossier document à ajouter à la collection des dossiers
 * @returns {Promise<Firestore.DocumentSnapshot} Promesse avec le document qui vient d'être ajouté 
 */
export async function creer(uid, dossier) {
  // Ajouter le champ "datemodif"
  dossier.datemodif = firebase.firestore.FieldValue.serverTimestamp();
  const refDoc = await firestore.collection(utilRef).doc(uid).collection(dossRef).add(dossier);
  return refDoc.get();
}

/**
 * Obtenir tous les dossiers de l'utilisateur connecté
 * @param {String} uid identifiant d'utilisateur Firebase
 * @returns {Promise<any[]>} Promesse avec le tableau des documents de dossiers
 */
export async function lireTout(uid) {
  const dossiers = [];
  /************************************************************** Exercice #5 : question A **************************/
  // Modifier très légèrement la ligne suivante
  const reponse = await firestore.collection(utilRef).doc(uid).collection(dossRef).orderBy("datemodif", "desc").get();
  reponse.forEach(
    doc => {
      dossiers.push({id: doc.id, ...doc.data()})
    }
  );
  return dossiers;
}

/**
 * Obtenir tous les dossiers de l'utilisateur connecté
 * @param {String} uid identifiant d'utilisateur Firebase
 * @returns {Promise<any[]>} Promesse avec le tableau des documents de dossiers
 */
 export async function lireToutNomsAscendants(uid) {
  const dossiers = [];
  /************************************************************** Exercice #5 : question A **************************/
  // Modifier très légèrement la ligne suivante
  const reponse = await firestore.collection(utilRef).doc(uid).collection(dossRef).orderBy("nom", "asc").get();
  reponse.forEach(
    doc => {
      dossiers.push({id: doc.id, ...doc.data()})
    }
  );
  return dossiers;
}

/**
 * Obtenir tous les dossiers de l'utilisateur connecté
 * @param {String} uid identifiant d'utilisateur Firebase
 * @returns {Promise<any[]>} Promesse avec le tableau des documents de dossiers
 */
 export async function lireToutNomsDescendants(uid) {
  const dossiers = [];
  /************************************************************** Exercice #5 : question A **************************/
  // Modifier très légèrement la ligne suivante
  const reponse = await firestore.collection(utilRef).doc(uid).collection(dossRef).orderBy("nom", "desc").get();
  reponse.forEach(
    doc => {
      dossiers.push({id: doc.id, ...doc.data()})
    }
  );
  return dossiers;
}

/**
 * Supprimer un dossier pour l'utilisateur connecté
 * @param {String} uid identifiant d'utilisateur Firebase
 * @param {String} idd identifiant du document Firestore à supprimer
 * @returns {Promise<void>} 
 */
export async function supprimer(uid, idd) {
  /************************************************************** Exercice #5 : question B **************************/
  // Une seule ligne de code suffit
  // return await [votre instruction pour supprimer le dossier de l'utilisateur connecté dans Firestore ici];
  return firestore.collection(utilRef).doc(uid).collection(dossRef).doc(idd).delete().then(
    firebase.firestore.FieldValue.arrayRemove(idd)
  );
}

/**
 * Modifier un dossier de l'utilisateur connecté (pas implémenté dans cet exercice)
 * @param {String} uid identifiant d'utilisateur Firebase 
 * @param {String} did Identifiant du dossier
 * @param {Object} dossier document à modifier dans la collection des dossiers
 * @returns {Promise<null>} Promesse confirmant la mise à jour
 */
 export async function modifier(uid, did, dossier) {
  // Cadeau : à compléter pendant vos vacances d'été ;-)
  return true;
}