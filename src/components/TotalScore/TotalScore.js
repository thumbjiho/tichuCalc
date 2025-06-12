import React from "react";
import {
  ScoreContainer,
  ScoreBox,
  Subtitle,
} from "./TotalScore.styles";

function TotalScore({ scores }) {
  return (
    <>
      <Subtitle>Total Score</Subtitle>
      <ScoreContainer>
        <ScoreBox textColor="#4E80EE">{scores[0]}</ScoreBox>
        <div style={{ color: "white", fontWeight: "bold" }}>:</div>
        <ScoreBox textColor="#E1B53E">{scores[1]}</ScoreBox>
      </ScoreContainer>
    </>
  );
}

export default TotalScore;
