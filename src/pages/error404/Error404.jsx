import React from "react";
import error from "../../image/error.jpg";
import styles from "./Error.module.scss";

export default function Error404() {
  return (
    <main
      className="mhFull"
      style={{
        backgroundImage: `url(${error})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1> ERROR 404</h1>
      <p>
        Le site est allé jusqu’à l echec ! Il a besoin de son temps de repos !
        nous revennons trés vite{" "}
      </p>
    </main>
  );
}
