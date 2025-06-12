import styled from "styled-components";
import { useEffect } from "react"; // ✅ 추가
import Subtitle from "./Subtitle";
import TichuTeamColumn from "./TichuTeamColumn";
import { useTichuGameState } from "../hooks/useTichuGameState";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

function TichuScore({
  setTichuScores,
  setIsDoubleWin,
  setDoubleWinTeam,
  setPlayers, // ✅ 추가
  tichuScores = [0, 0],
}) {
  const { players, handlePlayerClick, handleStatusClick } =
    useTichuGameState({
      setTichuScores,
      setIsDoubleWin,
      setDoubleWinTeam,
    });

  useEffect(() => {
    setPlayers?.(players); // ✅ App.js에 플레이어 상태 전달
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
