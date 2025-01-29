import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import { CommonTextArea, CustomInput } from "../../components/Input";
import { TextDropDown, TextDropDownMulti } from "../../components/TextDD";
import { CommonButton } from "../../components/Buttons";
import { LayoutCard } from "../../components/Cards";
import { useForm } from "react-hook-form";
import { DatePicker, Space, Input, Radio, Checkbox, Select } from "antd";
// import styles from "./input.module.scss";
import styles from "../../components/Input/input.module.scss";
import { BsFillCaretDownFill, BsXLg, BsSearch } from "react-icons/bs";
import { Toaster, toast } from "react-hot-toast";
import {
  getUserforMeals,
  createExercise,
  getVideos,
  editExercise,
} from "../../api";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getDifference, getSimpleDiff } from "../../assets/utilfunctions";

const EditExercise = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const location = useLocation();

  const [selectweeks, setselectweeks] = useState([]);
  //   const [selectUsers, setSelectUser] = useState(location.state ? location.state?.users : []);
  const [selectUsers, setSelectUser] = useState([]);
  const [selectdays, setselectdays] = useState([]);
  const [selectvideo, setselectvideo] = useState();

  const [allUsers, setAllUsers] = useState([]);
  const [allWeeks, setAllWeeks] = useState([]);
  const [allDays, setAllDays] = useState([]);
  const [videos, setvideos] = useState([]);
  const [singlevideo, setsinglevideo] = useState(location.state?.video);

  const [loading, setloading] = useState(false);
  const [exerciseloading, setexerciseloading] = useState(false);

  const [userIds, setuserIds] = useState([]);

  const [superset, setsuperset] = useState(location.state?.superset);

  // const [locationusers,setlocationusers] = useState(location.state ? location.state?.users : []);

  // useEffect(() => {
  //   getUserforMeals(setloading, toast, setusers, setingredients);
  // }, []);

  useEffect(() => {
    getVideos(setloading, setvideos, toast);
  }, []);

  const weeks = ["weekone", "weektwo", "weekthree", "weekfour"];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // useEffect(() => {
  //   if(users.length > 0){
  //    setSelectUser(getDifference(users,locationusers,setAllUsers,false,setuserIds))
  //   }
  // },[users])

  useEffect(() => {
    setselectdays(getSimpleDiff(days, location?.state.days, setAllDays));
  }, []);

  useEffect(() => {
    setselectweeks(getSimpleDiff(weeks, location?.state.weeks, setAllWeeks));
  }, []);

  useEffect(() => {
    const fields = ["exercisetype", "name", "repetitions"];
    fields.forEach((field) => {
      if (typeof field !== "string") {
        setValue(field, String(location.state[field]));
      } else {
        setValue(field, location.state[field]);
      }
    });
  }, []);

  // else if(field === 'repetitions'){
  //   setValue('conjuntoone', location.state.repetitions[0])
  //   setValue('conjuntotwo', location.state.repetitions[1])
  //   setValue('conjuntothree', location.state.repetitions[2])
  //   if(location.state.repetitions?.length > 3){
  //     setValue('conjuntofour', location.state.repetitions[3])
  //   }
  // }

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

  const onChangeRadio = (e, setstate) => {
    setstate(e.target.value);
  };

  const resetted = () => {
    reset();
    setAllWeeks([]);
    setAllDays([]);
    setsinglevideo(null);
    setsuperset(null);
  };

  const onSubmit = async (body) => {
    if (allDays.length == 0) {
      toast.error("Please select atleast one day");
      return;
    } else if (allWeeks.length == 0) {
      toast.error("Please select atleast one week");
      return;
    } else {
      const FinalData = {
        ...body,
        superset: superset,
        video: singlevideo?._id,
        days: JSON.stringify(allDays),
        weeks: JSON.stringify(allWeeks),
      };
      const formdata = new FormData();
      formdata.append("image", FinalData.image ? FinalData.image[0] : "");
      formdata.append("days", FinalData.days);
      formdata.append("weeks", FinalData.weeks);
      formdata.append("superset", FinalData.superset);
      formdata.append("video", FinalData.video);
      formdata.append("name", FinalData.name);
      formdata.append("exercisetype", FinalData.exercisetype);
      formdata.append("photo", location.state.image);
      editExercise(
        setexerciseloading,
        formdata,
        toast,
        resetted,
        location.state._id,
        navigate
      );
    }
  };

  const handledays = (i) => {
    let daysData = [];
    setselectdays(i);
    i.map((item) => daysData.push(days[item]));
    setAllDays(daysData);
  };

  const handleweeks = (i) => {
    let weekData = [];
    setselectweeks(i);
    i.map((item) => weekData.push(weeks[item]));
    setAllWeeks(weekData);
  };

  return (
    <LayoutCard>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={44}>
          <Col span={12} md={12} xs={24}>
            <CustomInput
              style={{ marginTop: 15 }}
              name="name"
              //   value={location.state.name}
              {...register("name", { required: "Name is required" })}
              errors={errors}
              lableColor="black"
              lable="nombre del Ejercicio"
              placeholder="nombre del Ejercicio"
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="exercisetype"
              {...register("exercisetype", {
                required: "Exercise Type is required",
              })}
              errors={errors}
              lableColor="black"
              lable="tipo de ejercicio"
              placeholder="tipo de ejercicio"
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="image"
              //   ref={register}
              {...register("image")}
              errors={errors}
              lableColor="black"
              lable="imagen de ejercicio"
              type="file"
              accept="image/*"
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
                Superconjunto
              </p>
              <Radio.Group
                onChange={(e) => onChangeRadio(e, setsuperset)}
                value={superset}
              >
                <Space direction="vertical">
                  <Radio name="Yes" value={true}>
                    Si
                  </Radio>
                  <Radio name="No" value={false}>
                    No
                  </Radio>
                </Space>
              </Radio.Group>
            </div>

            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Seleccionar vídeo de ejercicio
              </p>
              <Select
                placeholder="Seleccionar vídeo de ejercicio"
                value={selectvideo}
                onChange={(i) => setsinglevideo(videos[i])}
                bordered={true}
                showArrow={true}
                style={{ width: "100%" }}
              >
                {videos?.map((item, ind) => {
                  return (
                    <Select.Option key={ind} value={ind}>
                      {`${item.title}.${item.video?.slice(-3)}`}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>

            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Seleccionar días
              </p>
              <Select
                mode="multiple"
                placeholder="Seleccionar días"
                value={selectdays}
                onChange={handledays}
                bordered={true}
                showArrow={true}
                style={{ width: "100%" }}
              >
                {days.map((item, ind) => {
                  return (
                    <Select.Option key={ind} value={ind}>
                      {item}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Seleccionar semanas
              </p>
              <Select
                mode="multiple"
                placeholder="Seleccionar semanas"
                value={selectweeks}
                onChange={handleweeks}
                bordered={true}
                showArrow={true}
                style={{ width: "100%" }}
              >
                {weeks.map((item, ind) => {
                  return (
                    <Select.Option key={ind} value={ind}>
                      {item}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </Col>
          <Col span={12} md={12} xs={24}>
            {/* Users */}
            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 20,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Vista previa de vídeo
              </p>

              {singlevideo && (
                <div
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "var(--color-bg)",
                    borderRadius: 10,
                  }}
                >
                  <video
                    style={{ borderRadius: 10, marginTop: 2, marginBottom: 2 }}
                    width="100%"
                    height={500}
                    controls
                    src={singlevideo?.video}
                  />
                  <p
                    style={{
                      fontSize: 16,
                      color: "var(--color-primary)",
                      textAlign: "center",
                    }}
                  >
                    {singlevideo?.title}
                  </p>
                </div>
              )}
            </div>
            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 20,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Vista previa de imagen
              </p>

              <div
                style={{
                  borderRadius: 10,
                }}
              >
                <img
                  style={{
                    borderRadius: 10,
                    marginTop: 2,
                    marginBottom: 2,
                    objectFit: "contain",
                  }}
                  width={"100%"}
                  height={250}
                  src={location.state?.image}
                />
              </div>
            </div>
          </Col>
        </Row>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <CommonButton
            htmlType="submit"
            title="ejercicio de actualización"
            loading={exerciseloading}
            style={{
              marginTop: 30,
              marginRight: "1rem",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          />
        </div>
      </form>
    </LayoutCard>
  );
};
export default EditExercise;
