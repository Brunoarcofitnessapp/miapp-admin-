import React, { useState } from "react";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "../../components/Table/table.module.scss";
import { BsFillTrashFill } from "react-icons/bs";
import { deletedocument } from "../../api";
import { toast, Toaster } from "react-hot-toast";

const ShowModal = ({ data }) => {
  const { confirm } = Modal;
  const { status, id, Model, path, state, setstate, secondid } = data;

  const [loading, setloading] = useState(false);

  function showPromiseConfirm(id) {
    confirm({
      title: `¿Quieres eliminar esto? ${Model}`,
      icon: <ExclamationCircleOutlined />,
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deletedocument(setloading, id, toast, path, setstate, state, secondid);
      },
      onCancel() {},
    });
  }

  return (
    <>
      {/* <Toaster position="top-right" /> */}
      <a className={styles.bttns} onClick={() => showPromiseConfirm(id)}>
        {" "}
        <BsFillTrashFill className={styles.icon} />
      </a>
    </>
  );
};

export default ShowModal;
