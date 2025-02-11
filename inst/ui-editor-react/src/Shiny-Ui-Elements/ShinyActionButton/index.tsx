import buttonIcon from "assets/icons/shinyButton.png";
import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyActionButtonSettings } from "./SettingsPanel";
import ShinyActionButton from "./ShinyActionButton";

export type ShinyActionButtonProps = {
  inputId: string;
  label: string;
  width?: CSSMeasure;
};

export const shinyActionButtonInfo: UiComponentInfo<ShinyActionButtonProps> = {
  title: "Action Button",
  UiComponent: ShinyActionButton,
  SettingsComponent: ShinyActionButtonSettings,
  acceptsChildren: false,
  defaultSettings: { inputId: "myButton", label: "My Button" },
  iconSrc: buttonIcon,
  category: "Inputs",
  description:
    "Creates an action button whose value is initially zero, and increments by one each time it is pressed.",
};

export default ShinyActionButton;
