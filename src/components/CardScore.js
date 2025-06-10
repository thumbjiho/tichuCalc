// src/components/CardScore.js
import React, { useState } from "react";
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
  max-width: 360px;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: px;
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
  transition: all 0.2s ease;
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

function CardScore() {
  const [selected, setSelected] = useState(0);
  const [scores, setScores] = useState([0, 0]);

  const handleScoreChange = (value) => {
    if (value === "ac") {
      setScores([0, 0]);
      return;
    }

    const newScore = Math.max(
      -25,
      Math.min(125, scores[selected] + value)
    );
    const otherScore = Math.max(-25, Math.min(125, 100 - newScore));
    const updated =
      selected === 0
        ? [newScore, otherScore]
        : [otherScore, newScore];
    setScores(updated);
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
          {scores[0]}
        </ScoreBox>
        <ScoreBox
          color="yellow"
          selected={selected === 1}
          onClick={() => setSelected(1)}
        >
          {scores[1]}
        </ScoreBox>
      </ScoreContainer>
      <ButtonGroup>
        <ButtonRow>
          <Button
            color="green"
            onClick={() => handleScoreChange(5)}
          >
            +5
          </Button>
          <Button
            color="green"
            onClick={() => handleScoreChange(10)}
          >
            +10
          </Button>
          <Button
            color="green"
            onClick={() => handleScoreChange(25)}
          >
            +25
          </Button>
          <Button
            color="green"
            onClick={() => handleScoreChange(50)}
          >
            +50
          </Button>
        </ButtonRow>
        <ButtonRow>
          <Button
            color="red"
            onClick={() => handleScoreChange(-5)}
          >
            -5
          </Button>
          <Button
            color="red"
            onClick={() => handleScoreChange(-10)}
          >
            -10
          </Button>
          <Button
            color="red"
            onClick={() => handleScoreChange(-25)}
          >
            -25
          </Button>
          <Button
            color="orange"
            onClick={() => handleScoreChange("ac")}
          >
            AC
          </Button>
        </ButtonRow>
      </ButtonGroup>
    </Wrapper>
  );
}

export default CardScore;
