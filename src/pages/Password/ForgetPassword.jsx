import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { passwordUsers } from "../../apis/users";
import Modal from "../../components/modal/Modal";

export default function ForgetPassword() {
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .email()
      .required("Required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Mail not valid"),
  });

  const defaultValues = {
    email: "",
  };

  async function submit(values) {
    console.log(values);
    try {
      const response = await passwordUsers(values);
      console.log(response);
      setFeedback(response.message);
      if (response.message !== "Email n'existe pas") {
        reset(defaultValues);
      }
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  }

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

  function handleCloseModal() {
    setShowModal(false);
    if (feedback !== "Email n'existe pas") {
      navigate("/");
    }
  }

  return (
    <main className="d-flex center flex-column flex-fill">
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
