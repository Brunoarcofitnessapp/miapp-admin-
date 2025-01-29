import React, { useEffect, useState } from "react";
import { Modal, Button, Space, Select, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "../../components/Table/table.module.scss";
import { BsFillTrashFill } from "react-icons/bs";
import { toast, Toaster } from "react-hot-toast";
import { addmealorexertotemplate } from "../../api";
import { useAdmin } from "../../context/userContext";
import { AiFillFileAdd } from "react-icons/ai";

const ShowModal = ({ type, id }) => {
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [val, setval] = useState("");

  const { list } = useAdmin();

  return (
    <>
      <Toaster position="top-right" />
      <Modal
        title="Plantilla"
        centered
        visible={visible}
        confirmLoading={loading}
        onOk={() =>
          addmealorexertotemplate(
            setloading,
            val,
            type == "meal" ? id : null,
            type == "exercise" ? id : null,
            type,
            setVisible,
            toast
          )
        }
        onCancel={() => setVisible(false)}
        style={{ maxWidth: "500px" }}
      >
        <Select
          // mode="multiple"
          placeholder="Seleccione Plantilla"
          // value={selectdays}
          onChange={(value) => setval(value)}
          bordered={true}
          showArrow={true}
          style={{ width: "100%" }}
        >
          {list?.map((li, ind) => {
            return (
              <Select.Option key={ind} value={li?._id}>
                {li?.title}
              </Select.Option>
            );
          })}
        </Select>
      </Modal>

      <a className={styles.bttns} onClick={() => setVisible(true)}>
        <Tooltip title="Add to Plantilla" color={"#00e0ff"}>
          <AiFillFileAdd className={styles.icon} color={"#00eeff"} />
        </Tooltip>
      </a>
    </>
  );
};

export default ShowModal;
