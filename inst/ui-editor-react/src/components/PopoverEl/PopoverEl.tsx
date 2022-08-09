import React from "react";

import type { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";

import classes from "./styles.module.css";

export type PopoverProps = {
  placement?: Placement;
  popoverContent: string | JSX.Element;
  showOn?: "hover" | "click";
  bgColor?: string;
  openDelayMs?: number;
  triggerEl: React.ReactElement;
};

/**
 * Add a popover to a provided trigger element
 */
export const PopoverEl = ({
  placement = "right",
  showOn = "hover",
  popoverContent,
  bgColor,
  openDelayMs = 0,
  triggerEl,
}: PopoverProps) => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement | null>(null);

  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);

  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(
    null
  );

  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      modifiers: [
        { name: "arrow", options: { element: arrowElement } },
        { name: "offset", options: { offset: [0, 5] } },
      ],
      strategy: "fixed",
    }
  );

  // Add extra background color variable if it's requested
  const popperStyles = React.useMemo(() => {
    return { ...styles.popper, backgroundColor: bgColor };
  }, [bgColor, styles.popper]);

  const eventListeners = React.useMemo(() => {
    let delayedShowTimeout: NodeJS.Timeout;
    function showPopper() {
      delayedShowTimeout = setTimeout(() => {
        update?.();
        popperElement?.setAttribute("data-show", "");
      }, openDelayMs);
    }
    function hidePopper() {
      // Make sure we cancel a timeout in case it has yet to display
      clearTimeout(delayedShowTimeout);
      popperElement?.removeAttribute("data-show");
    }

    const showTrigger = showOn === "hover" ? "onMouseEnter" : "onClick";

    return {
      [showTrigger]: () => showPopper(),
      onMouseLeave: () => hidePopper(),
    };
  }, [openDelayMs, popperElement, showOn, update]);

  const textContent = typeof popoverContent === "string";

  return (
    <>
      {React.cloneElement(triggerEl, {
        ...eventListeners,
        ref: setReferenceElement,
      })}
      <div
        ref={setPopperElement}
        className={classes.popover}
        style={popperStyles}
        {...attributes.popper}
      >
        {textContent ? (
          <div className={classes.textContent}>{popoverContent}</div>
        ) : (
          popoverContent
        )}
        <div
          ref={setArrowElement}
          className={classes.popperArrow}
          style={styles.arrow}
        />
      </div>
    </>
  );
};
