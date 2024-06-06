import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetpassword } from "../../apis/users";
import Modal from "../../compenants/modal/Modal";

export default function ResetPassword() {
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  const schema = yup.object({
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(5, "trop court")
      .max(10, "trop long"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf([yup.ref("password"), ""], "Les mots ne correspondent pas"),
  });

  const defaultValues = {
    email: decodedToken.email,
  };

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

  async function submit(values) {
    console.log(values);
    try {
      const response = await resetpassword(values);
      setFeedback(response.message);
      if (response.message !== "erreur") {
        reset(defaultValues);
      }
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    if (feedback !== "erreur") {
      navigate("/connexion");
    }
  }
  return (
    <main className="d-flex center flex-column flex-fill">
      <form onSubmit={handleSubmit(submit)}>
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
        <button className="btn btn-primary">Submit</button>
      </form>
      {showModal && (
        <Modal onClose={handleCloseModal} feedback={feedback}>
          <button
            className="btn btn-reverse-primary"
            onClick={handleCloseModal}
          >
            X
          </button>
        </Modal>
      )}
    </main>
  );
}
