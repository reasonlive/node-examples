import clsx from "clsx";
import React from "react";

import styles from "./Input.module.css";

export type InputProps = {
  label?: string;
} & React.ComponentPropsWithRef<"input">;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    if (label) {
      return (
        <label className={styles.label} htmlFor={props.name} title={label}>
          <span className={styles.labelText}>{label}</span>
          <input
            {...props}
            className={clsx(styles.Input, props.className)}
            ref={ref}
          />
        </label>
      );
    }
    return (
      <input
        {...props}
        className={clsx(styles.Input, props.className)}
        ref={ref}
      />
    );
  },
);

Input.displayName = "Input";
