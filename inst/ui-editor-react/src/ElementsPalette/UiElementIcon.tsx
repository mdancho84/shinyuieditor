import * as React from "react";

import { PopoverEl } from "components/PopoverEl/PopoverEl";
import type { ShinyUiNames, ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";

import { useMakeDraggable } from "../DragAndDropHelpers/useMakeDraggable";

import classes from "./styles.module.css";

export function UiElementIcon({ uiName }: { uiName: ShinyUiNames }) {
  const {
    iconSrc,
    title,
    defaultSettings,
    description: infoPopup = title,
  } = shinyUiNodeInfo[uiName];
  const node = {
    uiName,
    uiArguments: defaultSettings,
  } as ShinyUiNode;

  const elRef = React.useRef<HTMLDivElement>(null);
  useMakeDraggable({ ref: elRef, nodeInfo: { node } });

  if (iconSrc === undefined) {
    return null;
  }

  return (
    <PopoverEl
      popoverContent={infoPopup}
      contentIsMd={true}
      openDelayMs={500}
      triggerEl={
        <div className={classes.OptionContainer}>
          <div ref={elRef} className={classes.OptionItem} data-ui-name={uiName}>
            <img src={iconSrc} alt={title} className={classes.OptionIcon} />
            <label className={classes.OptionLabel}>{title}</label>
          </div>
        </div>
      }
    ></PopoverEl>
  );
}