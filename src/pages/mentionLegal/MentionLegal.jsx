import React from "react";
import styles from "./MentinLegal.module.scss";

export default function MentionLegal() {
  return (
    <main>
      <h1>Mentions Légales</h1>
      <p>
        <strong>Éditeur du site :</strong>
      </p>
      <p>
        GoIt / 74 rue Harry,auchel Téléphone:0659296782,
        Email:corentin.lavarde@gmail.com
      </p>

      <p>
        <strong>Directeur de la publication :</strong>
      </p>
      <p>Nom et fonction</p>

      <p>
        <strong>Hébergeur du site :</strong>
      </p>
      <p>Nom de l'hébergeur Adresse Téléphone</p>

      <p>
        En vertu de la Loi n° 2004-575 du 21 juin 2004 pour la confiance dans
        l'économie numérique (LCEN), nous fournissons des informations
        détaillées sur l'éditeur du site, le directeur de la publication, et
        l'hébergeur du site.
      </p>
    </main>
  );
}
