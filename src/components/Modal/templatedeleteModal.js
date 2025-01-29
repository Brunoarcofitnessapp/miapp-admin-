import React, { useState } from "react";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "../../components/Table/table.module.scss";
import { BsFillTrashFill } from "react-icons/bs";
import { deletetemplate } from "../../api";
import { toast, Toaster } from "react-hot-toast";

const TemplateDeleteModal = ({ id, users, setstate, state }) => {
  const { confirm } = Modal;

  const [loading, setloading] = useState(false);

  function showPromiseConfirm() {
    confirm({
      title: `¿Desea eliminar esta plantilla? Se eliminarán todos los usuarios dentro de esta plantilla.`,
      icon: <ExclamationCircleOutlined />,
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deletetemplate(setloading, id, users, state, setstate, toast);
      },
      onCancel() {},
    });
  }

  return (
    <>
      <Toaster position="top-right" />
      <a className={styles.bttns} onClick={() => showPromiseConfirm()}>
        {" "}
        <BsFillTrashFill className={styles.icon} />
      </a>
    </>
  );
};

export default TemplateDeleteModal;
