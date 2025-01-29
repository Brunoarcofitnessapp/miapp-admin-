import React from "react";
import { Select } from "antd";
import styles from "./input.module.scss";

const { Option } = Select;
export const StatusDropDown = () => {
  const handleChange = async () => {};
  return (
    <Select
      value="Hide"
      onChange={handleChange}
      style={{ width: 100 }}
      bordered={false}
    >
      <Option className={styles.green} value="Hide">
        Hide
      </Option>
      <Option className={styles.green} value="Freeze">
        Freeze
      </Option>
    </Select>
  );
};
export const CommonDropDown = () => {
  return (
    <Select defaultValue="active" style={{ width: 100 }} bordered={false}>
      <Option className={styles.green} value="visible">
        VISIBLE
      </Option>
      <Option className={styles.green} value="active">
        ACTIVE
      </Option>
      <Option className={styles.red} value="hide">
        HIDE
      </Option>
      <Option className={styles.red} value="freez">
        FREEZ
      </Option>
      <Option className={styles.green} value="role">
        ROLE 1
      </Option>
    </Select>
  );
};

export const CommonTextArea = React.forwardRef(
  ({ lable, style, placeholder, rows, cols, lableColor, ...rest }, ref) => {
    const { errors, name } = rest;
    return (
      <div className={styles.text_area_div} style={style}>
        {lable && (
          <p style={{ color: lableColor }} className={styles.lable}>
            {lable}
          </p>
        )}
        <textarea
          style={{ width: "100%", outline: "none", color: "#000" }}
          className={styles.textArea}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
          {...rest}
          ref={ref}
        />
        {errors[name] && <span>{errors[name].message}</span>}
      </div>
    );
  }
);

export const CustomInput = React.forwardRef(
  (
    {
      style,
      type = "text",
      placeholder = "",
      disabled = false,
      value,
      lableDisabled = false,
      lable,
      lableColor,
      optional,
      ...rest
    },
    ref
  ) => {
    const { errors, name } = rest;
    return (
      <div className={styles.common_input_main_div} style={style}>
        {lable && (
          <p
            className={styles.common_input_lable}
            style={{ color: lableColor }}
            disabled={lableDisabled}
          >
            {lable}
          </p>
        )}
        <input
          className={styles.common_input_field}
          type={type}
          placeholder={placeholder}
          style={{ color: "black" }}
          {...rest}
          ref={ref}
        />
        {errors[name] && <span>{errors[name].message}</span>}
      </div>
    );
  }
);
