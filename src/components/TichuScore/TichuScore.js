import React, { useEffect } from "react";
import Subtitle from "../Subtitle";
import TichuTeamColumn from "./TichuTeamColumn"; // 현재 위치 기준으로 한 폴더 위로
import { useTichuGameState } from "../../hooks/useTichuGameState";
import { Wrapper, Container } from "./TichuScore.styles";

function TichuScore({
  setTichuScores,
  setIsDoubleWin,
  setDoubleWinTeam,
  setPlayers,
  tichuScores = [0, 0],
}) {
  const { players, handlePlayerClick, handleStatusClick } =
    useTichuGameState({
      setTichuScores,
      setIsDoubleWin,
      setDoubleWinTeam,
    });

  useEffect(() => {
    setPlayers?.(players);
  }, [players, setPlayers]);

  const bluePlayers = players.filter((p) => p.team === "Blue");
  const yellowPlayers = players.filter((p) => p.team === "Yellow");

  return (
    <Wrapper>
      <Subtitle>Tichu Score</Subtitle>
      <Container>
        <TichuTeamColumn
          team="Blue"
          players={bluePlayers}
          tichuScore={tichuScores[0]}
          onCardClick={handlePlayerClick}
          onStatusClick={handleStatusClick}
        />
        <TichuTeamColumn
          team="Yellow"
          players={yellowPlayers}
          tichuScore={tichuScores[1]}
          onCardClick={handlePlayerClick}
          onStatusClick={handleStatusClick}
        />
      </Container>
    </Wrapper>
  );
}

export default TichuScore;
