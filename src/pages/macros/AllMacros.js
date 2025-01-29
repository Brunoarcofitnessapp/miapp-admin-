import React, { useState, useEffect, useCallback } from "react";
import { Col, Row, Table, Tag, Button, Input, Select, Tooltip } from "antd";

import styles from "../../components/Table/table.module.scss";
import envlp from "../../assets/icons/envlp.svg";
import { GetColumnSearchProps } from "../../components/Table/search";
import { getAllMacroswithpagination, getTemplateslist } from "../../api";
import { toast, Toaster } from "react-hot-toast";
import { useAdmin } from "../../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import ShowModal from "../../components/Modal/templatelist";
import DeleteModal from "../../components/Modal";

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
  return (
    <div className={styles.xpnd_row}>
      {/* {loading ? (
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
      ) : ( */}
      <>
        <Row className={styles.row}>
          <Col span={5}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>Nombre de la comida</p>

              <p className={styles.desc}>{data?.meals[0]?.mealname}</p>
            </div>
          </Col>
          <Col span={5}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>Tipo de comida</p>

              <p className={styles.desc}>
                {data?.meals[0]?.mealtype == mealTypeEng[0]
                  ? mealTypeSpan[0]
                  : data?.mealtype == mealTypeEng[1]
                  ? mealTypeSpan[1]
                  : data?.mealtype == mealTypeEng[2]
                  ? mealTypeSpan[2]
                  : data?.mealtype == mealTypeEng[3]
                  ? mealTypeSpan[3]
                  : data?.mealtype == mealTypeEng[4]
                  ? mealTypeSpan[4]
                  : data?.mealtype == mealTypeEng[5]
                  ? mealTypeSpan[5]
                  : "No Meal type"}
              </p>
            </div>
          </Col>
          <Col span={5}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>Días de comida</p>
              {data?.dayname?.map((key, ind) => {
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
              <p className={styles.desc}>{data?.meals[0]?.time} minutos</p>
            </div>
          </Col>
        </Row>
        {/* <Row className={styles.row}>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Proteínas</p>
                <p className={styles.desc}>{data?.protein}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Carbohidratos</p>
                <p className={styles.desc}>{data?.carbs}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Grasas</p>
                <p className={styles.desc}>{data?.fats}</p>
              </div>
            </Col>

            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Calorías</p>
                <p className={styles.desc}>{data?.calories}</p>
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
                src={data?.meals[0]?.photo}
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

          {data?.ingredients?.map((item, ind) => {
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
            {data?.meals[0]?.instructions?.map((item, ind) => {
              return (
                <Row>
                  <Col span={10}>
                    <Tag style={{ marginTop: 10 }} color={"#00e0ff"} key={ind}>
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
      {/* )} */}
    </div>
  );
};

const Allmacros = ({ singleuser }) => {
  const { Search } = Input;

  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");

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

  const [fetchagain, setfetchagain] = useState(false);

  const { macros, setmacros, list, setlist } = useAdmin();

  useEffect(() => {
    getTemplateslist(setloading, setlist, toast);
  }, []);

  useEffect(() => {
    getAllMacroswithpagination(
      pagination,
      setloading,
      setmacros,
      setPagination,
      toast
    );
  }, [fetchagain]);

  const handleTableChange = (newPagination, filters, sorter) => {
    getAllMacroswithpagination(
      newPagination,
      setloading,
      setmacros,
      setPagination,
      toast
    );
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
      render: (_, { meals }) => meals[0]?.mealname,
    },

    {
      title: "Proteína",
      dataIndex: "proteína",
      key: "proteína",
      width: "10%",

      render: (_, { protein }) => protein,
    },
    {
      title: "Grasas",
      dataIndex: "grasas",
      key: "grasas",
      width: "10%",

      render: (_, { fats }) => fats,
    },
    {
      title: "Carbohidratos",
      dataIndex: "carbohidratos",
      key: "carbohidratos",
      width: "10%",

      render: (_, { carbs }) => carbs,
    },
    {
      title: "calorías",
      dataIndex: "calorías",
      key: "calorías",
      width: "10%",

      render: (_, { calories }) => calories,
    },

    {
      title: "Acción",
      dataIndex: "",
      key: "x",
      width: "10%",
      render: (_, meal) => {
        return (
          <div className={styles.action_bttns}>
            <DeleteModal
              data={{
                id: meal._id,
                Model: "Macros",
                path: "deletemacros",
                state: fetchagain,
                setstate: setfetchagain,
                secondid: null,
              }}
            />
            <ShowModal type={"meal"} id={meal._id} />
          </div>
        );
      },
    },
  ];

  //   const onSearch = (value) => {
  //     if (value === "") {
  //       setSearchText("");
  //       getAllmacroswithpagination(
  //         pagination,
  //         setloading,
  //         setmeals,
  //         setPagination,
  //         toast
  //       );
  //       return;
  //     }

  //     getSearchedMealswithpagination(
  //       pagination,
  //       setloading,
  //       setmeals,
  //       setPagination,
  //       type,
  //       toast,
  //       value
  //     );
  //   };

  return (
    <>
      {/* <Row className={styles.home_row} style={{ minHeight: "8vh" }}>
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
      </Row> */}
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
            dataSource={macros}
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
export default Allmacros;
