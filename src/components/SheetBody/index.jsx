import React, { useCallback, useState, useEffect, useRef } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import { useSheetStore } from "../../store/useSheetStore";
import Cell from "../Cell";
import {
  SheetContainer,
  HeaderContainer,
  HeaderRow,
  ColumnHeader,
  Placeholder,
  BodyContainer,
  RowHeader,
  CellWrapper,
  Row,
  AddRemoveButtonsWrapper,
  AddRemoveButton,
} from "./styles";

const CELL_WIDTH = 100;
const CELL_HEIGHT = 30;
const OVERSCAN_COUNT = 2;

const getColumnName = (index) => {
  let columnName = "";
  let num = index;

  while (num >= 0) {
    columnName = String.fromCharCode((num % 26) + 65) + columnName;
    num = Math.floor(num / 26) - 1;
  }

  return columnName;
};

const SheetBody = () => {
  const { columns, rows, addColumn, removeColumn, addRow, removeRow } =
    useSheetStore();
  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 600,
    visibleColumns: 0,
    visibleRows: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth - 60;
      const height = window.innerHeight - 150;
      const visibleColumns = Math.ceil(width / CELL_WIDTH);
      const visibleRows = Math.ceil(height / CELL_HEIGHT);

      setDimensions({
        width,
        height,
        visibleColumns,
        visibleRows,
      });
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const CellRenderer = useCallback(({ columnIndex, rowIndex, style }) => {
    if (rowIndex === 0) {
      if (columnIndex === 0) {
        return (
          <div
            style={{
              ...style,
              background: "#f3f3f3",
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        );
      }
      return (
        <div
          style={{
            ...style,
            textAlign: "center",
            fontWeight: "bold",
            background: "#f3f3f3",
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {getColumnName(columnIndex - 1)}
        </div>
      );
    }

    if (columnIndex === 0) {
      return (
        <div
          style={{
            ...style,
            textAlign: "center",
            background: "#f3f3f3",
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {rowIndex}
        </div>
      );
    }

    return (
      <div style={style}>
        <Cell columnIndex={columnIndex - 1} rowIndex={rowIndex - 1} />
      </div>
    );
  }, []);

  const getColumnWidth = useCallback(
    (index) => (index === 0 ? 40 : CELL_WIDTH),
    []
  );

  return (
    <SheetContainer>
      <HeaderContainer></HeaderContainer>

      <BodyContainer>
        <Grid
          columnCount={columns + 1}
          columnWidth={getColumnWidth}
          height={dimensions.height}
          rowCount={rows + 1}
          rowHeight={(rowIndex) => (rowIndex === 0 ? CELL_HEIGHT : CELL_HEIGHT)}
          width={dimensions.width}
          overscanColumnCount={OVERSCAN_COUNT}
          overscanRowCount={OVERSCAN_COUNT}
          useIsScrolling
          itemKey={({ columnIndex, rowIndex }) => `${columnIndex}-${rowIndex}`}
        >
          {CellRenderer}
        </Grid>
        <AddRemoveButtonsWrapper>
          <AddRemoveButton onClick={addRow}>+</AddRemoveButton>
          <AddRemoveButton onClick={removeRow}>-</AddRemoveButton>
        </AddRemoveButtonsWrapper>
      </BodyContainer>
    </SheetContainer>
  );
};

export default React.memo(SheetBody);
