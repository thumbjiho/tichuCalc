// TichuScore.js
import React, { useState, useEffect } from "react"; // useEffect import 추가
import styled from "styled-components";
import Subtitle from "./Subtitle";
import PlayerCard from "./PlayerCard"; // PlayerCard 컴포넌트를 import 합니다.
import TichuScoreBox from "./TichuScoreBox"; // TichuScoreBox 컴포넌트를 import 합니다.

// Tichu 상태를 위한 상수 정의 (재사용성을 위해 외부에 정의)
export const TICHU_STATUS = {
  NO_TICHU: "NO TICHU",
  SMALL_TICHU: "SMALL TICHU",
  LARGE_TICHU: "LARGE TICHU",
  ST_FAIL: "ST FAIL!",
  LT_FAIL: "LT FAIL!",
  ST_SUCCESS: "ST SUCCESS!",
  LT_SUCCESS: "LT SUCCESS!",
  DOUBLE_WIN: "DOUBLE WIN!",
  NONE: "NONE",
};

// --- TichuScore의 기존 styled-components ---
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

// ScoreDisplayRow styled component 재추가
const ScoreDisplayRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 16px; /* Spacing between player cards and score boxes */
`;
// --- TichuScore의 기존 styled-components 끝 ---

function TichuScore({ setTichuScores }) {
  // 플레이어들의 상태를 관리하는 state (team 속성 추가)
  const [players, setPlayers] = useState([
    {
      id: "p1",
      name: "Jojo",
      team: "Blue", // 팀 정보 추가
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
    {
      id: "p2",
      name: "Lizzy",
      team: "Blue", // 팀 정보 추가
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
    {
      id: "p3",
      name: "Jiang",
      team: "Yellow", // 팀 정보 추가
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
    {
      id: "p4",
      name: "Hoo",
      team: "Yellow", // 팀 정보 추가
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
  ]);

  // 다음 Tichu 상태를 순환하는 헬퍼 함수
  function getNextTichuStatus(current) {
    switch (current) {
      case TICHU_STATUS.NO_TICHU:
        return TICHU_STATUS.SMALL_TICHU;
      case TICHU_STATUS.SMALL_TICHU:
        return TICHU_STATUS.LARGE_TICHU;
      case TICHU_STATUS.LARGE_TICHU:
        return TICHU_STATUS.NO_TICHU;
      default:
        return TICHU_STATUS.NO_TICHU;
    }
  }

  // 플레이어 순서 변경 시 Tichu 상태를 업데이트하는 useEffect
  useEffect(() => {
    setPlayers((prev) => {
      return prev.map((p) => {
        const { order, baseTichuStatus, team } = p; // team 속성 추가

        // 순서가 없거나 기본 Tichu 상태가 NO_TICHU면 변경 없음
        if (!order || baseTichuStatus === TICHU_STATUS.NO_TICHU) {
          return p;
        }

        // 팀원 찾기
        const teamMates = prev.filter(
          (player) => player.team === team && player.id !== p.id
        );
        const teammateOrder =
          teamMates.length > 0 ? teamMates[0].order : null; // 첫 번째 팀원의 순서를 가져옴

        // Small Tichu 선언 상태에 따른 성공/실패 로직
        if (baseTichuStatus === TICHU_STATUS.SMALL_TICHU) {
          return {
            ...p,
            tichuStatus:
              order === 1 // 1등이면 성공
                ? TICHU_STATUS.ST_SUCCESS
                : TICHU_STATUS.ST_FAIL, // 1등이 아니면 실패
          };
        }

        // Large Tichu 선언 상태에 따른 성공/실패 로직
        if (baseTichuStatus === TICHU_STATUS.LARGE_TICHU) {
          return {
            ...p,
            tichuStatus:
              order === 1 // 1등이면 성공
                ? TICHU_STATUS.LT_SUCCESS
                : TICHU_STATUS.LT_FAIL, // 1등이 아니면 실패
          };
        }

        // 2등 플레이어의 상태 로직 (더블 승리 또는 일반 패배)
        if (order === 2) {
          if (teammateOrder === 1) {
            // 팀원이 1등이면 더블 승리
            return { ...p, tichuStatus: TICHU_STATUS.DOUBLE_WIN };
          } else {
            // 팀원이 1등이 아니면 특별한 Tichu 선언이 아니므로 NONE 또는 초기 상태
            return { ...p, tichuStatus: TICHU_STATUS.NONE }; // NONE 또는 NO_TICHU로 설정
          }
        }

        // 그 외의 경우 (3등, 4등 또는 아직 처리되지 않은 상태)
        return { ...p, tichuStatus: TICHU_STATUS.NONE }; // NONE 또는 NO_TICHU로 설정
      });
    });
  }, [players.map((p) => p.order).join(",")]); // players 배열의 order 변화에 반응

  // PlayerCard 클릭 핸들러: 카드의 선택 상태를 토글하고 순서를 재조정합니다.
  const handlePlayerCardClick = (clickedPlayerId) => {
    setPlayers((prevPlayers) => {
      // 선택 여부 토글
      let updatedPlayers = prevPlayers.map((p) =>
        p.id === clickedPlayerId
          ? { ...p, isSelected: !p.isSelected, order: null } // 선택 해제 시 order를 null로 초기화
          : p
      );

      // 현재 선택된 플레이어들을 필터링하고, 기존 순서를 유지하면서 정렬합니다.
      const selected = updatedPlayers
        .filter((p) => p.isSelected)
        .sort((a, b) => {
          if (a.order === null) return 1; // null은 뒤로
          if (b.order === null) return -1; // null은 뒤로
          return a.order - b.order; // 기존 순서대로
        });

      // 최종 플레이어 상태 업데이트 (순서 재할당 및 Tichu 상태 재설정)
      const finalPlayers = updatedPlayers.map((p) => {
        if (p.isSelected) {
          const newOrder =
            selected.findIndex((sp) => sp.id === p.id) + 1;
          return { ...p, order: newOrder }; // 새로운 순서 할당
        } else {
          return {
            ...p,
            order: null, // 선택 해제 시 order null
            tichuStatus: p.baseTichuStatus, // 선택 해제 시 tichuStatus를 baseTichuStatus로 초기화
          };
        }
      });

      return finalPlayers;
    });
  };

  // StatusChip 클릭 핸들러: baseTichuStatus를 순환시킵니다.
  const handleStatusChipClick = (playerId) => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id !== playerId) return p;
        const newBase = getNextTichuStatus(p.baseTichuStatus); // 다음 상태 가져오기
        return {
          ...p,
          baseTichuStatus: newBase, // 기본 상태 업데이트
          tichuStatus: newBase, // 표시 상태도 기본 상태로 일단 업데이트 (useEffect에서 재조정됨)
        };
      })
    );
  };

  // --- Tichu Score 계산 로직 재추가 ---
  const calculateTeamTichuScores = () => {
    let blueTeamScore = 0;
    let yellowTeamScore = 0;

    players.forEach((player) => {
      let playerPoints = 0;
      // Note: This logic currently only considers the Tichu declaration success/fail.
      // Full Tichu scoring also involves points from cards and game end conditions (e.g., all out).
      // You would expand this logic as needed for a complete scoring system.
      switch (player.tichuStatus) {
        case TICHU_STATUS.ST_SUCCESS:
          playerPoints = 100;
          break;
        case TICHU_STATUS.ST_FAIL:
          playerPoints = -100;
          break;
        case TICHU_STATUS.LT_SUCCESS:
          playerPoints = 200;
          break;
        case TICHU_STATUS.LT_FAIL:
          playerPoints = -200;
          break;
        case TICHU_STATUS.DOUBLE_WIN: // Assuming double win adds 200 points to the team
          playerPoints = 200; // This might need more complex logic if it's relative to opponents
          break;
        default:
          playerPoints = 0; // NO_TICHU, SMALL_TICHU, LARGE_TICHU (if not yet resolved), NONE all give 0 points for declaration
      }

      if (player.team === "Blue") {
        blueTeamScore += playerPoints;
      } else if (player.team === "Yellow") {
        yellowTeamScore += playerPoints;
      }
    });

    return { blueTeamScore, yellowTeamScore };
  };

  const { blueTeamScore, yellowTeamScore } =
    calculateTeamTichuScores();

  useEffect(() => {
    setTichuScores([blueTeamScore, yellowTeamScore]);
  }, [blueTeamScore, yellowTeamScore]);
  // --- Tichu Score 계산 로직 끝 ---

  return (
    <Wrapper>
      <Subtitle>Tichu Score</Subtitle>
      <Container>
        <TeamColumn>
          {/* Blue 팀 플레이어 렌더링 */}
          {players
            .filter((p) => p.team === "Blue") // team 필터링
            .map((player) => (
              <PlayerCard
                key={player.id}
                playerColor="Blue"
                playerName={player.name}
                finishOrder={player.order} // 동적으로 업데이트된 순서 전달
                isSelected={player.isSelected} // 동적으로 업데이트된 선택 상태 전달
                onCardClick={() => handlePlayerCardClick(player.id)} // 카드 전체 클릭 핸들러
                onStatusChipClick={() =>
                  handleStatusChipClick(player.id)
                } // StatusChip 클릭 핸들러 전달
                iconColor="rgba(0,0,0,0.5)" // 아이콘 색상 기본값
                tichuStatus={player.tichuStatus} // 현재 Tichu 상태 전달
              />
            ))}
          <TichuScoreBox textColor="#3C82F6">
            {blueTeamScore}
          </TichuScoreBox>
        </TeamColumn>
        <TeamColumn>
          {/* Yellow 팀 플레이어 렌더링 */}
          {players
            .filter((p) => p.team === "Yellow") // team 필터링
            .map((player) => (
              <PlayerCard
                key={player.id}
                playerColor="Yellow"
                playerName={player.name}
                finishOrder={player.order} // 동적으로 업데이트된 순서 전달
                isSelected={player.isSelected} // 동적으로 업데이트된 선택 상태 전달
                onCardClick={() => handlePlayerCardClick(player.id)} // 카드 전체 클릭 핸들러
                onStatusChipClick={() =>
                  handleStatusChipClick(player.id)
                } // StatusChip 클릭 핸들러 전달
                iconColor="rgba(0,0,0,0.5)" // 아이콘 색상 기본값
                tichuStatus={player.tichuStatus} // 현재 Tichu 상태 전달
              />
            ))}
          <TichuScoreBox textColor="#E9B306">
            {yellowTeamScore}
          </TichuScoreBox>
        </TeamColumn>
      </Container>
    </Wrapper>
  );
}

export default TichuScore;
