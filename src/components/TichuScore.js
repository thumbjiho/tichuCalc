// TichuScore.js
import React, { useState } from "react";
import styled from "styled-components";
import Subtitle from "./Subtitle";
import PlayerCard from "./PlayerCard"; // PlayerCard 컴포넌트를 import 합니다.

// Tichu 상태를 위한 상수 정의 (재사용성을 위해 외부에 정의)
export const TICHU_STATUS = {
  NO_TICHU: "NO TICHU",
  SMALL_TICHU: "SMALL TICHU",
  LARGE_TICHU: "LARGE TICHU",
  ST_FAIL: "ST FAIL!",
  LT_FAIL: "LT_FAIL!",
  ST_SUCCESS: "ST SUCCESS!",
  LT_SUCCESS: "LT SUCCESS!",
  DOUBLE_WIN: "DOUBLE_WIN!",
  NONE: "NONE",
};

// --- TichuScore의 기존 styled-components (변경 없음) ---
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

const TeamColumn = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  align-items: center;
`;

function TichuScore() {
  // 플레이어들의 상태를 관리하는 state
  const [players, setPlayers] = useState([
    {
      id: "p1",
      name: "Jojo",
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
    {
      id: "p2",
      name: "Lizzy",
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
    {
      id: "p3",
      name: "Jiang",
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
    {
      id: "p4",
      name: "Hoo",
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
  ]);

  // PlayerCard 클릭 핸들러: 카드의 선택 상태를 토글하고 순서를 재조정합니다.
  const handlePlayerCardClick = (clickedPlayerId) => {
    setPlayers((prevPlayers) => {
      const clickedPlayer = prevPlayers.find(
        (p) => p.id === clickedPlayerId
      );
      if (!clickedPlayer) return prevPlayers; // 클릭된 플레이어를 찾지 못하면 이전 상태 반환

      let updatedPlayers;

      // 클릭된 플레이어의 isSelected 상태를 토글합니다.
      updatedPlayers = prevPlayers.map((p) =>
        p.id === clickedPlayerId
          ? { ...p, isSelected: !p.isSelected, order: null }
          : p
      );

      // 현재 선택된 플레이어들을 필터링하고, 기존 순서를 유지하면서 정렬합니다.
      // (단, 새로 선택된 플레이어는 order가 null이므로 정렬 시 뒤로 배치되도록 합니다.)
      const currentlySelectedPlayers = updatedPlayers
        .filter((p) => p.isSelected)
        .sort((a, b) => {
          if (a.order === null && b.order === null) return 0; // 둘 다 null이면 순서 변경 없음
          if (a.order === null) return 1; // a가 null이면 b 뒤로
          if (b.order === null) return -1; // b가 null이면 a 뒤로
          return a.order - b.order; // 둘 다 null이 아니면 기존 순서대로 정렬
        });

      // 선택된 플레이어들에게 새로운 순서를 할당합니다.
      // 이 과정에서 순서가 재조정됩니다.
      const finalPlayers = updatedPlayers.map((player) => {
        if (player.isSelected) {
          const newOrder =
            currentlySelectedPlayers.findIndex(
              (p) => p.id === player.id
            ) + 1;
          return { ...player, order: newOrder };
        } else {
          return { ...player, order: null }; // 선택 해제된 플레이어는 order를 null로 설정
        }
      });

      console.log("Updated Players State:", finalPlayers);
      return finalPlayers;
    });
  };

  return (
    <Wrapper>
      <Subtitle>Tichu Score</Subtitle>
      <Container>
        <TeamColumn>
          {/* Blue 팀 플레이어 렌더링 */}
          {players
            .filter((p) => p.id === "p1" || p.id === "p2")
            .map((player) => (
              <PlayerCard
                key={player.id}
                playerColor="Blue"
                playerName={player.name}
                finishOrder={player.order} // 동적으로 업데이트된 순서 전달
                isSelected={player.isSelected} // 동적으로 업데이트된 선택 상태 전달
                onCardClick={() => handlePlayerCardClick(player.id)} // 클릭 핸들러 전달
                iconColor="rgba(0,0,0,0.5)" // 아이콘 색상 기본값
              />
            ))}
        </TeamColumn>
        <TeamColumn>
          {/* Yellow 팀 플레이어 렌더링 */}
          {players
            .filter((p) => p.id === "p3" || p.id === "p4")
            .map((player) => (
              <PlayerCard
                key={player.id}
                playerColor="Yellow"
                playerName={player.name}
                finishOrder={player.order} // 동적으로 업데이트된 순서 전달
                isSelected={player.isSelected} // 동적으로 업데이트된 선택 상태 전달
                onCardClick={() => handlePlayerCardClick(player.id)} // 클릭 핸들러 전달
                iconColor="rgba(0,0,0,0.5)" // 아이콘 색상 기본값
              />
            ))}
        </TeamColumn>
      </Container>
    </Wrapper>
  );
}

export default TichuScore;
