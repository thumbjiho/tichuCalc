import React, { useEffect, useState } from "react";
import {
  Wrapper,
  ScoreContainer,
  ScoreBox,
  ButtonGroup,
  ButtonRow,
} from "./CardScore.styles";
import Button from "../Button";
import Subtitle from "../Subtitle";

function CardScore({
  cardScores,
  setCardScores,
  isDoubleWin,
  doubleWinTeam,
  setPrevCardScores,
}) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (isDoubleWin && doubleWinTeam) {
      setPrevCardScores?.(cardScores); // 백업
      const fixedScores =
        doubleWinTeam === "Blue" ? [200, 0] : [0, 200];
      setCardScores(fixedScores);
    }
  }, [isDoubleWin, doubleWinTeam]);

  const handleScoreChange = (value) => {
    if (isDoubleWin) return;

    if (value === "ac") {
      setCardScores([0, 0]);
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
    handleScoreChange("ac");
  };

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
