import React from "react";
import { Col, Row, Select, Table, Checkbox, Button, Collapse } from "antd";
import styles from "../../components/Table/table.module.scss";
import { GetColumnSearchProps } from "../../components/Table/search";
import ShowModal from "../../components/Modal/index";
import { useEffect, useState } from "react";
import {
  getAllTemplateswithpagination,
  getSingleTemplateDetails,
} from "../../api";
import { useAdmin } from "../../context/userContext";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TemplateDeleteModal from "../../components/Modal/templatedeleteModal";
import { BsFillTrashFill } from "react-icons/bs";
import TemplateMealandExerciseremoveModal from "../../components/Modal/mealorexerciseremovetemplatemodal";

const ExpandedRowRender = ({ data, state, setstate }) => {
  const [loading, setloading] = useState(true);
  const [singletemplate, setsingletemplate] = useState(null);

  //   const {singleuser,setsingleuser} = useAdmin();

  useEffect(() => {
    getSingleTemplateDetails(setloading, data._id, toast, setsingletemplate);
  }, []);

  const { Panel } = Collapse;

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
          {/* <Row className={styles.row}> */}
          <Collapse accordion className={styles.collapse}>
            <Panel header="Plantilla Meals" showArrow={false} key="1">
              <div className={styles.tablerowhead}>
                <p>Nombre de la comida</p>
                <div className={styles.tablemacros}>
                  <p></p>
                  <p>Proteínas</p>
                  <p>Grasas</p>
                  <p>Carbs</p>
                  <p>calorías</p>
                </div>
              </div>
              {singletemplate?.meals?.map((meal, i) => {
                return (
                  <div className={styles.tablerow} key={i}>
                    <p>{meal?.meal}</p>
                    <div className={styles.tablemacros}>
                      <div className={styles.action_bttns}>
                        <TemplateMealandExerciseremoveModal
                          id={data?._id}
                          mealId={meal?._id}
                          exerciseId={null}
                          setstate={setstate}
                          state={state}
                          users={singletemplate?.users}
                        />
                      </div>
                      <p>{meal?.proteins}</p>
                      <p>{meal?.fats}</p>
                      <p>{meal?.carbs}</p>
                      <p>{meal?.calories}</p>
                    </div>
                  </div>
                );
              })}
            </Panel>
            <Panel header="Plantilla Exercises" showArrow={false} key="2">
              <div className={styles.tablerowhead}>
                <p>nombre del ejercicio</p>
                <div className={styles.tablemacros}>
                  <p style={{ width: "100%", marginRight: "6.5rem" }}>
                    Repeticiones
                  </p>
                </div>
              </div>
              {singletemplate?.exercises?.map((exe) => {
                return (
                  <div className={styles.tablerow}>
                    <p>{exe?.exercise}</p>
                    <div className={styles.tablemacros}>
                      <div className={styles.action_bttns}>
                        <TemplateMealandExerciseremoveModal
                          id={data?._id}
                          mealId={null}
                          exerciseId={exe?._id}
                          setstate={setstate}
                          state={state}
                          users={singletemplate?.users}
                        />
                      </div>
                      {exe?.exercisereps.map((r) => (
                        <p>{r}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </Panel>
            <Panel header="Plantilla usuarios" showArrow={false} key="3">
              <div className={styles.tablerowhead}>
                <p>nombre de usuario</p>
                <div className={styles.tablemacros}>
                  <p style={{ width: "100%" }}>Email</p>
                </div>
              </div>
              {singletemplate?.users?.map((user) => {
                return (
                  <div className={styles.tablerow}>
                    <p>
                      {user?.firstname} {user?.lastname}
                    </p>
                    <div className={styles.tablemacros}>
                      <p style={{ width: "100%" }}>{user.email}</p>
                    </div>
                  </div>
                );
              })}
            </Panel>
          </Collapse>
          {/* </Row> */}
        </>
      )}
    </div>
  );
};

const Templatedetails = () => {
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

  const { users, setusers, templates, settemplates } = useAdmin();

  const [fetchagain, setfetchagain] = useState(false);

  useEffect(() => {
    getAllTemplateswithpagination(
      pagination,
      setloading,
      settemplates,
      setPagination,
      toast
    );
  }, [fetchagain]);

  const handleTableChange = (newPagination, filters, sorter) => {
    getAllTemplateswithpagination(
      newPagination,
      setloading,
      settemplates,
      setPagination,
      toast
    );
  };

  const [userIds, setuserIds] = useState([]);

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
      title: "Nombre de Plantilla",
      dataIndex: "templatename",
      key: "templatename",
      render: (_, { title }) => title,
    },
    {
      title: "Acción",
      dataIndex: "",
      key: "x",
      width: "10%",
      render: (_, temp) => {
        console.log(temp, "users");
        return (
          <div className={styles.action_bttns}>
            <TemplateDeleteModal
              users={temp.users}
              id={temp._id}
              state={fetchagain}
              setstate={setfetchagain}
            />
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
            expandIconColumnIndex={12}
            expandable={{
              expandedRowRender: (record) => (
                <ExpandedRowRender
                  data={record}
                  state={fetchagain}
                  setstate={setfetchagain}
                />
              ),
            }}
            dataSource={templates}
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
export default Templatedetails;
