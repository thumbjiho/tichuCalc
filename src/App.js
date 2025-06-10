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
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 512px;
  gap: 16px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  /* background-color: red; */
`;

function App() {
  return (
    <Container>
      <Wrapper>
        <TichuScore />
        <CardScore />
        <TotalScore />
        <SaveScore />
      </Wrapper>
    </Container>
  );
}

export default App;
