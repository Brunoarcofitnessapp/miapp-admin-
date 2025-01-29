import React, { useRef, useState, useEffect } from "react";
import { Col, Progress, Row } from "antd";
import { CommonTextArea, CustomInput } from "../../components/Input";
import { TextDropDown } from "../../components/TextDD";
import { CommonButton } from "../../components/Buttons";
import { LayoutCard } from "../../components/Cards";
import { useForm } from "react-hook-form";
import { DatePicker, Space, Input, Radio, Checkbox } from "antd";
import { createTemplate, uploadvideo } from "../../api";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateTemplate = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const [loading, setloading] = useState(false);

  const onSubmit = async (body) => {
    createTemplate(setloading, body, toast, reset, navigate);
  };

  return (
    <LayoutCard>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={44}>
          <Col span={24} md={24} xs={24}>
            <CustomInput
              name="title"
              {...register("title", { required: "Template title is required" })}
              errors={errors}
              lableColor="black"
              lable="Titulo del Plantilla"
              placeholder="titulo del Plantilla"
            />
          </Col>
        </Row>
        <CommonButton
          htmlType="submit"
          title="Create Plantilla"
          style={{
            marginTop: 30,
            marginRight: "1rem",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
          loading={loading}
        />
      </form>
    </LayoutCard>
  );
};

export default CreateTemplate;
