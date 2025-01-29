import React, { useRef, useState, useEffect } from "react";
import { Col, Row } from "antd";
import { CommonTextArea, CustomInput } from "../../components/Input";
import { TextDropDown } from "../../components/TextDD";
import { CommonButton } from "../../components/Buttons";
import { LayoutCard } from "../../components/Cards";
import { useForm } from "react-hook-form";
import { DatePicker, Space, Input, Radio, Checkbox } from "antd";
import { createIng } from "../../api";
import { Toaster, toast } from "react-hot-toast";
// import styles from "./input.module.scss";
// import styles from "../../../components/Input/input.module.scss";
import { useNavigate } from "react-router-dom";

const CreateIngredients = () => {
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
    const addData = { name: body.name, unit: body.unit, image: body.image[0] };
    const formdata = new FormData();
    formdata.append("image", addData.image);
    formdata.append("name", addData.name);
    formdata.append("unit", addData.unit);
    createIng(setloading, toast, formdata, reset);
  };

  return (
    <LayoutCard>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={44}>
          <Col span={12} md={12} xs={24}>
            <CustomInput
              name="name"
              {...register("name", { required: "Ingredient Name is required" })}
              errors={errors}
              lableColor="black"
              lable="Nombre del ingrediente"
              placeholder="Nombre del ingrediente"
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="image"
              {...register("image", { required: "Image is required" })}
              errors={errors}
              lableColor="black"
              type="file"
              accept="image/*"
              lable="imagen de ingrediente"
              // placeholder="Type Phone"
            />
          </Col>
          <Col span={12} md={12} xs={24}>
            <CustomInput
              name="unit"
              // onChange={imageuploadchange}
              {...register("unit", { required: "Unit is required" })}
              errors={errors}
              lableColor="black"
              lable="Unidad de ingrediente (text)"
              placeholder="Unidad de ingrediente"
            />
          </Col>
        </Row>
        <CommonButton
          htmlType="submit"
          title="Crear ingrediente"
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
export default CreateIngredients;
