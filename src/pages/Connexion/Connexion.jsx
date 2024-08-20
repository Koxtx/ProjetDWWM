import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signin } from "../../apis/users";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify"; // Importer toast
import "react-toastify/dist/ReactToastify.css";

export default function Connexion() {
  const navigate = useNavigate();
  const { setConnectedUser } = useContext(UserContext);

  // Schéma de validation
  const schema = yup.object({
    email: yup
      .string()
      .email()
      .required("Required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Mail not valid"),
    password: yup.string().required("Required"),
  });

  // Valeurs par défaut
  const defaultValues = {
    email: "",
    password: "",
  };

  // Méthodes utilisées par useForm et options : resolver fait le lien entre le formulaire et le schéma
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // Fonction de validation de formulaire
  async function submit(values) {
    try {
      const response = await signin(values);
      if (!response.message) {
        localStorage.setItem("user", JSON.stringify(response));
        setConnectedUser(response.user);
        toast.success("Connexion réussie!"); // Afficher une notification de succès
        reset(defaultValues);
        navigate("/");
      } else {
        toast.error(response.message); // Afficher une notification d'erreur
      }
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer."); // Gérer les erreurs inattendues
      console.error(error);
    }
  }

  return (
    <main className="d-flex flex-column center flex-fill">
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="email" className="mb-10">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="mb-10"
          />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
        </div>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="password" className="mb-10">
            Mot de passe
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="mb-10"
          />
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
        <button className="btn btn-primary">Submit</button>
        <Link style={{ color: "red" }} to="/forgetpassword">
          mot de passe oublié
        </Link>
      </form>
    </main>
  );
}
