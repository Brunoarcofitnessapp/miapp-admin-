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
import { getUserforMeals, createExercise, assignUserExercise } from "../../api";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { getDifference } from "../../assets/utilfunctions";

const AssignReps = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const [selectUsers, setSelectUser] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  //   const [allWeeks, setAllWeeks] = useState([]);
  //   const [allDays, setAllDays] = useState([]);

  const [loading, setloading] = useState(false);
  const [exerciseloading, setexerciseloading] = useState(false);

  const [users, setusers] = useState([]);
  const [userIds, setuserIds] = useState([]);
  const [ingredients, setingredients] = useState([]);
  const [locationusers, setlocationusers] = useState(
    location.state ? location.state?.users : []
  );

  useEffect(() => {
    getUserforMeals(setloading, toast, setusers, setingredients);
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setSelectUser(
        getDifference(users, locationusers, setAllUsers, false, setuserIds)
      );
    }
  }, [users]);

  useEffect(() => {
    if (location.state?.repetitions) {
      setValue("conjuntoone", location.state.repetitions[0]);
      setValue("conjuntotwo", location.state.repetitions[1]);
      setValue("conjuntothree", location.state.repetitions[2]);
      if (location.state.repetitions?.length > 3) {
        setValue("conjuntofour", location.state.repetitions[3]);
      }
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

  const resetted = () => {
    reset();
    setAllUsers([]);
    setuserIds([]);
  };

  const onSubmit = async (body) => {
    const FinalData = {
      users: JSON.stringify(userIds),
      repetitions:
        body?.conjuntofour !== ""
          ? JSON.stringify([
              +body.conjuntoone,
              +body.conjuntotwo,
              +body.conjuntothree,
              +body?.conjuntofour,
            ])
          : JSON.stringify([
              +body.conjuntoone,
              +body.conjuntotwo,
              +body.conjuntothree,
            ]),
      days: JSON.stringify(location?.state?.days),
      weeks: JSON.stringify(location?.state?.weeks),
      superset: location?.state?.superset,
      exercise: location?.state?.exercise
        ? location.state?.exercise?._id
        : location.state?._id,
      id: location.state?.repetitions ? location.state?._id : undefined,
    };
    assignUserExercise(
      setexerciseloading,
      FinalData,
      toast,
      resetted,
      navigate
    );
  };

  const filteredUsers = users?.filter((o) => !selectUsers.includes(o));

  const handleUsers = (i) => {
    let usersData = [];
    let userids = [];
    setSelectUser(i);
    i.map((item) => {
      usersData.push(users[item]);
      userids.push(users[item]._id);
    });
    setAllUsers(usersData);
    setuserIds(userids);
  };

  return (
    <LayoutCard>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={44}>
          <Col span={12} md={12} xs={24}>
            <div style={{ marginTop: 15 }}>
              <label
                style={{ fontSize: "14px", fontWeight: "bold", color: "black" }}
              >
                Repeticiones
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  gap: "8px",
                  marginTop: 10,
                }}
              >
                <CustomInput
                  name="conjuntoone"
                  {...register("conjuntoone", {
                    required: "conjunto 1 is required",
                  })}
                  errors={errors}
                  placeholder="Enter Conjunto 1"
                  type="number"
                />
                <CustomInput
                  name="conjuntotwo"
                  {...register("conjuntotwo", {
                    required: "conjunto 2 is required",
                  })}
                  errors={errors}
                  placeholder="Enter Conjunto 2"
                  type="number"
                />
                <CustomInput
                  name="conjuntothree"
                  {...register("conjuntothree", {
                    required: "conjunto 3 is required",
                  })}
                  errors={errors}
                  placeholder="Enter Conjunto 3"
                  type="number"
                />
                <CustomInput
                  name="conjuntofour"
                  {...register("conjuntofour")}
                  errors={errors}
                  placeholder="Enter Conjunto 4"
                  type="number"
                />
              </div>
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
                Seleccionar usuarios
              </p>
              <Select
                mode="multiple"
                placeholder="Seleccionar usuarios"
                value={selectUsers}
                onChange={handleUsers}
                bordered={true}
                showArrow={true}
                style={{ width: "100%" }}
              >
                {filteredUsers.map((item, ind) => {
                  return (
                    <Select.Option key={ind} value={ind}>
                      {item.firstname} {item.lastname}
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
                lista de usuarios
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 5,
                }}
              >
                {allUsers.map((item, ind) => {
                  return (
                    <div
                      style={{
                        border: "1px solid lightgrey",
                        marginTop: 5,
                        marginBottom: 5,
                        padding: "1px 4px",
                        borderRadius: 7,
                      }}
                    >
                      <div style={{ width: "90%", margin: 5 }}>
                        <p style={{ fontSize: 14 }}>
                          Nombre de usuario : {""}
                          <span
                            style={{
                              color: "green",
                              fontSize: 14,
                            }}
                          >
                            {item.firstname} {item.lastname}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
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
            title="Asignar"
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
export default AssignReps;
