import { IconButton } from "@chakra-ui/button";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type {
  ShinyUiNames,
  ShinyUiArgumentsByName,
  UiArgumentsCompByName,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import {
  FiSettings as SettingsIcon,
  FiTrash as TrashIcon,
} from "react-icons/fi";
import { makeBoxShadow } from "utils/css-helpers";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";
import { SettingsInputsForUi } from "../UiSettings/SettingsInputsForUi";

function UiComponent<UiName extends ShinyUiNames>({
  uiName,
  settings,
}: {
  uiName: UiName;
  settings: ShinyUiArgumentsByName[UiName];
}) {
  const Comp = uiComponentAndSettings[uiName].UiComponent;
  return <Comp {...settings} />;
}

function UiSettingsComponent<UiName extends ShinyUiNames>({
  uiName,
  settings,
  onChange,
}: UiArgumentsCompByName<UiName>) {
  const [currentSettings, setCurrentSettings] = React.useState(settings);
  const [settingsAreValid, setSettingsAreValid] = React.useState(true);

  return (
    <div css={{ padding: "1rem" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChange(currentSettings, true);
        }}
      >
        <SettingsInputsForUi
          uiName={uiName}
          settings={currentSettings}
          onChange={(settings, isValid) => {
            setCurrentSettings(settings);
            setSettingsAreValid(isValid);
          }}
        />
        <Button
          variant="main"
          leftIcon={<BiCheck />}
          marginTop="0.75rem"
          type="submit"
          disabled={!settingsAreValid}
        >
          Update
        </Button>
      </form>
    </div>
  );
}

function UiPanel<ElName extends ShinyUiNames>({
  area,
  componentDefinition,
  onUpdate,
  onDelete,
}: {
  area: string;
  componentDefinition: {
    uiName: ElName;
    uiArguments: ShinyUiArgumentsByName[ElName];
  };
  onUpdate?: (newProps: ShinyUiArgumentsByName[ElName]) => void;
  onDelete?: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const openPopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  const { uiName: name, uiArguments: settings } = componentDefinition;

  return (
    <UiPanelHolder
      aria-label={`${area} panel`}
      className="ui-panel-holder"
      area={area}
    >
      <IconButton
        aria-label="Delete panel"
        size="sm"
        variant="ghost"
        icon={<TrashIcon />}
        style={{ left: 0 }}
        css={actionButtonStyles}
        onClick={onDelete}
      />
      <Popover
        isOpen={isOpen}
        onClose={closePopover}
        onOpen={openPopover}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Open settings dialog"
            icon={<SettingsIcon />}
            style={{ right: 0 }}
            css={actionButtonStyles}
          />
        </PopoverTrigger>
        <PopoverContent aria-label={`Settings for ${name}`}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <code>{name}</code> settings
          </PopoverHeader>
          <PopoverBody>
            <UiSettingsComponent
              uiName={name}
              settings={settings}
              onChange={(newSettings) => {
                onUpdate?.(newSettings);
                closePopover();
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <UiComponent uiName={name} settings={settings} />
    </UiPanelHolder>
  );
}

export const UiPanelHolder = styled.div(({ area }: { area?: string }) => ({
  display: "grid",
  gridArea: area,
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  width: "100%",
  height: "100%",
  placeItems: "center",
  position: "relative",
  backgroundColor: "var(--rstudio-white, forestgreen)",
  boxShadow: makeBoxShadow({ height: 0.2 }),
}));

const actionButtonStyles = css({
  position: "absolute",
  top: 0,
  opacity: 0.5,
});

export default UiPanel;