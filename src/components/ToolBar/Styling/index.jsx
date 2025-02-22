import React from "react";
import { StylingButton, StylingButtonsWrapper } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSheetStore } from "../../../store/useSheetStore";

const StylingBar = () => {
  const { setCellStyle, selectedCell, cells } = useSheetStore();

  const selectedCellStyles = selectedCell
    ? cells[selectedCell]?.styling || {}
    : {};

  const isActiveStyle = (key, value) => selectedCellStyles[key] === value;

  const toggleStyle = (key, value) => {
    if (isActiveStyle(key, value)) {
      setCellStyle(key, "");
    } else {
      setCellStyle(key, value);
    }
  };

  return (
    <StylingButtonsWrapper>
      <StylingButton
        onClick={() => toggleStyle("fontWeight", "bold")}
        isActive={isActiveStyle("fontWeight", "bold")}
      >
        <FontAwesomeIcon icon={faBold} />
      </StylingButton>
      <StylingButton
        onClick={() => toggleStyle("fontStyle", "italic")}
        isActive={isActiveStyle("fontStyle", "italic")}
      >
        <FontAwesomeIcon icon={faItalic} />
      </StylingButton>
      <StylingButton
        onClick={() => toggleStyle("textDecoration", "underline")}
        isActive={isActiveStyle("textDecoration", "underline")}
      >
        <FontAwesomeIcon icon={faUnderline} />
      </StylingButton>
      <StylingButton
        onClick={() => toggleStyle("textAlign", "left")}
        isActive={isActiveStyle("textAlign", "left")}
      >
        <FontAwesomeIcon icon={faAlignLeft} />
      </StylingButton>
      <StylingButton
        onClick={() => toggleStyle("textAlign", "center")}
        isActive={isActiveStyle("textAlign", "center")}
      >
        <FontAwesomeIcon icon={faAlignCenter} />
      </StylingButton>
      <StylingButton
        onClick={() => toggleStyle("textAlign", "right")}
        isActive={isActiveStyle("textAlign", "right")}
      >
        <FontAwesomeIcon icon={faAlignRight} />
      </StylingButton>
    </StylingButtonsWrapper>
  );
};

export default StylingBar;
