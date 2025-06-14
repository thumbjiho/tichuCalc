import styled, { css } from "styled-components"; // css를 import 해야 조건부 스타일링 가능
import { ReactComponent as ChevronIcon } from "./assets/icons/chevron-up-down.svg"; // SVG 아이콘 import
import OrderCounter from "./OrderCounter"; // OrderCounter 컴포넌트 import
import StatusChip from "./StatusChip"; // StatusChip 컴포넌트 import

const colorMap = {
  Blue: ["#3C82F6", "#2463EB", "#5796F7", "#1E417B", "#3F5E8F"], // base, shadow, border, dark base, dark border
  Yellow: ["#E9B306", "#CA8A03", "#EEC239", "#8C6B06", "#A38937"],
};

const Icon = styled(ChevronIcon).withConfig({
  shouldForwardProp: (prop) => prop !== "iconColor",
})`
  width: 12px;
  height: 12px;
  // iconColor prop이 있으면 그 색상, 없으면 기본값 (반투명 검정)
  color: ${({ iconColor }) => iconColor || "rgba(0, 0, 0, 0.5)"};
`;

// PlayerCard 전체를 감싸는 버튼 컨테이너
const PlayerCardContainer = styled.button`
  position: relative;
  top: -3px; /* 기본 (눌리지 않은) 상태의 위치 */
  box-sizing: border-box;
  font-family: "proxima-soft";
  display: flex;
  width: 100%;
  font-size: 24px;
  font-weight: 700;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: white;
  gap: 8px;
  border-radius: 8px;
  border: 3px solid ${({ color }) => colorMap[color]?.[0] || "#ccc"};
  box-shadow: 0 3px 0 ${({ color }) => colorMap[color]?.[1] || "#ccc"};
  background-color: ${({ color }) => colorMap[color]?.[2] || "#ccc"};
  cursor: pointer; /* 클릭 가능함을 표시 */
  transition: all 0.15s;
  &:hover {
    opacity: 0.9; /* 호버 시 약간 투명하게 */
  }

  // isPressed prop에 따른 스타일 변경 (카드가 눌린 상태)
  ${({ $isPressed }) =>
    $isPressed &&
    css`
      top: 0px; /* 아래로 이동 */
      box-shadow: none; /* 그림자 제거 */
      // 눌린 상태에서 배경색과 테두리색을 약간 더 어둡게 변경 (선택 사항)
      background-color: ${({ color }) =>
        colorMap[color]?.[3] || "#ccc"};
      border-color: ${({ color }) => colorMap[color]?.[4] || "#ccc"};
    `}
`;

// 플레이어 이름과 순서 카운터를 감싸는 Wrapper
const PlayerNameAndOrderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

// PlayerCard 컴포넌트
function PlayerCard({
  isSelected, // 카드가 선택(눌린) 상태인지 나타내는 prop
  displayOrder, // 표시될 순서 번호
  iconColor, // 아이콘 색상
  playerColor, // 플레이어 카드 배경/테두리 색상
  playerName, // 플레이어 이름
  onCardClick, // 카드 클릭 시 호출될 함수
  onStatusChipClick, // StatusChip 클릭 시 호출될 함수 (TichuScore에서 전달됨)
  tichuStatus, // 현재 Tichu 상태 (TichuScore에서 전달됨)
}) {
  // StatusChip 클릭 핸들러: 이벤트 버블링 방지 및 부모의 onStatusChipClick 호출
  const handleStatusChipClickLocal = (event) => {
    event.stopPropagation(); // 부모의 onClick (PlayerCardContainer) 호출 방지
    if (onStatusChipClick) {
      onStatusChipClick(); // 부모로부터 받은 onStatusChipClick 함수 호출
    }
  };

  return (
    <PlayerCardContainer
      color={playerColor}
      onClick={onCardClick} // PlayerCard 전체 클릭 이벤트 핸들러
      $isPressed={isSelected} // isSelected 값에 따라 눌린 상태 스타일 적용
    >
      <PlayerNameAndOrderWrapper>
        <OrderCounter isSelected={isSelected}>
          {displayOrder}
        </OrderCounter>
        <div>{playerName}</div>
      </PlayerNameAndOrderWrapper>
      {/* StatusChip에 tichuStatus를 children으로 전달하고, 클릭 핸들러 연결 */}
      <StatusChip
        onClick={handleStatusChipClickLocal}
        disabled={isSelected}
      >
        <div>{tichuStatus}</div>
        {!isSelected && <Icon iconColor={iconColor} />}
      </StatusChip>
    </PlayerCardContainer>
  );
}

export default PlayerCard;
