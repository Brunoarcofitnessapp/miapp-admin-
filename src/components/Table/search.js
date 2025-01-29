import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

export const GetColumnSearchProps = (dataIndex, arrone, arrtwo) => {
  function returnspanishfoodname(mealtype) {
    if (arrone && arrtwo) {
      return mealtype == arrtwo[0]
        ? arrone[0]
        : mealtype == arrtwo[1]
        ? arrone[1]
        : mealtype == arrtwo[2]
        ? arrone[2]
        : mealtype == arrtwo[3]
        ? arrone[3]
        : mealtype == arrtwo[4]
        ? arrone[4]
        : mealtype == arrtwo[5]
        ? arrone[5]
        : "No Meal type";
    } else {
      return "";
    }
  }

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  let searchInput = null;

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      if (dataIndex === "company" && !!record[dataIndex]) {
        return record[dataIndex].name
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      if (dataIndex === "mealtype") {
        return returnspanishfoodname(record[dataIndex])
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      if (dataIndex === "subCategory" && !!record[dataIndex]) {
        return record[dataIndex].name
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      } else {
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
  };
};
