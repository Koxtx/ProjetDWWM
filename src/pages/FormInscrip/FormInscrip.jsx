import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../../apis/users";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";

export default function FormInscrip() {
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // schéma de validation
  const schema = yup.object({
    username: yup.string().required("Le champ est obligatoire"),
    email: yup
      .string()
      .email()
      .required("Required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Mail not valid"),
    password: yup.string().required("Required").min(3, "Too short"),

    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf([yup.ref("password"), ""], "Les mots ne correspondent pas"),
    rgpd: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les termes et les conditions"),
  });

  //   valeurs par défaut
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rgpd: false,
  };

  //   méthodes utilisées par useForm et options : resolver fait le lien entre le formulaire et le schéma
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

  //   fonction de validation de formulaire
  async function submit(values) {
    console.log(values);
    try {
      const response = await signup(values);
      console.log(response);
      setFeedback(response.message);
      if (response.message !== "Email déjà existant") {
        reset(defaultValues);
      }
      reset(defaultValues);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    if (feedback !== "Email déjà existant") {
      navigate("/connexion");
    }
  }
  return (
    <main className="d-flex flex-column center flex-fill">
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="username" className="mb-10">
            Pseudo
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className="mb-10"
          />
          {errors.username && (
            <p className="text-error">{errors.username.message}</p>
          )}
        </div>
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
        <div className="d-flex flex-column mb-10">
          <label htmlFor="confirmPassword" className="mb-10">
            Confirmation de mot de passe
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="mb-10"
          />
          {errors.confirmPassword && (
            <p className="text-error">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="rgpd" className="mb-10">
            <input
              {...register("rgpd")}
              type="checkbox"
              className="mr-15"
              id="rgpd"
            />
            J'accepte la collecte et le traitement de mes données personnelles
            conformément à la{" "}
            <Link to="/politiquedeconfidentialité">
              politique de confidentialité
            </Link>
          </label>
          {errors.rgpd && <p className="text-error">{errors.rgpd.message}</p>}
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      {showModal && (
        <Modal onClose={handleCloseModal} feedback={feedback}>
          <button
            className={`btn btn-reverse-primary`}
            onClick={handleCloseModal}
          >
            X
          </button>
        </Modal>
      )}
    </main>
  );
}
