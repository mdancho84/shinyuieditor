import { RadioInputs } from "components/Inputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";
import { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import { CgAlignBottom, CgAlignMiddle, CgAlignTop } from "react-icons/cg";
import type { AlignmentOptions } from ".";
import { VerticalStackPanelSettings } from ".";

const alignmentIcons: Record<AlignmentOptions, JSX.Element> = {
  top: <CgAlignTop size="25px" />,
  bottom: <CgAlignBottom size="25px" />,
  center: <AiOutlineVerticalAlignMiddle size="25px" />,
  spread: <CgAlignMiddle size="25px" />,
};

export const GridlayoutVerticalStackPanelSettings: SettingsUpdaterComponent<
  VerticalStackPanelSettings
> = ({ settings, onChange }) => {
  return (
    <>
      <TextInput
        name="Grid-Area"
        label="Name of grid area"
        value={settings.area ?? "empty grid area"}
        onChange={(area) => onChange({ ...settings, area })}
      />
      <RadioInputs
        name="Item Alignment"
        options={["top", "center", "spread", "bottom"]}
        optionIcons={alignmentIcons}
        currentSelection={settings.item_alignment ?? "top"}
        onChange={(item_alignment) => onChange({ ...settings, item_alignment })}
        optionsPerColumn={4}
      />
    </>
  );
};
