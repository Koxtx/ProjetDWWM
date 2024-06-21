import React, { useState } from "react";
import { PrContext } from "../../context/PrContext";

export default function PrProvider({ children }) {
  const [prs, setPRs] = useState([]);
  return (
    <PrContext.Provider value={{ prs, setPRs }}>{children}</PrContext.Provider>
  );
}
