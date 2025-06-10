import React from "react";
import styled from "styled-components";
import CardScore from "./components/CardScore";
import TichuScore from "./components/TichuScore";
import SaveScore from "./components/SaveScore";
import TotalScore from "./components/TotalScore.js";
import "./App.css";

const Container = styled.div`
  height: 100vh;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

function App() {
  return (
    <Container>
      <TichuScore />
      <CardScore />
      <TotalScore />
      <SaveScore />
    </Container>
  );
}

export default App;
