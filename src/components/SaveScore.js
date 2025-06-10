import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 360px; */
  flex-direction: column;
  gap: 16px;
  height: fit-content;
  justify-content: center;
  padding: 8px;
`;

const Commentary = styled.div`
  font-size: 20px;
  height: 32px;
  /* font-family: "proxima-soft"; */
  color: white;
  font-weight: 700;
  text-align: center;
  width: 100%;
  margin-bottom: -4px;
`;

function SaveScore() {
  return (
    <Wrapper>
      <Commentary>Oof...what a game</Commentary>
      <Button
        // disabled
        color="orange"
        height={48}
        radius={999}
      >
        Save
      </Button>
    </Wrapper>
  );
}

export default SaveScore;
