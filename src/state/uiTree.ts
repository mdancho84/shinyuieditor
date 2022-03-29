import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import type { PlaceNodeArguments } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/placeNode";
import { placeNode } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/placeNode";
import type { RemoveNodeArguments } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/removeNode";
import { removeNodeMutating } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/removeNode";
import type { UpdateNodeArguments } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/updateNode";
import { updateNode_mutating } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/updateNode";

import { watchAndReactToGridAreaUpdatesupdate } from "./watchAndReactToGridAreaUpdatesupdate";

const initialState: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [
      ["header", "header"],
      ["sidebar", "plot"],
      ["sidebar", "plot"],
    ],
    rowSizes: ["100px", "1fr", "1fr"],
    colSizes: ["250px", "1fr"],
    gapSize: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::title_panel",
      uiArguments: {
        area: "header",
        title: "My App",
      },
    },
    {
      uiName: "gridlayout::vertical_stack_panel",
      uiArguments: {
        area: "sidebar",
        item_alignment: "center",
      },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider1",
            label: "Slider 1",
            min: 2,
            max: 11,
            value: 7,
          },
        },
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider2",
            label: "Slider 2",
            min: 1,
            max: 10,
            value: 3,
          },
        },
      ],
    },
    {
      uiName: "gridlayout::vertical_stack_panel",
      uiArguments: {
        area: "plot",
        item_alignment: "center",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "myPlot",
          },
        },
      ],
    },
  ],
};

// Series of functions that get access to the UPDATE_NODE action and can perform
// state mutations in response in addition to the plain updating of the node
// (which will occur last)
const updateNodeSubscribers = [watchAndReactToGridAreaUpdatesupdate];

function watchAndReactToGridAreaDeletions(
  tree: ShinyUiNode,
  { path }: RemoveNodeArguments
) {}
const deleteNodeSubscribers = [watchAndReactToGridAreaDeletions];

// Note: Currently we're using Immer already so it's double immering this stuff
// which is not efficient.
export const uiTreeSlice = createSlice({
  name: "uiTree",
  initialState: initialState as ShinyUiNode,
  reducers: {
    UPDATE_NODE: (tree, action: PayloadAction<UpdateNodeArguments>) => {
      [...updateNodeSubscribers, updateNode_mutating].forEach((subscriberFn) =>
        subscriberFn(tree, action.payload)
      );
    },
    PLACE_NODE: (tree, action: PayloadAction<PlaceNodeArguments>) =>
      placeNode(tree, action.payload),
    DELETE_NODE: (tree, action: PayloadAction<RemoveNodeArguments>) => {
      [...deleteNodeSubscribers, removeNodeMutating].forEach((subscriberFn) =>
        subscriberFn(tree, action.payload)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { UPDATE_NODE, PLACE_NODE, DELETE_NODE } = uiTreeSlice.actions;

export default uiTreeSlice.reducer;
