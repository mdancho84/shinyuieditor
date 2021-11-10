import { CSSMeasure } from "GridTypes";
import { matrixDimensions, uniqueMatrixElements } from "../array-helpers";
import { TemplatedGridProps } from "./types";

type GridContainerStyles = Pick<
  React.CSSProperties,
  | "gridTemplateAreas"
  | "gridTemplateColumns"
  | "gridTemplateRows"
  | "gap"
  | "padding"
>;

export default function parseGridTemplateAreas({
  areas,
  rowSizes = "1fr",
  colSizes = "1fr",
  gapSize = "1rem",
}: TemplatedGridProps): {
  numRows: number;
  numCols: number;
  styles: GridContainerStyles;
  uniqueAreas: string[];
} {
  const { numRows, numCols } = matrixDimensions(areas);
  const gridTemplateAreas = areas
    .map((rowDef) => `"${rowDef.join(" ")}"`)
    .join("\n");
  return {
    numRows,
    numCols,
    styles: {
      gridTemplateAreas,
      gridTemplateColumns: buildTractSizes(numCols, colSizes, "column"),
      gridTemplateRows: buildTractSizes(numRows, rowSizes, "row"),
      gap: gapSize,
      padding: gapSize,
    },
    uniqueAreas: uniqueMatrixElements(areas),
  };
}

export function buildTractSizes(
  numTracts: number,
  tractSizes: CSSMeasure[] | CSSMeasure,
  dir: "row" | "column"
): string {
  if (!Array.isArray(tractSizes))
    return [...new Array(numTracts)].fill(tractSizes).join(" ");

  if (numTracts !== tractSizes.length)
    throw new Error(
      `Number of ${dir} sizes does not match the number of ${dir}s in the areas template. 
    Either make sure they match or use a single ${dir} size that will be repeated for all ${dir}s.`
    );

  return tractSizes.join(" ");
}