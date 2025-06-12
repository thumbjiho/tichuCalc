import styled from "styled-components";

export const Subtitle = styled.div`
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
`;

export const ScoreContainer = styled.div`
  box-sizing: border-box;
  font-family: "proxima-soft";
  display: flex;
  width: 100%;
  background-color: black;
  padding: 4px;
  border-radius: 8px;
  justify-content: space-around;
  align-items: center;
`;

export const ScoreBox = styled.div`
  width: 100%;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.textColor || "white"};
  display: flex;
  align-items: center;
  justify-content: center;
`;
