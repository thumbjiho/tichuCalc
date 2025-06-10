import styled, { css } from "styled-components"; // css를 import 해야 조건부 스타일링 가능

// OrderCounter의 스타일 (순서 번호 표시용 원)
const StyledOrderCounterWrapper = styled.div`
  position: relative;
  display: flex; // flex 컨테이너로 설정하여 내용물 중앙 정렬
  color: white; // 폰트 색상 (기본값, 순서 없을 때도 흰색 점선이 보이므로 유지)
  width: 24px;
  height: 24px;
  border-radius: 999px; // 원형으로 만듦
  font-size: 18px;
  font-weight: 700;
  align-items: center; // 세로 중앙 정렬
  justify-content: center; // 가로 중앙 정렬
  flex-shrink: 0; // 내용물이 줄어들지 않도록 방지

  // 기본 상태 (순서가 없을 때: children === null)
  background-color: transparent; // 배경 채움 없음
  border: 2px dotted white; // 흰색 점선 테두리

  // 순서가 있을 때 ($hasOrder prop이 true일 때)의 스타일
  ${({ $hasOrder }) =>
    $hasOrder &&
    css`
      background-color: black; // 검은색 배경 채움
      border: none; // 테두리 제거 (점선 없애기)
      color: white; // 텍스트 색상 (확실히 명시)
    `}
`;

// OrderCounter 컴포넌트
function OrderCounter({ children }) {
  // children이 null이 아니면 $hasOrder prop을 true로 전달
  // null이면 false가 되어 기본 스타일 적용
  return (
    <StyledOrderCounterWrapper $hasOrder={children !== null}>
      {children}
    </StyledOrderCounterWrapper>
  );
}

export default OrderCounter;
