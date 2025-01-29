import React, { useState } from "react";
import { Modal, Button, Row, Col } from "antd";
import styles from "../../components/Table/table.module.scss";
import pen from "../../assets/icons/pen.svg";
import { useForm } from "react-hook-form";
import { CustomInput } from "../Input";
import { CommonButton } from "../Buttons";
import { useEffect } from "react";
import {
  asyncGetAllAdmins,
  asyncUpdateAdminsProfile,
} from "../../store/Users/UsersAsync";
import { useDispatch } from "react-redux";

const UpdateUser = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { _id: id, fullName, email, phone } = data;
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  useEffect(() => {
    setValue("fullName", fullName);
    setValue("email", email);
    setValue("phone", phone);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (body) => {
    const res = await dispatch(asyncUpdateAdminsProfile({ id, body })).unwrap();
    if (res.success) {
      setIsModalVisible(false);
      dispatch(asyncGetAllAdmins());
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <a className={styles.bttns} onClick={showModal}>
        <img src={pen} />
      </a>
      <Modal
        style={{ width: "80%" }}
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleOk)}>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <CustomInput
                name="fullName"
                {...register("fullName", { required: "Name is required" })}
                errors={errors}
                lableColor="white"
                lable="Name"
                placeholder="Type Name"
              />
            </Col>
            <Col span={12}>
              <CustomInput
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
                errors={errors}
                lableColor="white"
                lable="Email"
                placeholder="Type Email"
              />
            </Col>
            <Col span={24}>
              <CustomInput
                style={{ width: "50%" }}
                name="phone"
                {...register("phone", { required: "Phone is required" })}
                errors={errors}
                lableColor="white"
                lable="Phone"
                placeholder="Type Phone"
              />
            </Col>
            <Col span={24}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <CommonButton
                  htmlType="submit"
                  title="Update"
                  style={{ marginTop: 30, marginRight: "1rem" }}
                />
                <CommonButton
                  title="Cancel"
                  onClick={handleCancel}
                  style={{ marginTop: 30 }}
                />
              </div>
            </Col>
          </Row>
        </form>
      </Modal>
    </>
  );
};

export default UpdateUser;
