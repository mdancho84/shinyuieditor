import React from "react";
import { NodePath, UiNodeProps } from "../uiNodeTypes";

export type NodeUpdaters = {
  updateNode: (path: NodePath, newNode: UiNodeProps) => void;
  addNode: (path: NodePath, newNode: UiNodeProps) => void;
  deleteNode: (path: NodePath) => void;
  selectNode: (path: NodePath) => void;
};

const NodeUpdateContext = React.createContext<NodeUpdaters>({
  updateNode: (path: NodePath, newNode: UiNodeProps) =>
    console.log(`Updating placeholder`),
  addNode: (path: NodePath, newNode: UiNodeProps) =>
    console.log(`Adding placeholder`),
  deleteNode: (path: NodePath) => console.log(`Deleting placeholder`),
  selectNode: (path: NodePath) =>
    console.log(`Selected node placeholder`, path),
});

export default NodeUpdateContext;
