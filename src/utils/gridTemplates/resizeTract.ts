import { CSSMeasure } from "GridTypes";
import { TractDirection } from "components/Shiny-Ui-Elements/Elements/GridlayoutGridPage/helpers";
import { fillArr } from "utils/array-helpers";
import { matrixDimensions } from "utils/matrix-helpers";
import { TemplatedGridProps } from "./types";
import produce from "immer";

export default function resizeTract(
  templateOriginal: TemplatedGridProps,
  { index, dir }: { index: number; dir: TractDirection },
  size: CSSMeasure
): TemplatedGridProps {
  return produce(templateOriginal, (template) => {
    const tractProp = dir === "rows" ? "rowSizes" : "colSizes";

    // If the sizes is a repeated or default value we need to make it an array
    if (!Array.isArray(template[tractProp])) {
      // Completely empty means we give a default value of 1fr
      const filledSize =
        typeof template[tractProp] === "undefined"
          ? "1fr"
          : template[tractProp];
      const gridDims = matrixDimensions(template.areas);

      template[tractProp] = fillArr(
        filledSize,
        dir === "rows" ? gridDims.numRows : gridDims.numCols
      );
    }

    template[tractProp][index - 1] = size;
  });
}
