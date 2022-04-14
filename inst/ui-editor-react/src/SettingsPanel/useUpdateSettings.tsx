import * as React from "react";

import type { OnChangeCallback } from "components/Inputs/SettingsUpdateContext";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { getUiNodeValidation } from "components/UiNode/getUiNodeValidation";
import { getNode } from "components/UiNode/TreeManipulation/getNode";
import { useNodeSelectionState } from "NodeSelectionState";
import { useDispatch } from "react-redux";
import { DELETE_NODE, UPDATE_NODE } from "state/uiTree";

export function useUpdateSettings({ tree }: { tree: ShinyUiNode }) {
  const dispatch = useDispatch();

  const [selectedPath, setNodeSelection] = useNodeSelectionState();

  const [currentNode, setCurrentNode] = React.useState<ShinyUiNode | null>(
    selectedPath !== null ? getNode(tree, selectedPath) : null
  );
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedPath === null) {
      setCurrentNode(null);
      return;
    }
    const selectedNode = getNode(tree, selectedPath);

    // Sometimes the selection will fail because the selected node was just
    // moved. In this case back up until we get to an available parent
    if (selectedNode === undefined) {
      return;
    }

    setCurrentNode(getNode(tree, selectedPath));
  }, [tree, selectedPath]);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!currentNode || !selectedPath) return;

      const result = await getUiNodeValidation({ node: currentNode });

      if (result.type === "error") {
        setErrorMsg(result.error_msg);
        return;
      }

      if (result.type === "server-error") {
        // Otherwise we have a server error and need to make sure the user knows this
        // before continuing
        console.error(`HTTP error! status: ${result.status}`);

        const userAcknowledgedLackOfServer = window.confirm(
          "Could not check with backend for settings validation. You're on your own."
        );
        if (!userAcknowledgedLackOfServer) {
          setErrorMsg(
            "Failed to validate settings for component. Try again or check to make sure your R session didn't crash."
          );
        }
      }

      // Sync the state that's been updated from the form to the main tree
      dispatch(
        UPDATE_NODE({
          path: selectedPath,
          node: {
            ...currentNode,
            // Add resulting html from setting validation (if present)
            uiHTML: "uiHTML" in result ? result.uiHTML : undefined,
          },
        })
      );
    },
    [currentNode, dispatch, selectedPath]
  );

  const updateArguments = (newArguments: typeof tree.uiArguments) => {
    setCurrentNode({
      ...currentNode,
      uiArguments: newArguments,
    } as typeof currentNode);
  };

  const updateArgumentsByName: OnChangeCallback = ({ name, value }) => {
    console.log("Updating arguments by name!", { name, value });
    setCurrentNode(
      (node) =>
        ({
          ...node,
          uiArguments: { ...node?.uiArguments, [name]: value },
        } as typeof currentNode)
    );
  };

  const deleteNode = React.useCallback(() => {
    if (selectedPath === null) return;

    dispatch(DELETE_NODE({ path: selectedPath }));
  }, [dispatch, selectedPath]);

  return {
    currentNode,
    errorMsg,
    handleSubmit,
    deleteNode,
    updateArguments,
    updateArgumentsByName,
    selectedPath,
    setNodeSelection,
  };
}
