// src/components/App/App.styles.js
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 512px;
  gap: 16px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;
