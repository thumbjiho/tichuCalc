import styled from "styled-components";

// TichuScoreBoxBase is a simple functional component that renders a div.
// This is the base component that styled-components will "wrap" or "style".
function TichuScoreBoxBase({ children, ...props }) {
  // Pass children and any other props down to the div
  return <div {...props}>{children}</div>;
}

// TichuScoreBox is a styled component that applies CSS to TichuScoreBoxBase.
const TichuScoreBox = styled(TichuScoreBoxBase).withConfig({
  shouldForwardProp: (prop) => prop !== "textColor",
})`
  /* Add your desired CSS styles here */
  background-color: #000; /* Example background color */
  color: ${({ textColor }) => textColor};
  font-family: "proxima-soft";
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  font-size: 24px;
  font-weight: 700;
  border-radius: 8px;
  text-align: center;
  margin: -4px 0;
  width: 100%;
  box-shadow: 0 4px rgba(0, 0, 0, 0.3);
`;

export default TichuScoreBox;
