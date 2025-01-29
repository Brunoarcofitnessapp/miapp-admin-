import React from "react";
import { Col, Row, Select, Table, Checkbox, Button } from "antd";
import styles from "../../components/Table/table.module.scss";
import envlp from "../../assets/icons/envlp.svg";
import { StatusDropDown } from "../../components/Input";
import { GetColumnSearchProps } from "../../components/Table/search";
import ShowModal from "../../components/Modal/index";
import { useEffect, useState } from "react";
import {
  addUserstotemplate,
  getAllUsersWithPagination,
  getSingleUserDetails,
  getTemplateslist,
  removeUsersfromtemplate,
} from "../../api";
import { useAdmin } from "../../context/userContext";
import { toast, Toaster } from "react-hot-toast";
import { CameraFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { MdFastfood } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { HiDocumentDuplicate } from "react-icons/hi";

const AllTemplates = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const [loading, setloading] = useState(false);
  const [addloading, setaddloading] = useState(false);
  const [removeloading, setremoveloading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [val, setval] = useState("");

  const [fetchagain, setfetchagain] = useState(false);

  const { users, setusers, list, setlist } = useAdmin();

  useEffect(() => {
    getTemplateslist(setloading, setlist, toast);
  }, []);

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

  const [userIds, setuserIds] = useState([]);

  const checkchange = (e) => {
    if (e.target.checked) {
      setuserIds([...userIds, e.target.value]);
    } else {
      setuserIds(userIds.filter((id) => id !== e.target.value));
    }
  };

  const add = () => {
    if (userIds.length === 0) {
      toast.error("Please select atleast one user");
      return;
    }
    if (val == "") {
      toast.error("Please select atleast one template");
      return;
    }
    addUserstotemplate(setaddloading, userIds, val, toast);
  };

  const remove = () => {
    if (userIds.length === 0) {
      toast.error("Please select atleast one user");
      return;
    }
    if (val == "") {
      toast.error("Please select atleast one template");
      return;
    }
    removeUsersfromtemplate(setremoveloading, userIds, val, toast);
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
      title: "Acción",
      dataIndex: "",
      key: "x",
      render: (_, user) => {
        return (
          // <div className={styles.action_bttns}>
          <>
            <Checkbox onChange={checkchange} value={user._id}>
              Select
            </Checkbox>
          </>
          // </div>
        );
      },
    },
  ];
  return (
    <>
      <Toaster position="top-right" />
      <Row className={styles.home_row}>
        <Col span={17}>
          <Select
            // mode="multiple"
            placeholder="Seleccione Plantilla"
            // value={selectdays}
            onChange={(value) => setval(value)}
            bordered={true}
            showArrow={true}
            style={{ width: "100%" }}
            size="large"
          >
            {list?.map((li, ind) => {
              return (
                <Select.Option key={ind} value={li?._id}>
                  {li?.title}
                </Select.Option>
              );
            })}
          </Select>
        </Col>
        <Col span={3} style={{ margin: "0px 15px" }}>
          <Button
            onClick={add}
            loading={addloading}
            size="large"
            style={{ width: "100%", backgroundColor: "#00eeff", color: "#fff" }}
          >
            Agregar usuarios
          </Button>
        </Col>

        <Col span={3}>
          <Button
            onClick={remove}
            loading={removeloading}
            size="large"
            style={{ width: "100%", backgroundColor: "#00eeff", color: "#fff" }}
          >
            Eliminar usuarios
          </Button>
        </Col>
      </Row>
      <Row className={styles.home_row}>
        <Col span={24}>
          <Table
            columns={columns}
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
export default AllTemplates;
