import React, { useState } from "react";
import styles from "./HomePage.module.scss";
import WomanHaltero from "../../image/woman-haltero.jpg";
import Exemple from "../../compenants/Exemple/Exemple";

export default function HomePage() {
  return (
    <main>
      <section>
        <img
          src={WomanHaltero}
          className={`${styles.image}`}
          alt="Woman haltero"
        />
      </section>
      <section className="mb-20 mt-30 d-flex flex-column ">
        <h3>Séance du jour :</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione.
          Architecto sequi iure repellendus, accusamus aut accusantium quos hic!
          Veniam, molestias. Voluptatibus sint totam harum, voluptate doloremque
          necessitatibus. Ab quisquam ipsam quasi! Quod vel voluptatibus ipsam
          adipisci. Eligendi perspiciatis minima pariatur, numquam commodi
          repellat mollitia sint. Neque minus quas recusandae fuga. Odit ex
          libero cumque. Aspernatur ratione autem nesciunt in temporibus nisi
          iste voluptatum? Quia ea ratione nam voluptate expedita porro.
          Inventore, quod! Numquam minima corrupti consectetur, quaerat corporis
          minus dolorum sequi.
        </p>
      </section>

      <section className="mb-20 mt-30 d-flex flex-column ">
        <h3>Performance précédente :</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat.
          Ipsam, nulla doloribus reiciendis repellendus illo deleniti eligendi.
          Dolorum. Beatae rerum recusandae debitis praesentium odio officiis
          dolore repellat. Deleniti dignissimos ipsam adipisci in aspernatur ut
          pariatur nobis? Eius unde animi quaerat omnis nam ullam expedita
          reprehenderit. Doloremque ipsa praesentium eos nostrum eum fugit quo
          ad. Natus accusamus praesentium sequi. Voluptatum tenetur enim labore
          vitae? Odit aliquid nemo corrupti vero sed harum quae a? Dolores
          mollitia saepe quia cumque debitis non asperiores odit.
        </p>
      </section>

      <Exemple titre="Exercices" />
      <Exemple titre="Recettes" />
    </main>
  );
}
