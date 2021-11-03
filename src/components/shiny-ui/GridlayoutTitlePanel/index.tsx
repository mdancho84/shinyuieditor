import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";

export interface GridlayoutTitlePanelProps {
  title?: string;
  area?: string;
}

function GridlayoutTitlePanel({
  title = "Default app title",
}: GridlayoutTitlePanelProps) {
  return (
    <TitlePanel
      className={"gridlayout-titlePanel"}
      aria-label={"gridlayout-titlePanel"}
    >
      <h2>{title}</h2>
    </TitlePanel>
  );
}

const TitlePanel = styled.div({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "1rem",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});

export default GridlayoutTitlePanel;