import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const ScoreContainer = styled.div`
  box-sizing: border-box;
  font-family: "proxima-soft";
  display: flex;
  width: 100%;
  background-color: #000;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.3);
`;

export const ScoreBox = styled.div`
  width: 100%;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  background-color: ${({ selected }) =>
    selected ? "rgba(255, 255, 255, 0.15)" : "#000"};
  color: ${({ color }) => (color === "blue" ? "#3b82f6" : "#facc15")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;

export const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
