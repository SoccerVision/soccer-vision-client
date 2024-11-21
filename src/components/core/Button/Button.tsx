import clsx from "clsx";
import { ButtonHTMLAttributes, FunctionComponent } from "react";

import { ButtonSizes, ButtonTypes } from "../../../types/btn";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonTypes;
  size?: ButtonSizes;
  text: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  buttonType = ButtonTypes.PRIMARY,
  size = ButtonSizes.MEDIUM,
  text,
  disabled = false,
  className,
  ...otherProps
}) => {
  const classes = clsx(
    "btn",
    `btn--${buttonType}`,
    `btn--${size}`,
    { "btn--disabled": disabled },
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      {...otherProps}
    >
      {text}
    </button>
  );
};
