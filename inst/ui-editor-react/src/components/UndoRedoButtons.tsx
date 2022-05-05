import React from "react";

import Icon from "components/Icon";
import { useUndoRedo } from "state-logic/useUndoRedo";

import Button from "./Inputs/Button";
import classes from "./UndoRedoButtons.module.css";

export function UndoRedoButtons() {
  const { goBackward, goForward, canGoBackward, canGoForward } = useUndoRedo();

  return (
    <div className={classes.container + " undo-redo-buttons"}>
      <Button
        variant="icon"
        disabled={!canGoBackward}
        aria-label="Undo last change"
        title="Undo last change"
        onClick={goBackward}
      >
        <Icon id="undo" />
        {/* <MdUndo /> */}
      </Button>
      <Button
        variant="icon"
        disabled={!canGoForward}
        aria-label="Redo last change"
        title="Redo last change"
        onClick={goForward}
      >
        <Icon id="redo" />
      </Button>
    </div>
  );
}
