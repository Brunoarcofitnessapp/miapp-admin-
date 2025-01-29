import React from "react";
import { Col, Row, Table, Badge, Tag } from "antd";
import styles from "../../components/Table/table.module.scss";
import envlp from "../../assets/icons/envlp.svg";
import { StatusDropDown } from "../../components/Input";
import { GetColumnSearchProps } from "../../components/Table/search";
import ShowModal from "../../components/Modal/index";
import { useEffect, useState } from "react";
import {
  getAllExercisesWithPagination,
  getAllUsersWithPagination,
  getSingleExerciseDetails,
  getSingleUserDetails,
  getSingleUserExercises,
} from "../../api";
import { useAdmin } from "../../context/userContext";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineAssignmentInd } from "react-icons/md";

const ExpandedRowRender = ({ data }) => {
  return (
    <div className={styles.xpnd_row}>
      <>
        <Row className={styles.row}>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>nombre del Ejercicio</p>
              <p className={styles.desc}>{data?.exercise?.name}</p>
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>tipo de ejercicio</p>
              <p className={styles.desc}>{data?.exercise?.exercisetype}</p>
            </div>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={10}>
            <div className={styles.rvw_sec}>
              <p className={styles.title}>Superconjunto</p>
              <p className={styles.desc}>
                {data?.exercise?.superset ? "Si" : "No"}
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
                src={data?.exercise?.image}
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
                src={data?.exercise?.video?.video}
              />
              <p
                style={{
                  fontSize: 16,
                  color: "var(--color-primary)",
                  textAlign: "center",
                }}
              >
                {data?.exercise?.video?.title}
              </p>
              {/* </div> */}
            </div>
          </Col>
        </Row>
      </>
    </div>
  );
};

const SingleUserExercise = () => {
  const location = useLocation();
  const [loading, setloading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const [fetchagain, setfetchagain] = useState(false);

  const { exercises, setexercises } = useAdmin();
  useEffect(() => {
    getSingleUserExercises(
      pagination,
      setloading,
      setexercises,
      location?.state,
      setPagination,
      toast
    );
  }, [fetchagain]);

  const handleTableChange = (newPagination, filters, sorter) => {
    getSingleUserExercises(
      newPagination,
      setloading,
      setexercises,
      location?.state,
      setPagination,
      toast
    );
  };

  const columns = [
    {
      title: "Número",
      dataIndex: "_id",
      key: "_id",
      width: "10%",
      render: (serial, id, index) => index + 1,
      ...GetColumnSearchProps("_id"),
    },
    {
      title: "nombre del Ejercicio",
      dataIndex: "name",
      key: "name",
      render: (_, { exercise }) => exercise?.name,
      width: "40%",
      ...GetColumnSearchProps("name"),
    },
    {
      title: "tipo de ejercicio",
      dataIndex: "exercisetype",
      key: "exercisetype",
      render: (_, { exercise }) => exercise?.exercisetype,
      width: "30%",
      ...GetColumnSearchProps("exercisetype"),
    },
    {
      title: "Superconjunto",
      dataIndex: "superset",
      key: "superset",
      render: (_, { exercise }) => (exercise?.superset ? "Si" : "No"),
      width: "15%",
      // ...GetColumnSearchProps("superset"),
    },

    {
      title: "Acción",
      dataIndex: "",
      key: "x",
      width: "15%",
      render: (_, exercise) => {
        return (
          <div className={styles.action_bttns}>
            <ShowModal
              data={{
                id: exercise._id,
                Model: "Exercise",
                path: "removeuserfromexercise",
                state: fetchagain,
                setstate: setfetchagain,
                secondid: location?.state,
              }}
            />
            {/* <Link to={`/exercise/editexercise`,{
                {exercise: exercise},
            }}> */}
            <a
              onClick={() =>
                navigate("/exercise/assignreps", {
                  state: exercise,
                })
              }
              className={styles.bttns}
            >
              {" "}
              <FiEdit2 className={styles.icon} color={"#00eeff"} />
            </a>
            {/* </Link> */}
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Toaster position="top-right" />
      <Row className={styles.home_row}>
        <Col span={24}>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <ExpandedRowRender data={record} />
              ),
            }}
            expandIconColumnIndex={12}
            dataSource={exercises}
            pagination={pagination}
            onChange={handleTableChange}
            loading={loading}
            rowKey={(record) => record?._id}
          />
        </Col>
      </Row>
    </>
  );
};
export default SingleUserExercise;
