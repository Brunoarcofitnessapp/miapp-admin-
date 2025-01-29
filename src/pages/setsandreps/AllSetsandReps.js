import React, { useState, useEffect, useCallback } from "react";
import { Col, Row, Table, Tag, Button, Input, Select, Tooltip } from "antd";

import styles from "../../components/Table/table.module.scss";
import envlp from "../../assets/icons/envlp.svg";
import { GetColumnSearchProps } from "../../components/Table/search";
import {
  getAllSetsandRepswithpagination,
  getSearchedSetsandRepswithpagination,
  getTemplateslist,
} from "../../api";
import { toast, Toaster } from "react-hot-toast";
import { useAdmin } from "../../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import ShowModal from "../../components/Modal/templatelist";
import DeleteModal from "../../components/Modal";

const ExpandedRowRender = ({ data }) => {
  return (
    <div className={styles.xpnd_row}>
      <>
        <Row className={styles.row}>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>nombre del Ejercicio</p>
              <p className={styles.desc}>{data?.exercise.name}</p>
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>tipo de ejercicio</p>
              <p className={styles.desc}>{data?.exercise.exercisetype}</p>
            </div>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>Superconjunto</p>
              <p className={styles.desc}>
                {data?.exercise.superset ? "Si" : "No"}
              </p>
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>Repetición</p>
              <p className={styles.desc}>
                {data?.repetitions?.map((item, ind) => {
                  return (
                    <Tag color={"#00e0ff"} key={ind}>
                      {item}
                    </Tag>
                  );
                })}
              </p>
            </div>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>ejercicio días</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                {data?.days?.map((item, ind) => {
                  return (
                    <Tag color={"#00e0ff"} key={ind}>
                      {item}
                    </Tag>
                  );
                })}
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>ejercicio semanas</p>
              <p className={styles.desc}>
                {data?.weeks?.map((item, ind) => {
                  return (
                    <Tag color={"#00e0ff"} key={ind}>
                      {item}
                    </Tag>
                  );
                })}
              </p>
            </div>
          </Col>
        </Row>
        {/* <Row className={styles.row}>
          <Col span={20}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>ejercicio usuarios</p>
              <p className={styles.desc}>
                {data?.users?.map((item, ind) => {
                  return (
                    <Tag color={"#00e0ff"} key={ind}>
                      {item?.firstname} {item?.lastname}
                    </Tag>
                  );
                })}
              </p>
            </div>
          </Col>
        </Row> */}
        <Row className={styles.row}>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>ejercicio Imagen</p>
              {/* <div className={styles.imgbox}> */}
              <img
                style={{
                  width: "50%",
                  height: 250,
                  borderRadius: "10px",
                }}
                src={data?.exercise.image}
                alt="exercise image"
              />
              {/* </div> */}
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>ejercicio Video</p>
              {/* <div className={styles.imgbox}> */}
              <video
                width="100%"
                height={250}
                controls
                src={data?.exercise.video?.video}
              />
              <p
                style={{
                  fontSize: 16,
                  color: "var(--color-primary)",
                  textAlign: "center",
                }}
              >
                {data?.exercise.video?.title}
              </p>
              {/* </div> */}
            </div>
          </Col>
        </Row>
      </>
    </div>
  );
};

const AllSetsandReps = ({ singleuser }) => {
  const { Search } = Input;

  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("exename");

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

  const { setsandreps, setsetsandreps, list, setlist } = useAdmin();

  useEffect(() => {
    getTemplateslist(setloading, setlist, toast);
  }, []);

  useEffect(() => {
    getAllSetsandRepswithpagination(
      pagination,
      setloading,
      setsetsandreps,
      setPagination,
      toast
    );
  }, [fetchagain]);

  const handleTableChange = (newPagination, filters, sorter) => {
    if (searchText !== "") {
      getSearchedSetsandRepswithpagination(
        newPagination,
        setloading,
        setsetsandreps,
        setPagination,
        type,
        toast,
        searchText
      );
    } else {
      getAllSetsandRepswithpagination(
        newPagination,
        setloading,
        setsetsandreps,
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
      title: "Nombre del Ejercicio",
      dataIndex: "exename",
      key: "exename",
      render: (_, { exercise }) => exercise?.name,
    },

    {
      title: "tipo de ejercicio",
      dataIndex: "exetype",
      key: "exetype",

      render: (_, { exercise }) => exercise?.exercisetype,
    },

    {
      title: "Repetición",
      dataIndex: "Repetición",
      key: "Repetición",

      render: (_, { repetitions }) =>
        repetitions.map(
          (item, index) =>
            `${item}${index == repetitions.length - 1 ? "" : "/"}`
        ),
    },

    {
      title: "Acción",
      dataIndex: "",
      key: "x",
      width: "10%",
      render: (_, exercise) => {
        return (
          <div className={styles.action_bttns}>
            <DeleteModal
              data={{
                id: exercise._id,
                Model: "SetsandReps",
                path: "deletesetsandreps",
                state: fetchagain,
                setstate: setfetchagain,
                secondid: null,
              }}
            />
            <ShowModal type={"exercise"} id={exercise._id} />
          </div>
        );
      },
    },
  ];

  const { Option } = Select;

  const selectBefore = (
    <Select
      onChange={(value) => setType(value)}
      defaultValue="exename"
      style={{ width: "200px", padding: "3px" }}
    >
      <Option value="exename">By Exercise Name</Option>
      <Option value="exetype">By Exericse Type</Option>
    </Select>
  );

  const onSearch = (value) => {
    if (value === "") {
      setSearchText("");
      getAllSetsandRepswithpagination(
        pagination,
        setloading,
        setsetsandreps,
        setPagination,
        toast
      );
      return;
    }

    setPagination({
      ...pagination,
      current: 1,
      pageSize: 10,
    });

    getSearchedSetsandRepswithpagination(
      pagination,
      setloading,
      setsetsandreps,
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
            dataSource={setsandreps}
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
export default AllSetsandReps;
