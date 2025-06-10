import styled from "styled-components";

// StatusChip (예: NO TICHU, ST SUCCESS 등을 표시)
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
  /* border: 1px solid white; */

  &:hover {
    background-color: rgba(0, 0, 0, 0.2); /* 배경색 예시 */
  }
`;

const handleStatusChipClick = () => {};

function StatusChip({ children }) {
  return <StatusChipWrapper>{children}</StatusChipWrapper>;
}

export default StatusChip;
