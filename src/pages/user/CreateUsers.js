import React, { useRef, useState, useEffect } from "react";
import { Col, Row } from "antd";
import { CommonTextArea, CustomInput } from "../../components/Input";
import { TextDropDown } from "../../components/TextDD";
import { CommonButton } from "../../components/Buttons";
import { LayoutCard } from "../../components/Cards";
import { useForm } from "react-hook-form";
import { DatePicker, Space, Input, Radio, Checkbox } from "antd";
import { createUser } from "../../api";
import { Toaster, toast } from "react-hot-toast";
// import styles from "./input.module.scss";
// import styles from "../../../components/Input/input.module.scss";
import { useNavigate } from "react-router-dom";

const CreateUsers = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const [dob, setDob] = useState("");
  const [trainingPreference, settrainingPreference] = useState("");
  const [gender, setGender] = useState("");

  const [timesperweek, settimesperweek] = useState("");
  const [supplements, setsupplements] = useState("");
  const [loading, setloading] = useState(false);

  const ref = useRef();

  const options = [
    {
      label: "3 times per week",
      value: "3 times per week",
    },
    {
      label: "5 times per week",
      value: "5 times per week",
    },
  ];
  const optionstwo = [
    {
      label: "Yes",
      value: "Yes",
    },
    {
      label: "No",
      value: "No",
    },
  ];
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

  const resetting = () => {
    reset();
    settrainingPreference("");
    settimesperweek("");
    setsupplements("");
    setGender("");
  };

  const onSubmit = async (body) => {
    const addData = {
      ...body,
      dob,
      trainingPreference,
      gender,
      timesperweek,
      supplements,
    };

    if (
      !dob ||
      !trainingPreference ||
      !timesperweek ||
      !supplements ||
      !gender
    ) {
      alert("select your fields");
    } else {
      createUser(setloading, addData, toast, resetting);
    }
  };

  const onChangeDate = (date, dateString) => {
    setDob(dateString);
  };

  const onChangeRadio = (e, setstate) => {
    setstate(e.target.value);
  };

  const onChangeCheckbox = (checkedValues) => {
    settimesperweek(checkedValues);
  };
  return (
    <LayoutCard>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={44}>
          <Col span={12} md={12} xs={24}>
            <CustomInput
              name="firstname"
              {...register("firstname", { required: "First Name is required" })}
              errors={errors}
              lableColor="black"
              lable="Primer nombre"
              placeholder="Type Primer nombre              "
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="phone"
              {...register("phone", { required: "Phone is required" })}
              errors={errors}
              lableColor="black"
              lable="Teléfono"
              placeholder="Type Teléfono"
              type={"number"}
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="password"
              {...register("password", { required: "password is required" })}
              errors={errors}
              lableColor="black"
              lable="Clave"
              placeholder="Clave"
              type="password"
              // type="password"
            />

            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Fecha de nacimiento
              </p>
              <DatePicker
                ref={ref}
                style={{
                  height: 50,
                  backgroundColor: "#EEEEEE",
                  borderRadius: 5,
                  width: "100%",
                  border: "unset",
                  outline: "unset",
                  padding: "0px 14px",
                  fontSize: 14,
                  color: "var( --color-text-dark)",
                  fontFamily: "poppins-500",
                }}
                //   style={{ backgroundColor: "grey" }}
                name="Date of birth"
                placeholder="Fecha de nacimiento"
                //   {...register("age", { required: "Age is required" })}
                //   errors={errors}
                onChange={onChangeDate}
              />
            </div>

            <CustomInput
              style={{ marginTop: 15 }}
              name="height"
              {...register("height", { required: "Height is required" })}
              errors={errors}
              lableColor="black"
              lable="Altura (Cm)"
              placeholder="Altura"
              type={"number"}
            />
            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Quiero entrenar en:
              </p>
              <Radio.Group
                onChange={(e) => onChangeRadio(e, settrainingPreference)}
                value={trainingPreference}
              >
                <Space direction="vertical">
                  <Radio name="Gym" value={"gym"}>
                    Gimnasia
                  </Radio>
                  <Radio name="House" value={"house"}>
                    Casa
                  </Radio>
                </Space>
              </Radio.Group>
            </div>

            <CustomInput
              style={{ marginTop: 15 }}
              name="hateaboutfoods"
              {...register("hateaboutfoods", {
                required: "I hate the following foods is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Odio todos los siguientes alimentos"
              placeholder="Odio todos los siguientes alimentos"
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="injuries"
              {...register("injuries", {
                required: "Injuries, illnesses, etc is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Lesiones, enfermedades, etc. "
              placeholder="Lesiones, enfermedades, etc."
            />

            {/* <CustomInput
              style={{ marginTop: 15 }}
              name="elementsinHome"
              {...register("elementsinHome", {
                required: "Elements is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Describe qué elementos tienes en tu casa"
              placeholder="Describe qué elementos tienes en tu casa"
            /> */}

            {/* <CustomInput
              style={{ marginTop: 15 }}
              name="getupAt"
              {...register("getupAt", { required: "I get up is required" })}
              errors={errors}
              lableColor="black"
              lable="Me levanto a las"
              placeholder="Me levanto a las"
            />
            <CustomInput
              style={{ marginTop: 15 }}
              name="lunchAt"
              {...register("lunchAt", { required: "Lunch is required" })}
              errors={errors}
              lableColor="black"
              lable="Almuerzo en"
              placeholder="Almuerzo en"
            />
            <CustomInput
              style={{ marginTop: 15 }}
              name="dinnerAt"
              {...register("dinnerAt", { required: "Dinner is required" })}
              errors={errors}
              lableColor="black"
              lable="Cena en"
              placeholder="Cena en"
            />
            <CustomInput
              style={{ marginTop: 15 }}
              name="endworkAt"
              {...register("endworkAt", {
                required: "My working day is Finished is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Termino mi jornada laboral en"
              placeholder="Termino mi jornada laboral en "
            />
            
            
            {/* <CommonTextArea
              style={{ marginTop: 15 }}
              name="currentTraining"
              {...register("currentTraining", {
                required: "My current training is required",
              })}
              errors={errors}
              lable="Mi formación actual es"
              placeholder="Mi formación actual es"
              rows={6}
              cols={30}
              lableColor="black"
            /> */}
            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Seleccione género:
              </p>
              <Radio.Group
                onChange={(e) => onChangeRadio(e, setGender)}
                value={gender}
              >
                <Space direction="vertical">
                  <Radio name="male" value={"male"}>
                    Masculina
                  </Radio>
                  <Radio name="female" value={"female"}>
                    Femenina
                  </Radio>
                </Space>
              </Radio.Group>
            </div>

            <TextDropDown
              suffix
              placeholder="Comidas al día"
              style={{ marginTop: 15 }}
              name="mealsperday"
              lable="Comidas al día"
              setValue={setValue}
              options={[
                { value: "3 comidas", key: "3 meals" },
                { value: "4 comidas", key: "4 meals" },
                { value: "5 comidas", key: "5 meals" },
                { value: "6 comidas", key: "6 meals" },
              ]}
              {...register("mealsperday", {
                required: "Meals per Day is required",
              })}
              errors={errors}
            />

            <TextDropDown
              suffix
              placeholder="Nivel de Act.Física"
              style={{ marginTop: 15 }}
              name="physicslevel"
              lable="Nivel de Act.Física"
              setValue={setValue}
              options={[
                { value: "Principiante", key: "Beginner" },
                { value: "Intermedio", key: "Intermediate" },
                { value: "Avanzado", key: "Advanced" },
              ]}
              {...register("physicslevel", {
                required: "Physical Activity level is required",
              })}
              errors={errors}
            />
          </Col>
          <Col span={12} md={12} xs={24}>
            <CustomInput
              name="lastname"
              {...register("lastname", { required: "Last Name is required" })}
              errors={errors}
              lableColor="black"
              lable="Apellido"
              placeholder="Apellido"
            />
            <CustomInput
              style={{ marginTop: 15 }}
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              errors={errors}
              lableColor="black"
              lable="Email"
              placeholder="Type Email"
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="age"
              {...register("age", { required: "Age is required" })}
              errors={errors}
              lableColor="black"
              lable="Años"
              placeholder="Años"
              type={"number"}
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="weight"
              {...register("weight", { required: "Weight is required" })}
              errors={errors}
              lableColor="black"
              lable="Peso"
              placeholder="Peso"
              type={"number"}
            />
            <CustomInput
              style={{ marginTop: 15 }}
              name="residencePlace"
              {...register("residencePlace", {
                required: "Place of Residence is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Lugar de residencia"
              placeholder="Lugar de residencia"
            />

            <div style={{ marginTop: 15, marginBottom: 40 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                ¿Cuántas veces por semana?
              </p>
              <Radio.Group
                onChange={(e) => onChangeRadio(e, settimesperweek)}
                value={timesperweek}
              >
                <Space direction="vertical">
                  <Radio name="3 times per week" value={"3 times per week"}>
                    3 veces por semana
                  </Radio>
                  <Radio name="5 times a week" value={"5 times a week"}>
                    5 veces a la semana
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
            {/* 
            <CustomInput
              style={{ marginTop: 15 }}
              name="trainAt"
              {...register("trainAt", { required: "i can train is required" })}
              errors={errors}
              lableColor="black"
              lable="puedo entrenar en               "
              placeholder=" puedo entrenar en"
            />

             <CustomInput
              style={{ marginTop: 15 }}
              name="breakfastAt"
              {...register("breakfastAt", {
                required: "Breakfast is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Desayuno en"
              placeholder=" Desayuno en"
            />
            <CustomInput
              style={{ marginTop: 15 }}
              name="snackAt"
              {...register("snackAt", { required: "Snack is required" })}
              errors={errors}
              lableColor="black"
              lable="merienda en"
              placeholder=" merienda en"
            />
            <CustomInput
              style={{ marginTop: 15 }}
              name="startworkAt"
              {...register("startworkAt", {
                required: "Starting of Working day is required",
              })}
              errors={errors}
              lableColor="black"
              lable="empiezo mi jornada laboral en"
              placeholder=" empiezo mi jornada laboral en"
            /> */}
            <CustomInput
              style={{ marginTop: 15 }}
              name="intoleranceaboutfoods"
              {...register("intoleranceaboutfoods", {
                required: "intolerance to the following foods is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Tengo intolerancia a los siguientes alimentos"
              placeholder="Tengo intolerancia a los siguientes alimentos"
            />

            <div style={{ marginTop: 15, marginBottom: 40 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                me gustaria tomar suplementos
              </p>
              <Radio.Group
                onChange={(e) => onChangeRadio(e, setsupplements)}
                value={supplements}
              >
                <Space direction="vertical">
                  <Radio name="Yes" value={"yes"}>
                    Sí
                  </Radio>
                  <Radio name="No" value={"no"}>
                    No
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
            <CustomInput
              style={{ marginTop: 15 }}
              name="myGoal"
              {...register("myGoal", {
                required: "My goal is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Mi meta "
              placeholder="Mi meta"
            />
            <CustomInput
              style={{ marginTop: 15 }}
              name="medication"
              {...register("medication", {
                required: "Medication is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Medicamento "
              placeholder="Medicamento"
            />
            <CommonTextArea
              style={{ marginTop: 15 }}
              name="userroutinedetailstext"
              {...register("userroutinedetailstext", {
                required: "user routine details text is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Agregar texto de detalles de rutina de usuario (por administrador)"
              placeholder="Agregar texto de detalles de rutina de usuario (por administrador)"
              rows={6}
              cols={30}
            />
          </Col>
        </Row>
        <CommonButton
          htmlType="submit"
          title="Create User"
          style={{
            marginTop: 30,
            marginRight: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          loading={loading}
        />
      </form>
    </LayoutCard>
  );
};
export default CreateUsers;
