import * as React from "react";

import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { ShinyTextInputProps } from ".";

import classes from "./styles.module.css";

const ShinyTextInput: UiNodeComponent<ShinyTextInputProps> = ({
  uiArguments,
  wrapperProps,
}) => {
  const width = "200px";
  const height = "auto";
  const settings = { ...uiArguments };

  const [value, setValue] = React.useState(settings.value);

  React.useEffect(() => {
    setValue(settings.value);
  }, [settings.value]);

  return (
    <div
      className={classes.container + " shiny::textInput"}
      style={{ height, width }}
      {...wrapperProps}
    >
      <label htmlFor={settings.inputId}>{settings.label}</label>
      <input
        id={settings.inputId}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={settings.placeholder}
      />
    </div>
  );
};
export default ShinyTextInput;
