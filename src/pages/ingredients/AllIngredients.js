import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "antd";
import styles from "../../components/Table/table.module.scss";
import envlp from "../../assets/icons/envlp.svg";
import { StatusDropDown } from "../../components/Input";
import { GetColumnSearchProps } from "../../components/Table/search";
import ShowModal from "../../components/Modal/index";
import { getAllIngsWithPagination } from "../../api";
import { useAdmin } from "../../context/userContext";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AllIngredients = () => {
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

  const { ings, setings } = useAdmin();

  useEffect(() => {
    getAllIngsWithPagination(
      pagination,
      setloading,
      setings,
      setPagination,
      toast
    );
  }, [fetchagain]);

  const handleTableChange = (newPagination, filters, sorter) => {
    getAllIngsWithPagination(
      newPagination,
      setloading,
      setings,
      setPagination,
      toast
    );
  };

  const columns = [
    {
      title: "Imagen",
      dataIndex: "id",
      key: "id",
      width: "40%",
      render: (_, { image }) => (
        <img
          style={{
            width: 70,
            height: 70,
            objectFit: "cover",
            borderRadius: 10,
            boxShadow: "0px 0px 2px #000",
          }}
          src={image}
          alt="ingredient"
        />
      ),
      ...GetColumnSearchProps("id"),
    },
    {
      title: "Nombre del ingrediente",
      dataIndex: "name",
      key: "name",
      width: "40%",
      render: (_, { name }) => name,
    },
    {
      title: "Unidad",
      dataIndex: "unit",
      key: "unit",
      width: "10%",
      render: (_, { unit }) => unit,
      ...GetColumnSearchProps("unit"),
    },

    {
      title: "Acción",
      dataIndex: "",
      key: "x",
      width: "10%",

      //   width: 100,
      render: (_, ing) => {
        return (
          <div className={styles.action_bttns}>
            <ShowModal
              data={{
                status: ing.status,
                id: ing._id,
                Model: "Ingredient",
                path: "deleteing",
                state: fetchagain,
                setstate: setfetchagain,
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <Row className={styles.home_row}>
      <Toaster position="top-right" />
      <Col span={24}>
        <Table
          columns={columns}
          expandIconColumnIndex={12}
          dataSource={ings}
          onChange={handleTableChange}
          loading={loading}
          pagination={pagination}
          rowKey={(record) => record._id}
        />
      </Col>
    </Row>
  );
};
export default AllIngredients;
