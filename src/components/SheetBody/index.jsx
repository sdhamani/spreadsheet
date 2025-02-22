import React from "react";
import { useSheetStore } from "../../store/useSheetStore";
import Cell from "../Cell";
import {
  SheetContainer,
  HeaderContainer,
  HeaderRow,
  ColumnHeader,
  Placeholder,
  RowHeader,
  BodyContainer,
  CellWrapper,
  Row,
  AddRemoveButtonsWrapper,
  AddRemoveButton,
} from "./styles";

const SheetBody = () => {
  const { columns, rows, addColumn, removeColumn, addRow, removeRow } =
    useSheetStore();

  return (
    <SheetContainer>
      <HeaderContainer>
        <HeaderRow>
          <Placeholder />
          {Array.from({ length: columns }).map((_, index) => (
            <ColumnHeader key={index}>
              {String.fromCharCode(65 + index)}
            </ColumnHeader>
          ))}
          <AddRemoveButtonsWrapper>
            <AddRemoveButton onClick={addColumn}>+</AddRemoveButton>
            <AddRemoveButton onClick={removeColumn}>-</AddRemoveButton>
          </AddRemoveButtonsWrapper>
        </HeaderRow>
      </HeaderContainer>

      <BodyContainer>
        <div>
          {Array.from({ length: rows }).map((_, index) => (
            <RowHeader key={index}>{index + 1}</RowHeader>
          ))}
          <AddRemoveButtonsWrapper>
            <AddRemoveButton onClick={addRow}>+</AddRemoveButton>
            <AddRemoveButton onClick={removeRow}>-</AddRemoveButton>
          </AddRemoveButtonsWrapper>
        </div>
        <CellWrapper>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <Row key={rowIndex}>
              {Array.from({ length: columns }).map((_, columnIndex) => (
                <Cell
                  key={`${columnIndex}-${rowIndex}`}
                  columnIndex={columnIndex}
                  rowIndex={rowIndex}
                />
              ))}
            </Row>
          ))}
        </CellWrapper>
      </BodyContainer>
    </SheetContainer>
  );
};

export default SheetBody;
