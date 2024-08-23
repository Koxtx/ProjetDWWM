import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Notification(message, time) {
  const delay = new Date(time) - new Date();
  if (delay > 0) {
    setTimeout(() => {
      toast(message, { type: "info" });
    }, delay);
  }
}
