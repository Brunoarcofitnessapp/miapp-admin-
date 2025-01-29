import React, { useState } from "react";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "../../components/Table/table.module.scss";
import { BsFillTrashFill } from "react-icons/bs";
import { deletemealandexercise } from "../../api";
import { toast, Toaster } from "react-hot-toast";

const TemplateMealandExerciseremoveModal = ({
  id,
  mealId,
  exerciseId,
  setstate,
  state,
  users,
}) => {
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
        deletemealandexercise(
          setloading,
          id,
          state,
          setstate,
          mealId,
          exerciseId,
          users,
          toast
        );
      },
      onCancel() {},
    });
  }

  return (
    <>
      <a className={styles.bttns} onClick={() => showPromiseConfirm()}>
        {" "}
        <BsFillTrashFill className={styles.icon} />
      </a>
    </>
  );
};

export default TemplateMealandExerciseremoveModal;
