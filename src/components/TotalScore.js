import styled from "styled-components";
import Subtitle from "./Subtitle";

const colorMap = {
  blue: "#3b82f6",
  yellow: "#facc15",
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 360px; */
  flex-direction: column;

  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const ScoreContainer = styled.div`
  box-sizing: border-box;
  font-family: "proxima-soft";
  display: flex;
  width: 100%;
  background-color: #000;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  height: 100%;
  justify-content: 100%;
  align-items: center;
  top: 10px;
`;

const ScoreBox = styled.div`
  width: 100%;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  background-color: ${({ selected }) =>
    selected ? "rgba(255, 255, 255, 0.15)" : "#000"};
  color: ${({ color }) => colorMap[color?.toLowerCase()]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
`;

function TotalScore({ scores }) {
  return (
    <Wrapper>
      <Subtitle>Total Score</Subtitle>
      <ScoreContainer>
        <ScoreBox color="blue">{scores[0]}</ScoreBox>
        <div>:</div>
        <ScoreBox color="yellow">{scores[1]}</ScoreBox>
      </ScoreContainer>
    </Wrapper>
  );
}

export default TotalScore;
