import { useRef } from "preact/hooks";
import { useSetRecoilState } from "recoil";
import { AddItemModal, useAddItemModal } from "../../components/AddItemModal";
import { EditableGridItems } from "../../components/EditableGridItems";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorSettings } from "../../components/EditorSettings";
import { DragFeedback, useDragHandler } from "../../state-logic/drag-logic";
import { useAddNewItem } from "../../state-logic/gridItems";
import {
  gapState,
  gridTractsState,
} from "../../state-logic/layout-updating-logic";
import type { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";
import { GapSizeSetting } from "../../components/GapSizeSetting";

export default function LayoutEditor({
  startingLayout,
}: {
  startingLayout: GridLayoutTemplate;
}) {
  const setGapSize = useSetRecoilState(gapState);
  setGapSize(startingLayout.gap);
  const addNewItem = useAddNewItem();
  startingLayout.items.forEach((itemDef) => addNewItem(itemDef));

  const setTracts = useSetRecoilState(gridTractsState);
  setTracts(startingLayout);

  // We need a reference to the main parent element of everything so we can
  // attach event handlers for drag detection to it.
  const editorRef = useRef<HTMLDivElement>(null);

  // Setup hooks that control app state

  // Setup the neccesary state for controlling the add-item modal
  const {
    addItemState,
    openAddItemModal,
    closeAddItemModal,
  } = useAddItemModal();

  // Initiate the drag watching behavior
  const { dragState, startDrag } = useDragHandler({
    watchingRef: editorRef,
    onNewItem: openAddItemModal,
  });

  return (
    <div className={classes.editor} ref={editorRef}>
      <EditorSettings>
        <GapSizeSetting />
      </EditorSettings>
      {EditorInstructions}
      <EditorItemsListView />
      <EditorGridContainer onDrag={startDrag}>
        <EditableGridItems onDrag={startDrag} />
        <DragFeedback dragState={dragState} />
      </EditorGridContainer>
      {addItemState ? (
        <AddItemModal state={addItemState} closeModal={closeAddItemModal} />
      ) : null}
    </div>
  );
}
