import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";

type SliderSettings = {
  min: number;
  val: number;
  max: number;
};

export type ShinySliderInputProps = Partial<
  {
    name: string;
    width: string;
    height: string;
  } & SliderSettings
>;

export default function ShinySliderInput({
  name = "shiny-sliderInput",
  width = "200px",
  height = "200px",
  min,
  max,
  val,
}: ShinySliderInputProps) {
  const settings = buildSliderSettings({ min, max, val });
  const [currentVal, setCurrentVal] = React.useState(settings.val);
  return (
    <SliderHolder
      style={{ height, width }}
      className={"shiny-sliderInput"}
      aria-label={"shiny-sliderInput"}
    >
      <div style={{ gridArea: "1/1", placeSelf: "center" }}>
        <span>
          Min: {settings.min}, Max: {settings.max}
        </span>
        <input
          type="range"
          min={settings.min}
          max={settings.max}
          value={currentVal}
          onChange={(e) => setCurrentVal(Number(e.target.value))}
          className="slider"
          aria-label={"slider input"}
        />
        <span>Current: {currentVal}</span>
      </div>
    </SliderHolder>
  );
}

export function buildSliderSettings({
  min,
  max,
  val,
}: Partial<SliderSettings>) {
  const allPresent = min && max && val;
  const nonePresent = !min && !max && !val;

  if (nonePresent)
    return {
      min: 0,
      val: 50,
      max: 100,
    };

  if (!allPresent)
    throw new Error(
      "A minimum, maximum, and starting value are needed for slider."
    );

  if (min > max) {
    throw new Error("Need to define a minimum value that is below the max");
  }

  if (val > max) {
    throw new Error(
      "Cant set starting value of slider above the maximum allowed value"
    );
  }

  if (val < min) {
    throw new Error(
      "Cant set starting value of slider below the minimum allowed value"
    );
  }

  return { min, max, val };
}

const SliderHolder = styled.div({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  padding: "1rem",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});
