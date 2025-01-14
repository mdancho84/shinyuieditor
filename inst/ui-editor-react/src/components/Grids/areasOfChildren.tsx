import type { ShinyUiChildren } from "Shiny-Ui-Elements/uiNodeTypes";

/** Get the grid areas present in the children nodes passed to the Grid_Page()
 * component. This assumes that they are stored in the "area" property on the
 * uiArguments */

export function areasOfChildren(children: ShinyUiChildren) {
  let all_children_areas: string[] = [];
  children.forEach((child) => {
    if ("area" in child.uiArguments && child.uiArguments.area !== undefined) {
      const area = child.uiArguments.area;
      all_children_areas.push(area);
    }
  });

  return all_children_areas;
}
