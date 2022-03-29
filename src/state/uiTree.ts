import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import type { PlaceNodeArguments } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/placeNode";
import { placeNode } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/placeNode";
import type { RemoveNodeArguments } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/removeNode";
import { removeNodeMutating } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/removeNode";
import type { UpdateNodeArguments } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/updateNode";
import { updateNode_mutating } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/updateNode";

// Collect all the update subscribers from the implemented ui nodes.
// These are a series of functions that get access to the various reducer actions and can
// perform state mutations in response in addition to the plain updating of the
// node (which will occur last)

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

// Note: Currently we're using Immer already so it's double immering this stuff
// which is not efficient.
export const uiTreeSlice = createSlice({
  name: "uiTree",
  initialState: initialState as ShinyUiNode,
  reducers: {
    UPDATE_NODE: (tree, action: PayloadAction<UpdateNodeArguments>) => {
      for (let info of Object.values(shinyUiNodeInfo)) {
        const nodeUpdateSubscriber = info?.stateUpdateSubscribers?.UPDATE_NODE;
        if (nodeUpdateSubscriber) {
          nodeUpdateSubscriber(tree, action.payload);
        }
      }

      updateNode_mutating(tree, action.payload);
    },
    PLACE_NODE: (tree, action: PayloadAction<PlaceNodeArguments>) =>
      placeNode(tree, action.payload),
    DELETE_NODE: (tree, action: PayloadAction<RemoveNodeArguments>) => {
      for (let info of Object.values(shinyUiNodeInfo)) {
        const nodeUpdateSubscriber = info?.stateUpdateSubscribers?.DELETE_NODE;
        if (nodeUpdateSubscriber) {
          nodeUpdateSubscriber(tree, action.payload);
        }
      }

      removeNodeMutating(tree, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { UPDATE_NODE, PLACE_NODE, DELETE_NODE } = uiTreeSlice.actions;

export type UpdateAction = (
  tree: ShinyUiNode,
  payload: UpdateNodeArguments
) => void;
export type DeleteAction = (
  tree: ShinyUiNode,
  payload: RemoveNodeArguments
) => void;

export default uiTreeSlice.reducer;
