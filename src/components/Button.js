// src/components/Button.js
import styled from "styled-components";

const colorMap = {
  green: ["#22C55E", "#16A34A", "#4ED17E"], // base, shadow, border
  red: ["#EF4444", "#DC2626", "#F15757"],
  orange: ["#F97316", "#EA580C", "#FA8F45"],
};

const StyledButton = styled.button`
  position: relative;
  top: -3px;
  box-shadow: 0 3px 0 ${({ color }) => colorMap[color]?.[1] || "#ccc"};
  font-family: "proxima-soft";
  background-color: ${({ color }) => colorMap[color]?.[0] || "#ccc"};
  color: white;
  width: 100%;
  border: 3px solid ${({ color }) => colorMap[color]?.[2] || "#ccc"};
  border-radius: ${({ radius }) => (radius ? `${radius}px` : "8px")};
  font-weight: 700;
  height: ${({ height }) => (height ? `${height}px` : "40px")};
  display: flex; /* align-items와 justify-content를 사용하려면 flex를 사용해야 합니다. */
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.05s ease;

  &:hover {
    opacity: ${({ disabled }) =>
      disabled ? 1 : 0.85}; /* disabled일 때는 opacity 변경 안 함 */
  }

  &:active {
    top: 0px;
    box-shadow: none;
  }

  &:disabled {
    cursor: not-allowed;
    color: #919191;
    background-color: #bababa;
    border-color: #c8c8c8;
    box-shadow: 0 3px 0 #9a9a9a;
    pointer-events: none; /* 클릭 이벤트를 비활성화합니다. */
  }
`;

function Button({ children, disabled = false, onClick, ...rest }) {
  // disabled 상태일 때는 onClick 이벤트를 전달하지 않습니다.
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault(); // 기본 클릭 동작 방지
      return;
    }
    onClick && onClick(e);
  };

  return (
    <StyledButton
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
