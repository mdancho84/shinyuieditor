import * as React from "react";

import { UiNodeComponent } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import { GoGraph } from "react-icons/go";

import { ShinyPlotOutputProps } from "./index";

import classes from "./styles.module.css";

const ShinyPlotOutput: UiNodeComponent<ShinyPlotOutputProps> = ({
  uiArguments,
  children,
  eventHandlers,
}) => {
  const {
    outputId = "shiny-plot-output",
    width = "300px",
    height = "200px",
  } = uiArguments;
  const holderRef = React.useRef<HTMLDivElement>(null);

  // Start tiny so icon isn't the reason the container is big
  const [graphSize, setGraphSize] = React.useState(2);
  React.useEffect(() => {
    // Use conditionals here because in tests we dont have access to the
    // ResizeObserver variable
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      if (!holderRef.current) return;

      const { offsetHeight, offsetWidth } = holderRef.current;
      setGraphSize(Math.min(offsetHeight, offsetWidth) * 0.9);
    });

    if (holderRef.current) ro.observe(holderRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className={classes.container}
      ref={holderRef}
      style={{ height, width }}
      aria-label="shiny::plotOutput placeholder"
      {...eventHandlers}
    >
      <GoGraph
        // Account for padding of 1 rem
        size={`calc(${graphSize}px - 2rem)`}
        style={{
          gridArea: "1/1",
          placeSelf: "center",
        }}
      />

      <div style={{ gridArea: "1/1", placeSelf: "end" }}>
        This is a plot with the name {outputId}!
      </div>
      {children}
    </div>
  );
};
export default ShinyPlotOutput;
