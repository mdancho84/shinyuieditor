import * as React from "react";

import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyActionButtonProps } from ".";

export const ShinyActionButtonSettings: SettingsUpdaterComponent<
  ShinyActionButtonProps
> = ({ settings, onChange }) => {
  const { inputId, label } = settings;

  return (
    <>
      <TextInput
        label="inputId"
        name="inputId"
        value={inputId ?? "defaultActionButton"}
        onChange={onChange}
      />
      <TextInput
        label="input label"
        name="label"
        value={label ?? "default actionButton label"}
        onChange={onChange}
      />
    </>
  );
};
