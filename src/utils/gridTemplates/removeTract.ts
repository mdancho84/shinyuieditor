import { TractDirection } from "state-logic/gridLayout/atoms";
import { joinPretty, removeAtIndex } from "utils/array-helpers";
import { removeRowOrCol } from "utils/matrix-helpers";
import { areasToItemLocations } from "./itemLocations";
import { itemBoundsInDir } from "./itemLocationToBounds";
import { TemplatedGridProps } from "./types";

export default function removeTract(
  template: TemplatedGridProps,
  tract: { index: number; dir: TractDirection }
): TemplatedGridProps {
  const dir = tract.dir;
  // Convert to the 0-indexed matrix dimensions
  const indexOfTract = tract.index - 1;

  // Make sure no items are entirely contained within the removed tract
  const items = areasToItemLocations(template.areas);

  const itemsInTract = itemsContainedInTract(items, tract);
  if (itemsInTract.length !== 0) {
    throw new Error(
      `Can't remove ${dir} ${indexOfTract} as items ${joinPretty(itemsInTract)}`
    );
  }

  const updates: Partial<TemplatedGridProps> = {
    areas: removeRowOrCol(template.areas, { index: indexOfTract, dir }),
  };

  // If the sizes are a single repeated size than we just leave it, otherwise
  // we need to take out the corresponding size for this tract
  const sizeForDirProp = dir === "rows" ? "rowSizes" : "colSizes";
  if (isRepeatedSize(template[sizeForDirProp])) {
    updates[sizeForDirProp] = removeAtIndex(
      template[sizeForDirProp],
      indexOfTract
    );
  }

  return {
    ...template,
    ...updates,
  };
}

/**
 * Checks if row or column size definition is meant to just be repeated
 *
 * A "repeated" size is single length or non present.
 * E.g. colSizes = "1fr", ["1fr"], undefined
 */
function isRepeatedSize(
  tractSizes: TemplatedGridProps["colSizes"] | TemplatedGridProps["rowSizes"]
): boolean {
  return Array.isArray(tractSizes) && tractSizes.length > 1;
}

/**
 * Checks a given tract entirely contains a given item
 *
 * This means that if the tract is removed those items will be removed as well
 */
function itemsContainedInTract(
  items: ReturnType<typeof areasToItemLocations>,
  { index, dir }: { index: number; dir: TractDirection }
): string[] {
  let inTract: string[] = [];
  items.forEach((item, itemName) => {
    const { itemStart, itemEnd } = itemBoundsInDir(item, dir);

    if (itemStart === index && itemStart === itemEnd) {
      inTract.push(itemName);
    }
  });
  return inTract;
}
