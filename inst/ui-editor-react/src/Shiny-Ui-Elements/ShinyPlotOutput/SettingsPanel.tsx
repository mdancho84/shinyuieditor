import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { CSSMeasure } from "CSSMeasure";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyPlotOutputProps } from ".";

export const ShinyPlotOutputSettings: SettingsUpdaterComponent<
  ShinyPlotOutputProps
> = ({ settings }) => {
  return (
    <>
      <TextInput label="Output ID" name="outputId" allValues={settings} />
      <LabeledCSSUnitInput
        name="width"
        units={["px", "%"]}
        value={settings.width as CSSMeasure}
      />
      <LabeledCSSUnitInput
        name="height"
        units={["px", "%"]}
        value={settings.height as CSSMeasure}
      />
    </>
  );
};
