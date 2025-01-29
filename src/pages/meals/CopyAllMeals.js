import React, { useState, useEffect, useCallback } from "react";
import { Col, Row, Table, Tag, Button, Input, Select } from "antd";

import styles from "../../components/Table/table.module.scss";
import envlp from "../../assets/icons/envlp.svg";
import { GetColumnSearchProps } from "../../components/Table/search";
import ShowModal from "../../components/Modal";
import { StatusDropDown } from "../../components/Input";
import {
  getAllMealswithpagination,
  getSearchedMealswithpagination,
  getSingleMealsDetails,
  getSingleUserMeals,
} from "../../api";
import { toast, Toaster } from "react-hot-toast";
import { useAdmin } from "../../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineAssignmentInd } from "react-icons/md";

const mealTypeSpan = [
  "Desayuno",
  "Almuerzo",
  "Merienda",
  "Cena",
  "Colacción 1",
  "Colacción 2",
];
const mealTypeEng = [
  "breakfast",
  "lunch",
  "afternoonsnack",
  "dinner",
  "snack 1",
  "snack 2",
];

const ExpandedRowRender = ({ data }) => {
  const [loading, setloading] = useState(true);
  const [singlemeals, setsinglemeals] = useState(null);

  // const {singleuser,setsingleuser} = useAdmin();

  useEffect(() => {
    getSingleMealsDetails(setloading, data._id, toast, setsinglemeals);
  }, []);
  return (
    <div className={styles.xpnd_row}>
      {loading ? (
        <Row className={styles.row}>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              width: "100%",
              padding: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <div className={"basic"}></div>
          </div>
        </Row>
      ) : (
        <>
          <Row className={styles.row}>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Nombre de la comida</p>

                <p className={styles.desc}>{singlemeals?.mealname}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Tipo de comida</p>

                <p className={styles.desc}>
                  {singlemeals?.mealtype == mealTypeEng[0]
                    ? mealTypeSpan[0]
                    : singlemeals?.mealtype == mealTypeEng[1]
                    ? mealTypeSpan[1]
                    : singlemeals?.mealtype == mealTypeEng[2]
                    ? mealTypeSpan[2]
                    : singlemeals?.mealtype == mealTypeEng[3]
                    ? mealTypeSpan[3]
                    : singlemeals?.mealtype == mealTypeEng[4]
                    ? mealTypeSpan[4]
                    : singlemeals?.mealtype == mealTypeEng[5]
                    ? mealTypeSpan[5]
                    : "No Meal type"}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Días de comida</p>
                {singlemeals?.dayname?.map((key, ind) => {
                  return (
                    <Tag color="#00e0ff" key={ind} style={{ margin: "3px" }}>
                      {key}
                    </Tag>
                  );
                })}
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Hora de cocinar</p>
                <p className={styles.desc}>{singlemeals?.time} minutos</p>
              </div>
            </Col>
          </Row>
          {/* <Row className={styles.row}>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Proteínas</p>
                <p className={styles.desc}>{singlemeals?.protein}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Carbohidratos</p>
                <p className={styles.desc}>{singlemeals?.carbs}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Grasas</p>
                <p className={styles.desc}>{singlemeals?.fats}</p>
              </div>
            </Col>

            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Calorías</p>
                <p className={styles.desc}>{singlemeals?.calories}</p>
              </div>
            </Col>
          </Row> */}
          <Row className={styles.row}>
            <Col span={20}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Imagen de comida</p>
                {/* <div className={styles.imgbox}> */}
                <img
                  style={{
                    width: "50%",
                    height: 280,
                    borderRadius: "10px",
                  }}
                  src={singlemeals?.photo}
                  alt="meal image"
                />
                {/* </div> */}
              </div>
            </Col>
          </Row>
          <Row className={styles.row}>
            <p style={{ fontSize: 20, marginTop: 20 }} className={styles.title}>
              Meal Ingredients
            </p>
          </Row>
          <Row className={styles.row}>
            {/* <div className={styles.rvw_sec}> */}

            {singlemeals?.ingredients?.map((item, ind) => {
              return (
                <>
                  <Col span={8}>
                    <p style={{ color: "grey" }}>Nombre del ingrediente : </p>
                    <Tag color={"#00e0ff"} key={ind}>
                      {item?.name}
                    </Tag>
                    <p style={{ color: "grey" }}>Unidad de ingrediente : </p>

                    <Tag color={"#00e0ff"} key={ind}>
                      {item?.unit}
                    </Tag>
                    <p style={{ color: "grey" }}>Valor del ingrediente : </p>

                    <Tag color={"#00e0ff"} key={ind}>
                      {item?.value}
                    </Tag>
                    <p style={{ color: "grey" }}>imagen de ingrediente : </p>

                    <img
                      style={{
                        width: "65%",
                        height: 250,
                        borderRadius: "10px",
                        margin: "10px 0px",
                      }}
                      src={item?.image}
                      alt="ingredient image"
                    />
                  </Col>
                </>
              );
            })}
            {/* </div> */}
          </Row>

          {/* <Row> */}

          <div className={styles.rvw_sec}>
            <p style={{ fontSize: 20, marginTop: 20 }} className={styles.title}>
              Instrucciones
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 5,
                flexWrap: "wrap",
              }}
            >
              {singlemeals?.instructions?.map((item, ind) => {
                return (
                  <Row>
                    <Col span={10}>
                      <Tag
                        style={{ marginTop: 10 }}
                        color={"#00e0ff"}
                        key={ind}
                      >
                        {item}
                      </Tag>
                    </Col>
                  </Row>
                );
              })}
            </div>
          </div>
          {/* </Col>
            
            
            
            </Row>
            {/* <Row className={styles.row}>
            <Col span={20}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Meal Users</p>
                <p className={styles.desc}>users</p>
              </div>
            </Col>
          </Row> */}
        </>
      )}
    </div>
  );
};

