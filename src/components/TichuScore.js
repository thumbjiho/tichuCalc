import styled from "styled-components";
import Subtitle from "./Subtitle";
import TichuTeamColumn from "./TichuTeamColumn";
import { useTichuGameState } from "../hooks/useTichuGameState"; // Assuming this path is correct

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

// TichuScore component receives scores from App.js
function TichuScore({
  setTichuScores,
  setIsDoubleWin,
  scores = [0, 0],
}) {
  // useTichuGameState hook manages player state and calls setTichuScores/setIsDoubleWin
  const { players, handlePlayerClick, handleStatusClick } =
    useTichuGameState({ setTichuScores, setIsDoubleWin });

  // Filter players for each team
  const bluePlayers = players.filter((p) => p.team === "Blue");
  const yellowPlayers = players.filter((p) => p.team === "Yellow");

  return (
    <Wrapper>
      <Subtitle>Tichu Score</Subtitle>
      <Container>
        {/* Pass filtered players and the relevant score from the 'scores' prop */}
        <TichuTeamColumn
          team="Blue"
          players={bluePlayers}
          score={scores[0]}
          onCardClick={handlePlayerClick}
          onStatusClick={handleStatusClick}
        />
        <TichuTeamColumn
          team="Yellow"
          players={yellowPlayers}
          score={scores[1]}
          onCardClick={handlePlayerClick}
          onStatusClick={handleStatusClick}
        />
      </Container>
    </Wrapper>
  );
}

export default TichuScore;
