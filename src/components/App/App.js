// App.js
import React, { useState, useMemo, useEffect } from "react";
import CardScore from "../../components/CardScore/CardScore";
import TichuScore from "../../components/TichuScore/TichuScore";
import SaveScore from "../../components/SaveScore";
import TotalScore from "../../components/TotalScore/TotalScore";
import { Container, Wrapper } from "./App.styles"; // ✅ 분리된 스타일 import
import "../../App.css";

function App() {
  const [isDoubleWin, setIsDoubleWin] = useState(false);
  const [doubleWinTeam, setDoubleWinTeam] = useState(null);
  const [cardScores, setCardScores] = useState([0, 0]);
  const [prevCardScores, setPrevCardScores] = useState([0, 0]);
  const [tichuScores, setTichuScores] = useState([0, 0]);
  const [players, setPlayers] = useState([]);

  const allOrdered = useMemo(
    () =>
      players.length === 4 && players.every((p) => p.order !== null),
    [players]
  );

  const cardEntered = useMemo(() => {
    if (isDoubleWin) {
      return (
        (doubleWinTeam === "Blue" &&
          cardScores[0] === 200 &&
          cardScores[1] === 0) ||
        (doubleWinTeam === "Yellow" &&
          cardScores[1] === 200 &&
          cardScores[0] === 0)
      );
    } else {
      return cardScores[0] + cardScores[1] !== 0;
    }
  }, [cardScores, isDoubleWin, doubleWinTeam]);

  const canSave = allOrdered && cardEntered;

  useEffect(() => {
    if (!isDoubleWin && prevCardScores) {
      setCardScores(prevCardScores);
    }
  }, [isDoubleWin, prevCardScores, setCardScores]);

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
          setCardScores={(newScore) => {
            if (!isDoubleWin) setPrevCardScores(cardScores);
            setCardScores(newScore);
          }}
          isDoubleWin={isDoubleWin}
          doubleWinTeam={doubleWinTeam}
        />
        <TotalScore scores={totalScores} />
        <SaveScore disabled={!canSave} />
      </Wrapper>
    </Container>
  );
}

export default App;
