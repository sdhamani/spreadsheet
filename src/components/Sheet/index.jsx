import React, { useEffect } from "react";
import SheetBody from "../SheetBody";
import ToolBar from "../ToolBar";
import { useSheetStore } from "../../store/useSheetStore";
import { SheetWrapper, SheetHeader, Title, ContentWrapper } from "./styles";

const Sheet = ({ noOfColumns, noOfRows }) => {
  const {
    cells,
    setCellValue,
    undo,
    redo,
    loadFromIndexedDB,
    setRows,
    setColumns,
  } = useSheetStore();

  useEffect(() => {
    loadFromIndexedDB();
  }, [loadFromIndexedDB]);

  useEffect(() => {
    setColumns(noOfColumns);
    setRows(noOfRows);
  }, [noOfColumns, noOfRows, setColumns, setRows]);

  useEffect(() => {
    const hanldeKeyPress = (event) => {
      const isIOS = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isUndo =
        (isIOS ? event.metaKey : event.ctrlKey) &&
        event.code === "KeyZ" &&
        !event.shiftKey;
      const isRedo =
        (isIOS ? event.metaKey : event.ctrlKey) &&
        event.shiftKey &&
        event.code === "KeyZ";

      if (isUndo) {
        event.preventDefault();
        undo();
      }
      if (isRedo) {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", hanldeKeyPress);
    return () => {
      window.removeEventListener("keydown", hanldeKeyPress);
    };
  }, [undo, redo]);

  return (
    <SheetWrapper>
      <SheetHeader>
        <Title>Sheet 1</Title>
        <ToolBar />
      </SheetHeader>
      <ContentWrapper>
        <SheetBody cells={cells} setCellValue={setCellValue} />
      </ContentWrapper>
    </SheetWrapper>
  );
};

export default Sheet;
