import React from "react";
import { ToolBarWrapper, ButtonGroup } from "./styles";
import StylingBar from "./Styling";

const ToolBar = () => {
  return (
    <ToolBarWrapper>
      <StylingBar />
      <ButtonGroup>
        {/* move the undoredo funtionality to parent sheet components are no buttons are shown for this anymore. 
        It works using keyboard press.*/}
        {/* <UndoRedo /> */}
        {/* moved the sheetbody components to have better layout.*/}
        {/* <UpdateCells /> */}
      </ButtonGroup>
    </ToolBarWrapper>
  );
};

export default ToolBar;
