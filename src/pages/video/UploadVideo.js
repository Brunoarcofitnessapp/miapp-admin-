import React, { useRef, useState, useEffect } from "react";
import { Col, Progress, Row } from "antd";
import { CommonTextArea, CustomInput } from "../../components/Input";
import { TextDropDown } from "../../components/TextDD";
import { CommonButton } from "../../components/Buttons";
import { LayoutCard } from "../../components/Cards";
import { useForm } from "react-hook-form";
import { DatePicker, Space, Input, Radio, Checkbox } from "antd";
import { uploadvideo } from "../../api";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
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
  const [percentage, setpercentage] = useState(0);

  const onSubmit = async (body) => {
    if (body.video[0].size > 31457280) {
      toast.error("Video size should be less than 30MB");
      return;
    }
    const addData = {
      title: body.title,
      video: body.video[0],
      type: body.type,
    };
    const formdata = new FormData();
    formdata.append("video", addData.video);
    formdata.append("title", addData.title);
    formdata.append("type", addData.type);
    uploadvideo(setloading, setpercentage, percentage, formdata, toast, reset);
    // createIng(setloading,toast,formdata,reset)
  };

  return (
    <LayoutCard>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={44}>
          <Col span={12} md={12} xs={24}>
            <CustomInput
              name="title"
              {...register("title", { required: "Video title is required" })}
              errors={errors}
              lableColor="black"
              lable="Titulo del Video"
              placeholder="Titulo del Video"
            />

            <TextDropDown
              suffix
              placeholder="Seleccione la categoría de vídeo"
              style={{ marginTop: 15 }}
              name="type"
              lable="Seleccione la categoría de vídeo"
              setValue={setValue}
              options={[
                { value: "Cofre", key: "chest" },
                { value: "Abdominales", key: "abs" },
                { value: "Biceps", key: "biceps" },
                { value: "Triceps", key: "triceps" },
                { value: "Piernas", key: "legs" },
                { value: "Hombro", key: "shoulders" },
                { value: "atrás", key: "back" },
              ]}
              {...register("type", { required: "Video category is required" })}
              errors={errors}
            />
          </Col>
          <Col span={12} md={12} xs={24}>
            <CustomInput
              name="video"
              {...register("video", { required: "video is required" })}
              errors={errors}
              lableColor="black"
              type="file"
              accept="video/*"
              lable="Ejercicio Video"
              // placeholder="Type Phone"
            />
          </Col>
        </Row>
        {percentage === 0 ? (
          <CommonButton
            htmlType="submit"
            title="Subir Video"
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
        ) : (
          <Row style={{ marginTop: 25 }}>
            <Progress percent={percentage} />
          </Row>
        )}
      </form>
    </LayoutCard>
  );
};

export default UploadVideo;
