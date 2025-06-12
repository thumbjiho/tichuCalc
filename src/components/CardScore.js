import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Subtitle from "./Subtitle";

const colorMap = {
  blue: "#3b82f6",
  yellow: "#facc15",
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const ScoreContainer = styled.div`
  box-sizing: border-box;
  font-family: "proxima-soft";
  display: flex;
  width: 100%;
  background-color: #000;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.3);
`;

const ScoreBox = styled.div`
  width: 100%;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  background-color: ${({ selected }) =>
    selected ? "rgba(255, 255, 255, 0.15)" : "#000"};
  color: ${({ color }) => colorMap[color?.toLowerCase()]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

function CardScore({
  cardScores,
  setCardScores,
  isDoubleWin,
  doubleWinTeam,
}) {
  const [selected, setSelected] = useState(0);
  const [prevScore, setPrevScore] = useState([0, 0]);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (isDoubleWin && doubleWinTeam && !locked) {
      setPrevScore(cardScores);
      const fixedScores =
        doubleWinTeam === "Blue" ? [200, 0] : [0, 200];
      setCardScores(fixedScores);
      setLocked(true);
    }
  }, [isDoubleWin, doubleWinTeam, locked, cardScores, setCardScores]);

  const handleScoreChange = (value) => {
    if (isDoubleWin) return; // 점수 입력 막기

    if (value === "ac") {
      // 점수 리셋
      setCardScores([0, 0]);
      setLocked(false);
      return;
    }

    const newScore = Math.max(
      -25,
      Math.min(125, cardScores[selected] + value)
    );
    const otherScore = Math.max(-25, Math.min(125, 100 - newScore));
    const updated =
      selected === 0
        ? [newScore, otherScore]
        : [otherScore, newScore];
    setCardScores(updated);
  };

  const handleAC = () => {
    if (isDoubleWin && locked) {
      setCardScores(prevScore); // 백업 점수 복원
      setLocked(false);
    } else {
      handleScoreChange("ac");
    }
  };

  console.log("cardScore.js:doubleWinTeam:", { doubleWinTeam });

  return (
    <Wrapper>
      <Subtitle>Card Score</Subtitle>
      <ScoreContainer>
        <ScoreBox
          color="blue"
          selected={selected === 0}
          onClick={() => setSelected(0)}
        >
          {cardScores[0]}
        </ScoreBox>
        <ScoreBox
          color="yellow"
          selected={selected === 1}
          onClick={() => setSelected(1)}
        >
          {cardScores[1]}
        </ScoreBox>
      </ScoreContainer>
      <ButtonGroup>
        <ButtonRow>
          <Button
            color="green"
            onClick={() => handleScoreChange(5)}
            disabled={isDoubleWin}
          >
            +5
          </Button>
          <Button
            color="green"
            onClick={() => handleScoreChange(10)}
            disabled={isDoubleWin}
          >
            +10
          </Button>
          <Button
            color="green"
            onClick={() => handleScoreChange(25)}
            disabled={isDoubleWin}
          >
            +25
          </Button>
          <Button
            color="green"
            onClick={() => handleScoreChange(50)}
            disabled={isDoubleWin}
          >
            +50
          </Button>
        </ButtonRow>
        <ButtonRow>
          <Button
            color="red"
            onClick={() => handleScoreChange(-5)}
            disabled={isDoubleWin}
          >
            -5
          </Button>
          <Button
            color="red"
            onClick={() => handleScoreChange(-10)}
            disabled={isDoubleWin}
          >
            -10
          </Button>
          <Button
            color="red"
            onClick={() => handleScoreChange(-25)}
            disabled={isDoubleWin}
          >
            -25
          </Button>
          <Button
            color="orange"
            onClick={handleAC}
            disabled={isDoubleWin}
          >
            AC
          </Button>
        </ButtonRow>
      </ButtonGroup>
    </Wrapper>
  );
}

export default CardScore;
