import React, { useState, useMemo } from "react";
import styled from "styled-components";
import CardScore from "./components/CardScore";
import TichuScore from "./components/TichuScore";
import SaveScore from "./components/SaveScore";
import TotalScore from "./components/TotalScore";
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
`;

function App() {
  const [isDoubleWin, setIsDoubleWin] = useState(false);
  const [doubleWinTeam, setDoubleWinTeam] = useState(null);
  const [cardScores, setCardScores] = useState([0, 0]);
  const [tichuScores, setTichuScores] = useState([0, 0]);
  const [players, setPlayers] = useState([]); // 플레이어 상태 받는 방식

  // 모든 플레이어가 order를 가졌는지 확인
  const allOrdered = useMemo(
    () =>
      players.length === 4 && players.every((p) => p.order !== null),
    [players]
  );

  const saveDisabled =
    cardScores[0] === 0 && cardScores[1] === 0 && !isDoubleWin;

  const totalScores = [
    cardScores[0] + tichuScores[0],
    cardScores[1] + tichuScores[1],
  ];

  return (
    <Container>
      <Wrapper>
        <TichuScore
          setTichuScores={setTichuScores}
          setIsDoubleWin={setIsDoubleWin}
          setDoubleWinTeam={setDoubleWinTeam}
          tichuScores={tichuScores}
          setPlayers={setPlayers}
        />
        <CardScore
          cardScores={cardScores}
          setCardScores={setCardScores}
          isDoubleWin={isDoubleWin}
          doubleWinTeam={doubleWinTeam}
        />
        <TotalScore scores={totalScores} />
        <SaveScore disabled={saveDisabled || !allOrdered} />
      </Wrapper>
    </Container>
  );
}

export default App;
