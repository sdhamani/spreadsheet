import styled from "styled-components";

export const SheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  overflow-x: auto;
  background: #f3f3f3;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  background: #f3f3f3;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 2;
  width: max-content; /* Prevents shrinking */
`;

export const ColumnHeader = styled.div`
  min-width: 100px; /* Ensures headers match cell width */
  max-width: 100px;
  height: 30px;
  text-align: center;
  font-weight: bold;
  border-right: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
`;

export const Placeholder = styled.div`
  width: 40px;
  height: 30px;
  background: #f3f3f3;
  border-right: 1px solid #ddd;
  border-bottom: 2px solid #ddd;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
  overflow: auto;
`;

export const RowHeader = styled.div`
  width: 40px;
  min-width: 40px;
  height: 30px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  border-right: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
`;

export const CellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto; /* Ensures horizontal scroll */
  width: max-content;
  height: 100%;
`;

export const Row = styled.div`
  display: flex;
  width: max-content;
`;

export const AddRemoveButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
  height: auto;
`;

export const AddRemoveButton = styled.button`
  margin: 1px;
  padding: 1px 5px;
  font-size: 14px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  &:hover {
    background: #f3f3f3;
  }
`;