const AllMeals = ({ singleuser }) => {
  const { Search } = Input;

  const [visible, setVisible] = useState(false);
  const [formRef, setFormRef] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");

  const handleCreate = () => {
    formRef.validateFields((err, values) => {
      if (err) {
        return;
      }

      formRef.resetFields();
      setVisible(false);
    });
  };

  const saveFormRef = useCallback((node) => {
    if (node !== null) {
      setFormRef(node);
    }
  }, []);

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const [loading, setloading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [searchpagination, setsearchPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [fetchagain, setfetchagain] = useState(false);

  const { meals, setmeals } = useAdmin();

  const location = useLocation();

  useEffect(() => {
    if (singleuser) {
      getSingleUserMeals(
        pagination,
        setloading,
        setmeals,
        location?.state,
        setPagination,
        toast
      );
    } else {
      getAllMealswithpagination(
        pagination,
        setloading,
        setmeals,
        setPagination,
        toast
      );
    }
  }, [fetchagain]);

  const handleTableChange = (newPagination, filters, sorter) => {
    if (searchText !== "") {
      getSearchedMealswithpagination(
        newPagination,
        setloading,
        setmeals,
        setPagination,
        type,
        toast,
        searchText
      );
    } else {
      getAllMealswithpagination(
        newPagination,
        setloading,
        setmeals,
        setPagination,
        toast
      );
    }
  };

  const columns = [
    {
      title: "Número",
      dataIndex: "id",
      key: "id",
      // width: 50,
      render: (serial, id, index) => index + 1,
      ...GetColumnSearchProps("id"),
    },
    {
      title: "Nombre de la comida",
      dataIndex: "mealname",
      key: "mealname",
      render: (_, { mealname }) => mealname,
    },
    {
      title: "Tipo de comida",
      dataIndex: "mealname",
      key: "mealname",
      render: (_, { mealtype }) => {
        return mealtype == mealTypeEng[0]
          ? mealTypeSpan[0]
          : mealtype == mealTypeEng[1]
          ? mealTypeSpan[1]
          : mealtype == mealTypeEng[2]
          ? mealTypeSpan[2]
          : mealtype == mealTypeEng[3]
          ? mealTypeSpan[3]
          : mealtype == mealTypeEng[4]
          ? mealTypeSpan[4]
          : mealtype == mealTypeEng[5]
          ? mealTypeSpan[5]
          : "No Meal type";
      },
      ...GetColumnSearchProps("mealtype", mealTypeSpan, mealTypeEng),
    },
    {
      title: "Total days",
      dataIndex: "totaldays",
      key: "totaldays",
      width: "10%",

      render: (_, { dayname }) => dayname?.length,
    },
    {
      title: "Cooking Time",
      dataIndex: "cookingtime",
      key: "cookingtime",
      width: "15%",

      render: (_, { time }) => time,
    },

    {
      title: "Acción",
      dataIndex: "",
      key: "x",
      width: "10%",
      render: (_, meal) => {
        return (
          <div className={styles.action_bttns}>
            <ShowModal
              data={{
                id: meal._id,
                Model: "Meal",
                path: singleuser ? "removeuserfrommeal" : "deletemeal",
                state: fetchagain,
                setstate: setfetchagain,
                secondid: singleuser ? location?.state : null,
              }}
            />
            <a
              onClick={() =>
                navigate("/meal/editmeals", {
                  state: meal,
                })
              }
              className={styles.bttns}
            >
              {" "}
              <FiEdit2 className={styles.icon} color={"#00eeff"} />
            </a>
            <a
              onClick={() =>
                navigate("/meal/assignmacro", {
                  state: { meal, single: false },
                })
              }
              className={styles.bttns}
            >
              {" "}
              <MdOutlineAssignmentInd
                className={styles.icon}
                color={"#00eeff"}
              />
            </a>
          </div>
        );
      },
    },
  ];

  const { Option } = Select;

  const selectBefore = (
    <Select
      onChange={(value) => setType(value)}
      defaultValue="name"
      style={{ width: "180px", padding: "3px" }}
    >
      <Option value="name">By Meal Name</Option>
      <Option value="type">By Meal Type</Option>
    </Select>
  );

  const onSearch = (value) => {
    if (value === "") {
      setSearchText("");
      getAllMealswithpagination(
        pagination,
        setloading,
        setmeals,
        setPagination,
        toast
      );
      return;
    }

    getSearchedMealswithpagination(
      pagination,
      setloading,
      setmeals,
      setPagination,
      type,
      toast,
      value
    );
  };

  return (
    <>
      <Row className={styles.home_row} style={{ minHeight: "8vh" }}>
        <Search
          addonBefore={selectBefore}
          placeholder="input search text"
          // allowClear
          enterButton="Search"
          size="large"
          loading={loading}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={onSearch}
        />
      </Row>
      <Row className={styles.home_row}>
        <Toaster position="top-right" />
        <Col span={24}>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <ExpandedRowRender data={record} />
              ),
            }}
            expandIconColumnIndex={12}
            dataSource={meals}
            loading={loading}
            onChange={handleTableChange}
            pagination={pagination}
            rowKey={(record) => record?._id}
          />
        </Col>
      </Row>
    </>
  );
};
export default AllMeals;
