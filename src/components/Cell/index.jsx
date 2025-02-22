import { useRef, useState, useEffect } from "react";
import { useSheetStore } from "../../store/useSheetStore";
import { StyledCell } from "./styles";

const Cell = ({ columnIndex, rowIndex }) => {
  const cellId = `${String.fromCharCode(65 + columnIndex)}${rowIndex + 1}`;
  const inputRef = useRef(null);

  const value = useSheetStore((state) => state.cells[cellId]?.value || "");
  const styling = useSheetStore((state) => state.cells[cellId]?.styling || "");
  const formula = useSheetStore(
    (state) => state.cells[cellId]?.formulaUsed || ""
  );
  const selectedCell = useSheetStore((state) => state.selectedCell);
  const setSelectedCell = useSheetStore((state) => state.setSelectedCell);
  const { setCellValue, columns, rows } = useSheetStore();

  const [inputValue, setInputValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (selectedCell !== cellId) {
      setSelectedCell(cellId);
    }
    setIsEditing(false);

    if (inputValue !== value) {
      setCellValue(cellId, inputValue);
    }
  };

  const handleFocus = () => {
    setSelectedCell(cellId);
    setIsEditing(true);
    setInputValue(formula ? formula : value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCellValue(cellId, inputValue);
      setIsEditing(false);

      const nextRow = rowIndex + 1;
      if (nextRow < rows) {
        const nextCellId = `${String.fromCharCode(65 + columnIndex)}${
          nextRow + 1
        }`;
        setSelectedCell(nextCellId);
        requestAnimationFrame(() => {
          document.getElementById(nextCellId)?.focus();
        });
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      setCellValue(cellId, inputValue);
      setIsEditing(false);

      const nextColumn = columnIndex + 1;
      if (nextColumn < columns) {
        const nextCellId = `${String.fromCharCode(65 + nextColumn)}${
          rowIndex + 1
        }`;
        setSelectedCell(nextCellId);
        requestAnimationFrame(() => {
          document.getElementById(nextCellId)?.focus();
        });
      }
    }
  };

  return (
    <StyledCell
      id={cellId}
      ref={inputRef}
      value={isEditing ? inputValue : value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      style={{
        ...styling,
        border: selectedCell === cellId ? "2px solid blue" : "1px solid #ddd",
      }}
    />
  );
};

export default Cell;
