import React, { useState } from "react";
import Body from "./Components/Body";
import Typography from "@mui/material/Typography";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Container } from "@mui/material";

const App = () => {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

export default App;
