import styled from "styled-components";

export const StylingButton = styled.button`
  padding: 6px;
  border: none;
  background: ${(props) => (props.isActive ? "#d1e7fd" : "white")};
  color: ${(props) => (props.isActive ? "#0056b3" : "black")};
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #e3f2fd;
  }
`;

export const StylingButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
