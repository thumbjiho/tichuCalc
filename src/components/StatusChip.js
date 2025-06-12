import styled, { css } from "styled-components";
// Assuming ChevronIcon or similar icon is passed as a child or imported here if needed
// import { ReactComponent as ChevronIcon } from "./assets/icons/chevron-up-down.svg";

const StatusChipWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: 32px;
  flex-direction: row;
  gap: 4px; /* 아이콘과 텍스트 사이 간격 */
  align-items: center;
  border-radius: 999px; /* 칩의 둥근 모서리 */
  background-color: rgba(0, 0, 0, 0.1); /* 배경색 예시 */
  color: rgba(0, 0, 0, 0.5); /* 텍스트 색상 예시 */
  font-size: 14px; /* 텍스트 크기 예시 */
  padding: 0 16px;
  width: 100%;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2); /* 호버 시 배경색 변경 */
  }
  ${({ $disabled }) =>
    $disabled &&
    css`
      background-color: white;
      color: black;
      pointer-events: none;
      cursor: not-allowed;
      top: -3px;
      box-shadow: 0 3px 0 rgba(0, 0, 0, 0.25);
    `}
`;

// StatusChip 컴포넌트 (내용을 children으로 받을 수 있도록 수정)
function StatusChip({ children, onClick, disabled }) {
  return (
    <StatusChipWrapper
      onClick={disabled ? undefined : onClick}
      $disabled={disabled}
    >
      {children}
    </StatusChipWrapper>
  );
}

export default StatusChip;
