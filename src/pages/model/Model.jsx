import React from "react";
import { useGlobalContext } from "./Context";

import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import "./Model.css";

const Model = () => {
  const { loading } = useGlobalContext();
  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <>
      {/* <AppProvider> */}
      {/* <main> */}

      <Navbar />

      <CartContainer />
      {/* </main> */}
      {/* </AppProvider> */}
    </>
  );
};

export default Model;
