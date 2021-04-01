import './ListeDossiers.scss';
import Dossier from './Dossier';
import * as crudDossiers from '../services/crud-dossiers';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function ListeDossiers({utilisateur, etatDossiers}) {
  
  // État des dossiers (vient du composant Appli)
  const [dossiers, setDossiers] = etatDossiers;

  // Lire les dossiers dans Firestore et forcer le réaffichage du composant
  // Remarquez que ce code est dans un useEffect() car on veut l'exécuter 
  // UNE SEULE FOIS (regardez le tableau des 'deps' - dépendances) et ceci 
  // APRÈS l'affichage du composant pour que la requête asynchrone à Firestore  
  // ait eu le temps d'être complétée et le réaffichage du composant soit
  // forcé par la mutation de l'état des dossiers
  useEffect(
    () => {
      crudDossiers.lireTout(utilisateur.uid).then(
        dossiers => setDossiers(dossiers)
      )
    }, []
  );

  /**
   * Gérer le clic du bouton 'supprimer' correspondant au dossier identifié en argument
   * @param {string} idd identifiant Firestore du dossier
   */
  async function gererSupprimer(idd) {
    // On fait appel à la méthode supprimer de notre code d'interaction avec Firestore
    crudDossiers.supprimer(utilisateur.uid, idd).then(
      () => {
        const tempDossiers = [...dossiers]; // copier le tableau des dossiers existants
        const dossiersRestants = tempDossiers.filter((elt) => elt.id!==idd); // filtrer pour garder tous les dossiers sauf celui qu'on a demandé de supprimer
        setDossiers(dossiersRestants); // Muter l'état pour forcer le réaffichage du composant
      }).catch(erreur => console.log('Échec de la suppression - Firestore a répondu :', erreur.message));
  }

/**
   * Tous les tris sont placé ici dans des fonctions
   * @param none
   */

// Tri selon la date de modification ascendante
function TriDateDescendant() {
  crudDossiers.lireTout(utilisateur.uid).then(
    dossiers => setDossiers(dossiers)
  )
}
// Tri selon les noms de dossier descendants
function TriNomsDescendants() {
  crudDossiers.lireToutNomsDescendants(utilisateur.uid).then(
    dossiers => setDossiers(dossiers)
  )
}
// Tri selon les noms de dossier ascendants
function TriNomsAscendants() {
  crudDossiers.lireToutNomsAscendants(utilisateur.uid).then(
    dossiers => setDossiers(dossiers)
  )
}

  
  return (
    <>
      <div className="TriDossier">
        <TextField
            id="standard-select-currency"
            select
            label="Tri des dossiers"
            //value={'Date de modification descendante'}
            // onChange={handleChange}
          >
          <MenuItem key={'Date de modification descendante'} value={'Date de modification descendante'} onClick={TriDateDescendant}>Date de modification descendante</MenuItem>
          <MenuItem key={'Nom de dossier ascendant'} value={'Nom de dossier ascendant'} onClick={TriNomsAscendants}>Nom de dossier ascendant</MenuItem>
          <MenuItem key={'Nom de dossier descendant'} value={'Nom de dossier descendant'} onClick={TriNomsDescendants}>Nom de dossier descendant</MenuItem>
        </TextField>
      </div>
    
    <ul className="ListeDossiers">     
      {
        (dossiers.length > 0) ?
          dossiers.map(dossier => <li key={dossier.id}><Dossier {...dossier} gererSupprimer={gererSupprimer} /></li>)
        :
          <li className="msgAucunDossier">
            Votre liste de dossiers est vide 
            <p>;-(</p>
          </li>
      }
    </ul>
    </>
  );
}