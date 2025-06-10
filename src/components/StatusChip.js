import styled from "styled-components";
// Assuming ChevronIcon or similar icon is passed as a child or imported here if needed
// import { ReactComponent as ChevronIcon } from "./assets/icons/chevron-up-down.svg";

const StatusChipWrapper = styled.div`
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
  /* border: 1px solid white; (주석 처리됨) */
  transition: background-color 0.2s ease; /* 호버 시 배경색 전환 부드럽게 */

  &:hover {
    background-color: rgba(0, 0, 0, 0.2); /* 호버 시 배경색 변경 */
  }
`;

// StatusChip 컴포넌트 (내용을 children으로 받을 수 있도록 수정)
function StatusChip({ children }) {
  // The 'handleStatusChipClick' variable was defined but not used, causing a build error.
  // It has been removed. If you intend to add click functionality to the StatusChip,
  // please re-implement the handler and ensure it's used (e.g., onClick={handleStatusChipClick}).
  return <StatusChipWrapper>{children}</StatusChipWrapper>;
}

export default StatusChip;
