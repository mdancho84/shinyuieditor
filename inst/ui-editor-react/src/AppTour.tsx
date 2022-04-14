import * as React from "react";

import Button from "components/Inputs/Button";
import { FaMapMarked } from "react-icons/fa";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import type { Step, Styles, CallBackProps } from "react-joyride";

export const joyrideSteps: Step[] = [
  {
    target: ".elements-panel",
    content:
      "Drag elements from here into the app pane on the right to add them to your app",
    placementBeacon: "right",
    placement: "right-start",
    disableBeacon: true,
  },
  {
    target: ".properties-panel",
    content:
      "After selecting an element in your app, the settings for that element will appear here",
    placement: "left-start",
  },
  {
    target: ".app-preview",
    content:
      "You can see how the changes impact your app with the app preview...",
    placement: "top-start",
  },
  {
    target: ".undo-redo-buttons",
    content:
      "Mess something up? You can use the change history to undo or redo your changes",
    placement: "bottom",
  },
];

export function AppTour() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [run, setRun] = React.useState(false);

  console.log({ run, stepIndex });
  const handleJoyrideCallback: (data: CallBackProps) => void =
    React.useCallback((data) => {
      const { action, index, status, type } = data;
      console.log({ action, index, status, type }); //eslint-disable-line no-console

      if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
        if (action === ACTIONS.NEXT) {
          setStepIndex(index + 1);
        } else if (action === ACTIONS.PREV) {
          setStepIndex(index - 1);
        } else if (action === ACTIONS.CLOSE) {
          setRun(false);
        }
      }

      if (type === EVENTS.TOUR_END) {
        if (action === ACTIONS.NEXT) {
          setRun(false);
          setStepIndex(0);
        }
        if (action === ACTIONS.SKIP) {
          setRun(false);
        }
      }
    }, []);

  const startTour = React.useCallback(() => {
    setRun(true);
  }, []);

  return (
    <>
      <Button onClick={startTour} title="Take a guided tour of app">
        <FaMapMarked size="1.2rem" /> Tour App
      </Button>
      <Joyride
        callback={handleJoyrideCallback}
        steps={joyrideSteps}
        stepIndex={stepIndex}
        run={run}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        disableScrolling={true}
        locale={{
          next: "Next",
          back: "Back",
          close: "Close",
          last: "Let's go!",
          open: "Open the dialog",
          skip: "Skip tour",
        }}
        styles={joyrideStyles}
      />
    </>
  );
}

const beaconColorBase = `#e07189`;
const beaconColorLight = `#f6d5dc`;

const joyrideStyles: Styles = {
  options: {
    arrowColor: "var(--rstudio-white, white)",
    backgroundColor: "var(--rstudio-white, white)",
    primaryColor: "var(--rstudio-blue, steelblue)",
    textColor: "var(--rstudio-grey, black)",
  },
  beaconInner: {
    backgroundColor: beaconColorBase,
  },
  beaconOuter: {
    backgroundColor: beaconColorLight,
    border: `2px solid ${beaconColorBase}`,
  },
};
