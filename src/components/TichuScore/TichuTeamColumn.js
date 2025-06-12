import PlayerCard from "../PlayerCard";
import TichuScoreBox from "./TichuScoreBox";
import styled from "styled-components";

const TeamColumn = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  align-items: center;
`;

function TichuTeamColumn({
  team,
  players,
  tichuScore,
  onCardClick,
  onStatusClick,
}) {
  return (
    <TeamColumn>
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          playerColor={team}
          playerName={player.name}
          displayOrder={player.displayOrder}
          isSelected={player.isSelected}
          onCardClick={() => onCardClick(player.id)}
          onStatusChipClick={() => onStatusClick(player.id)}
          iconColor="rgba(0,0,0,0.5)"
          tichuStatus={player.tichuStatus}
        />
      ))}
      <TichuScoreBox
        textColor={team === "Blue" ? "#3C82F6" : "#E9B306"}
      >
        {tichuScore}
      </TichuScoreBox>
    </TeamColumn>
  );
}

export default TichuTeamColumn;
