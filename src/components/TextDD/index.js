import React from "react";
import { Select } from "antd";
import styles from "./textDropDown.module.scss";
import { BsFillCaretDownFill, BsXLg, BsSearch } from "react-icons/bs";

const TextDropDown = React.forwardRef(
  (
    {
      icon = true,
      lable,
      lable_ur,
      value,
      placeholder,
      suffix = false,
      searchable,
      style,
      onChange,
      leftIcon,
      options = [],
      allowClear = false,

      ...rest
    } = {},
    ref
  ) => {
    const { Option } = Select;

    const { errors, setValue, name } = rest;

    return (
      <div className={styles.text_drop_down} style={style}>
        {lable && (
          <p
            style={{ color: "black", fontFamily: "poppins-500" }}
            className={styles.common_input_lable}
          >
            {lable}
          </p>
        )}
        <div className={styles.textDropDownContainer}>
          <Select
            showSearch={searchable}
            onChange={(val) => setValue(name, val)}
            value={value}
            className="custom-antd-select"
            style={{ width: "100%", color: "red" }}
            placeholder={placeholder}
            allowClear={allowClear}
            clearIcon={<BsXLg icon="icon-cross" />}
            filterOption={(input, option) =>
              option?.children
                ?.toString()
                .toLowerCase()
                .indexOf(input.trim().toLowerCase()) >= 0
            }
            suffixIcon={({ open, searchValue }) => {
              return suffix ? (
                open ? (
                  searchValue.length > 0 ? null : (
                    <BsSearch icon="icon-search" />
                  )
                ) : (
                  <BsFillCaretDownFill className={styles.drop_down_arrow} />
                )
              ) : null;
            }}
            {...rest}
            ref={ref}
          >
            {options.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
          {errors[name] && <span>{errors[name].message}</span>}
        </div>
      </div>
    );
  }
);

const TextDropDownMulti = React.forwardRef(
  (
    {
      icon = true,
      lable,
      lable_ur,

      placeholder,
      suffix = false,
      searchable,
      style,
      allIng,
      leftIcon,
      options,
      allowClear = false,

      ...rest
    } = {},
    ref
  ) => {
    const { Option } = Select;
    const { errors, setValue, name, onChange, mode, children, value } = rest;

    return (
      <div className={styles.text_drop_down} style={style}>
        {lable && (
          <p
            style={{ color: "black", fontFamily: "poppins-500" }}
            className={styles.common_input_lable}
          >
            {lable}
          </p>
        )}
        <div className={styles.textDropDownContainer}>
          <Select
            mode={mode}
            // showSearch={searchable}
            onChange={onChange}
            value={value}
            // value={value}
            className="custom-antd-select"
            style={{ width: "100%", color: "black" }}
            placeholder={placeholder}
            allowClear={true}
            clearIcon={<BsXLg icon="icon-cross" />}
            filterOption={(input, option) =>
              option?.children
                ?.toString()
                .toLowerCase()
                .indexOf(input.trim().toLowerCase()) >= 0
            }
            suffixIcon={({ open, searchValue }) => {
              return suffix ? (
                open ? (
                  searchValue.length > 0 ? null : (
                    <BsSearch icon="icon-search" />
                  )
                ) : (
                  <BsFillCaretDownFill className={styles.drop_down_arrow} />
                )
              ) : null;
            }}
            {...rest}
            ref={ref}
          >
            {/* {children} */}
            {options.map((item, ind) => (
              <Option key={ind} value={ind}>
                {item.name}
              </Option>
            ))}
          </Select>
          {/* {errors[name] && <span>{errors[name].message}</span>} */}
        </div>
      </div>
    );
  }
);

export { TextDropDown, TextDropDownMulti };
