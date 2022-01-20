import React from "react";
import {
  FiSettings as SettingsIcon,
  FiTrash as TrashIcon,
} from "react-icons/fi";
import { ShinyUiNameAndArguments } from "../Elements/componentTypes";
import { UiComponent } from "../UiElement/UiComponent";
import { NodeUpdateContext } from "../UiTree";
import classes from "./styles.module.css";

type UiContainerNode = {
  // Any children of this node
  uiChildren: UiNodeProps[];

  // Settings for the container div
  containerSettings?: ContainerSettings;
};

type ContainerSettings = {
  horizontalAlign: "left" | "center" | "right";
  verticalAlign: "top" | "center" | "bottom";
};

type UiLeafNode = {
  // Name and properties of the UI function used for this node
  uiInfo?: ShinyUiNameAndArguments;
};

// Path to a given node. Starts at [0] for the root. The first child for
// instance would be then [0,1]
export type NodePath = number[];

type NodeLocation = {
  // Unique ID of this node (for use locating within tree)
  path?: NodePath;
};

export type UiNodeProps = UiContainerNode | UiLeafNode;

export function isContainerNode(node: UiNodeProps): node is UiContainerNode {
  return (node as UiContainerNode).uiChildren !== undefined;
}

export function UiNode({ path = [], ...props }: NodeLocation & UiNodeProps) {
  const pathString = path.join("-");

  const nodeUpdaters = React.useContext(NodeUpdateContext);

  let body: JSX.Element;

  if ("uiChildren" in props) {
    body = (
      <>
        {props.uiChildren
          ? props.uiChildren.map((childNode, i) => (
              <UiNode key={pathString + i} path={[...path, i]} {...childNode} />
            ))
          : null}
      </>
    );
  } else if ("uiInfo" in props && props.uiInfo) {
    const { uiInfo } = props;
    body = <UiComponent {...uiInfo} />;
  } else {
    body = <span> Un-defined leaf node</span>;
  }

  return (
    <div
      id={pathString}
      className={classes.container}
      style={makeContainerStyles(
        "uiChildren" in props ? props.containerSettings : null
      )}
    >
      <span
        className={classes.editButton}
        onClick={() => {
          nodeUpdaters.updateNode(path, {});
        }}
      >
        <SettingsIcon />
      </span>
      <span
        className={classes.deleteButton}
        onClick={() => {
          nodeUpdaters.deleteNode(path);
        }}
      >
        <TrashIcon />
      </span>
      {body}
    </div>
  );
}

const dirToFlexProp = {
  center: "center",
  left: "start",
  top: "start",
  right: "end",
  bottom: "end",
};

function makeContainerStyles(
  containerSettings: ContainerSettings | null | undefined
) {
  return (
    containerSettings
      ? {
          "--verticalAlign": dirToFlexProp[containerSettings.verticalAlign],
          "--horizontalAlign": dirToFlexProp[containerSettings.horizontalAlign],
        }
      : {}
  ) as React.CSSProperties;
}

export default UiNode;