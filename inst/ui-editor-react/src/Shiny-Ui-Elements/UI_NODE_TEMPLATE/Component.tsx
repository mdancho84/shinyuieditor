import { pathToString } from "Shiny-Ui-Elements/nodePathUtils";
import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { NodeNameSettings } from "./index";

import "./styles.scss";

const PkgNodeName: UiNodeComponent<NodeNameSettings> = ({
  uiArguments,
  uiChildren,
  path,
  wrapperProps,
}) => {
  return (
    <div className="pkgNodeName" {...wrapperProps}>
      <p>NODE NAME: {uiArguments.name}</p>
      <p>Path: {pathToString(path)}</p>
      <p>There are {uiChildren?.length ?? 0} children</p>
    </div>
  );
};

export default PkgNodeName;
