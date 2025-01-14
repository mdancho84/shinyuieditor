import textIcon from "assets/icons/shinyText.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridCardText from "./GridlayoutCardText";
import { GridlayoutGridCardTextSettings } from "./SettingsPanel";

export interface GridlayoutGridCardTextProps {
  content: string;
  alignment: "center" | "start" | "end";
  area: string;
  is_title?: boolean;
}

export const gridlayoutTextPanelInfo: UiComponentInfo<GridlayoutGridCardTextProps> =
  {
    title: "Grid Text Card",
    UiComponent: GridlayoutGridCardText,
    SettingsComponent: GridlayoutGridCardTextSettings,
    acceptsChildren: false,
    defaultSettings: {
      area: "text_panel",
      content: "Text from Chooser",
      alignment: "start",
    },
    iconSrc: textIcon,
    category: "gridlayout",
    description:
      "A grid card that contains just text that is vertically centered within the panel. Useful for app titles or displaying text-based statistics.",
  };

export default GridlayoutGridCardText;
