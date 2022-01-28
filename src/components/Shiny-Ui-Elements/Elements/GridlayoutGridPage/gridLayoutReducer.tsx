import { TractDirection } from "components/Shiny-Ui-Elements/Layouts/GridApp/helpers";
import { CSSMeasure } from "GridTypes";
import clone from "just-clone";
import addItem from "utils/gridTemplates/addItem";
import addTract from "utils/gridTemplates/addTract";
import removeItem from "utils/gridTemplates/removeItem";
import removeTract from "utils/gridTemplates/removeTract";
import resizeTract from "utils/gridTemplates/resizeTract";
import { GridItemExtent, TemplatedGridProps } from "utils/gridTemplates/types";

export type GridLayoutAction =
  | { type: "ADD_ITEM"; name: string; pos: GridItemExtent }
  | { type: "REMOVE_ITEM"; name: string }
  | { type: "MOVE_ITEM"; name: string; pos: GridItemExtent }
  | {
      type: "ADD_TRACT";
      dir: TractDirection;
      afterIndex: number;
      size: CSSMeasure;
    }
  | {
      type: "REMOVE_TRACT";
      dir: TractDirection;
      index: number;
    }
  | {
      type: "RESIZE_TRACT";
      dir: TractDirection;
      index: number;
      size: CSSMeasure;
    }
  | {
      type: "SET_GAP";
      size: CSSMeasure;
    };
export function gridLayoutReducer(
  layout: TemplatedGridProps,
  action: GridLayoutAction
): TemplatedGridProps {
  switch (action.type) {
    case "ADD_ITEM":
    // eslint-disable-next-line no-fallthrough
    case "MOVE_ITEM":
      return addItem(layout, { name: action.name, ...action.pos });

    case "REMOVE_ITEM":
      return removeItem(layout, action.name);

    case "ADD_TRACT":
      return addTract(layout, action);

    case "REMOVE_TRACT":
      return removeTract(layout, action);

    case "RESIZE_TRACT":
      return resizeTract(
        layout,
        { dir: action.dir, index: action.index },
        action.size
      );

    case "SET_GAP":
      return { ...clone(layout), gapSize: action.size };

    default:
      console.error(action);
      throw new Error("Have yet to implement layout action type");
  }
}