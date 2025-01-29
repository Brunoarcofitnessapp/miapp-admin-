import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { CommonTextArea, CustomInput } from "../../components/Input";
import { CommonButton } from "../../components/Buttons";
import { LayoutCard } from "../../components/Cards";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const Emails = () => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      let { email } = state;
      setValue("email", email);
    }
  }, [state]);
  const onSubmit = async (body) => {
    reset();
  };

  return (
    <LayoutCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[44, 24]}>
          <Col span={12} md={12} xs={24}>
            <CustomInput
              style={{ marginTop: 25 }}
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
          <Col span={12} md={12} xs={24}>
            <CustomInput
              style={{ marginTop: 25 }}
              name="subject"
              {...register("subject", { required: "subject is required" })}
              errors={errors}
              type="text"
              lableColor="white"
              lable="Enter Subject"
              placeholder="Type Subject"
            />
          </Col>
          <Col span={24} md={12} xs={24}>
            <CommonTextArea
              name="message"
              {...register("message", { required: "message is required" })}
              errors={errors}
              lable="Enter Message"
              placeholder="Message"
              rows={6}
              cols={30}
            />
          </Col>
        </Row>
        <CommonButton
          htmlType="submit"
          title="Submit"
          style={{ marginTop: 20 }}
        />
      </form>
    </LayoutCard>
  );
};
export default Emails;
