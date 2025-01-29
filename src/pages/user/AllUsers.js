import React from "react";
import { Col, Row, Table } from "antd";
import styles from "../../components/Table/table.module.scss";
import envlp from "../../assets/icons/envlp.svg";
import { StatusDropDown } from "../../components/Input";
import { GetColumnSearchProps } from "../../components/Table/search";
import ShowModal from "../../components/Modal/index";
import { useEffect, useState } from "react";
import { getAllUsersWithPagination, getSingleUserDetails } from "../../api";
import { useAdmin } from "../../context/userContext";
import { toast, Toaster } from "react-hot-toast";
import { CameraFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { MdFastfood } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { HiDocumentDuplicate } from "react-icons/hi";

const ExpandedRowRender = ({ data }) => {
  const [loading, setloading] = useState(true);
  const [singleuser, setsingleuser] = useState(null);

  //   const {singleuser,setsingleuser} = useAdmin();

  useEffect(() => {
    getSingleUserDetails(setloading, data._id, toast, setsingleuser);
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
                <p className={styles.title}>Nombre completo</p>
                <p className={styles.desc}>
                  {singleuser?.firstname} {singleuser?.lastname}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>User Email</p>
                <p className={styles.desc}>{singleuser?.email}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>User DOB</p>
                <p className={styles.desc}>{singleuser?.dob}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>User Teléfono</p>
                <p className={styles.desc}>{singleuser?.phone}</p>
              </div>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Peso</p>
                <p className={styles.desc}>
                  {singleuser?.weight !== ""
                    ? singleuser?.weight
                    : "Not Updated Yet"}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Altura</p>
                <p className={styles.desc}>
                  {singleuser?.height !== ""
                    ? singleuser?.height
                    : "Not Updated Yet"}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Brazos</p>
                <p className={styles.desc}>
                  {singleuser?.arms !== ""
                    ? singleuser?.arms
                    : "Not Updated Yet"}{" "}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Grasa corporal</p>
                <p className={styles.desc}>
                  {singleuser?.bodyfat !== ""
                    ? singleuser?.bodyfat
                    : "Not Updated Yet"}{" "}
                </p>
              </div>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Cofre</p>
                <p className={styles.desc}>
                  {singleuser?.chest !== ""
                    ? singleuser?.chest
                    : "Not Updated Yet"}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Mellizas</p>
                <p className={styles.desc}>
                  {singleuser?.twins !== ""
                    ? singleuser?.twins
                    : "Not Updated Yet"}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Caderas</p>
                <p className={styles.desc}>
                  {singleuser?.hips !== ""
                    ? singleuser?.hips
                    : "Not Updated Yet"}{" "}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Hombro</p>
                <p className={styles.desc}>
                  {singleuser?.shoulder !== ""
                    ? singleuser?.shoulder
                    : "Not Updated Yet"}{" "}
                </p>
              </div>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Piernas</p>
                <p className={styles.desc}>
                  {singleuser?.legs !== ""
                    ? singleuser?.legs
                    : "Not Updated Yet"}
                </p>
              </div>
            </Col>

            {/* <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Levantarse a las</p>
                <p className={styles.desc}>
                  {singleuser?.gender ? singleuser?.gender : "other"}
                </p>
              </div>
            </Col> */}

            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Comidas al día</p>
                <p className={styles.desc}>
                  {singleuser?.mealsperday ? singleuser?.mealsperday : "other"}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Nivel de Act.Física</p>
                <p className={styles.desc}>
                  {singleuser?.physicslevel
                    ? singleuser?.physicslevel
                    : "other"}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Edad del usuario</p>
                <p className={styles.desc}>{singleuser?.age}</p>
              </div>
            </Col>
          </Row>

          <Row className={styles.row}>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Género</p>
                <p className={styles.desc}>
                  {singleuser?.gender ? singleuser?.gender : "other"}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Lugar de residencia</p>
                <p className={styles.desc}>{singleuser?.residencePlace}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Preferencia de entrenamiento</p>
                <p className={styles.desc}>{singleuser?.trainingPreference} </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Suplementos</p>
                <p className={styles.desc}>{singleuser?.supplements} </p>
              </div>
            </Col>
          </Row>

          <Row className={styles.row}>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Odio por los alimentos</p>
                <p className={styles.desc}>{singleuser?.hateaboutfoods}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Intolerancia Sobre los alimentos</p>
                <p className={styles.desc}>
                  {singleuser?.intoleranceaboutfoods}
                </p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Veces por semana</p>
                <p className={styles.desc}>{singleuser?.timesperweek}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Lesiones</p>
                <p className={styles.desc}>{singleuser?.injuries}</p>
              </div>
            </Col>
          </Row>

          <Row className={styles.row}>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Medicamento</p>
                <p className={styles.desc}>{singleuser?.medication}</p>
              </div>
            </Col>
            <Col span={5}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>Objetivo del usuario</p>
                <p className={styles.desc}>{singleuser?.myGoal}</p>
              </div>
            </Col>
            <Col span={10}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>
                  Rutina de usuario (por administrador)
                </p>
                <p className={styles.desc}>
                  {singleuser?.userroutinedetailstext}
                </p>
              </div>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={20}>
              <div className={styles.rvw_sec}>
                <p className={styles.title}>
                  Fotos de transformación de usuario
                </p>
                <div className={styles.imagedisplaybox}>
                  {singleuser?.photos.map((item, index) => {
                    return (
                      <div key={index}>
                        {item.image !== "" ? (
                          <img
                            src={item.image}
                            alt="user"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CameraFilled />
                            <p className={styles.desc}>
                              Sin foto Actualizado todavía
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

const AllUsers = () => {
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

  const { users, setusers, singleuser, setsingleuser } = useAdmin();

  const [singleloading, setsingleloading] = useState(false);

  useEffect(() => {
    getAllUsersWithPagination(pagination, setloading, setusers, setPagination);
  }, [fetchagain]);

  const handleTableChange = (newPagination, filters, sorter) => {
    getAllUsersWithPagination(
      newPagination,
      setloading,
      setusers,
      setPagination
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 60,
      render: (serial, id, index) => index + 1,
      ...GetColumnSearchProps("_id"),
    },
    {
      title: "Nombre de usuario",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, { firstname, lastname }) => firstname + " " + lastname,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...GetColumnSearchProps("email"),
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
      //   width:140,
      render: (_, { phone }) => phone ?? "phone",
      ...GetColumnSearchProps("phone"),
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (_, { dob }) => dob,
      ...GetColumnSearchProps("dob"),
    },

    {
      title: "Acción",
      dataIndex: "",
      key: "x",
      width: 100,
      render: (_, user) => {
        return (
          <div className={styles.action_bttns}>
            <ShowModal
              data={{
                id: user._id,
                Model: "User",
                path: "deleteuser",
                setstate: setfetchagain,
                state: fetchagain,
              }}
            />
            <a
              onClick={() =>
                navigate("/users/duplicateuser", {
                  state: user,
                })
              }
              className={styles.bttns}
            >
              {" "}
              <HiDocumentDuplicate className={styles.icon} color={"#00eeff"} />
            </a>
            <a
              onClick={() =>
                navigate("/users/editusers", {
                  state: user,
                })
              }
              className={styles.bttns}
            >
              {" "}
              <FiEdit2 className={styles.icon} color={"#00eeff"} />
            </a>
            <a
              onClick={() =>
                navigate(
                  `/singleusermeal/${user?.firstname + "-" + user?.lastname}`,
                  {
                    state: user._id,
                  }
                )
              }
              className={styles.bttns}
            >
              {" "}
              <MdFastfood className={styles.icon} color={"#00eeff"} />
            </a>
            <a
              onClick={() =>
                navigate(`/exercise/singleuserexercise`, {
                  state: user._id,
                })
              }
              className={styles.bttns}
            >
              {" "}
              <GiWeightLiftingUp className={styles.icon} color={"#00eeff"} />
            </a>
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
            dataSource={users}
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
export default AllUsers;
