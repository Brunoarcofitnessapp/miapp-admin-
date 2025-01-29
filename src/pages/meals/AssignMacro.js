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
  createMeal,
  editMeal,
  assignMacro,
  getSingleMacro,
} from "../../api";
import { DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { getDifference, getSimpleDiff } from "../../assets/utilfunctions";

const AssignMacro = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const [selectIngredients, setSelectIngredients] = useState([]);
  const [selectUsers, setSelectUser] = useState([]);

  const [allIng, setAllIng] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allInst, setAllInst] = useState([]);

  const [loading, setloading] = useState(false);
  const [mealloading, setmealloading] = useState(false);

  const [users, setusers] = useState([]);
  const [userIds, setuserIds] = useState([]);
  const [ingredients, setingredients] = useState([]);

  const [selectdays, setselectdays] = useState([]);
  const [allDays, setAllDays] = useState([]);
  const [singleMacro, setsingleMacro] = useState([]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const location = useLocation();
  useEffect(() => {
    getUserforMeals(setloading, toast, setusers, setingredients);
  }, []);

  const [inst, setInst] = useState("");

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
  const onSubmit = async (body) => {
    // if (allInst.length == 0) {
    //   alert("add your Instruction");
    // }
    if (allIng.length == 0) {
      alert("add your Ingredients & Ingredients Value ");
    } else {
      const FinalData = {
        ...body,
        users: JSON.stringify(userIds),
        ingredients: JSON.stringify(allIng),
        dayname: JSON.stringify(location?.state?.meal?.dayname),
      };
      //   const formdata = new FormData();
      //   formdata.append("users", FinalData.users);
      //   formdata.append("ingredients", FinalData.ingredients);
      //   formdata.append("calories", Number(FinalData.calories));
      //   formdata.append("protein", Number(FinalData.protein));
      //   formdata.append("carbs", Number(FinalData.carbs));
      //   formdata.append("fats", Number(FinalData.fats));

      assignMacro(
        setmealloading,
        FinalData,
        toast,
        reset,
        location?.state?.meal?._id,
        navigate,
        location?.state?.single
      );
      //   reset();
    }
  };

  const filteredIngredients = ingredients.filter(
    (o) => !selectIngredients.includes(o)
  );
  const filteredUsers = users?.filter((o) => !selectUsers.includes(o));
  const handleIngredients = (i) => {
    let ingData = [];
    setSelectIngredients(i);
    i.map((item) => ingData.push(ingredients[item]));
    setAllIng(ingData);
  };

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

  const handleInstruction = () => {
    if (inst == "") {
      alert("type your instruction");
    } else {
      const all = [...allInst, inst];
      setAllInst(all);
      setInst("");
    }
  };

  const removeInst = (i) => {
    setAllInst(allInst.filter((x, ind) => ind != i));
  };
  // const handleIngValue = (item) => {
  //   Object.assign(item, { value: allIng });
  // };

  const handleInputChange = (ind, e) => {
    const newIngValue = [...allIng];
    newIngValue[ind][e.target.name] = Number(e.target.value);
    setAllIng(newIngValue);
    // const { name, value } = e.target;
    // const list = [...ingValue];
    // list[index][name] = value;
    // setIngValue(list);
  };

  const handledays = (i) => {
    let daysData = [];
    setselectdays(i);
    i.map((item) => daysData.push(days[item]));
    setAllDays(daysData);
  };
  useEffect(() => {
    if (users.length > 0) {
      setSelectUser(
        getDifference(
          users,
          location?.state?.meal?.users,
          setAllUsers,
          false,
          setuserIds
        )
      );
    }
  }, [users]);

  useEffect(() => {
    if (ingredients.length > 0) {
      setSelectIngredients(
        getDifference(
          ingredients,
          location?.state?.meal?.ingredients,
          setAllIng
        )
      );
    }
  }, [ingredients]);

  //   useEffect(() => {
  //     setselectdays(getSimpleDiff(days, location?.state.dayname, setAllDays));
  //   }, []);

  useEffect(() => {
    const fields = ["protein", "fats", "carbs", "calories"];
    fields.forEach((field) => {
      if (typeof field !== "string") {
        setValue(field, String(location?.state?.meal?.[field]));
      } else {
        setValue(field, location?.state?.meal?.[field]);
      }
    });
  }, []);

  // useEffect(() => {
  //   getSingleMacro(location?.state?._id)
  // })
  // useEffect(() => {
  //   getSingleMacro(setloading, location.state._id, toast, setsingleMacro);
  // }, []);
  return (
    <LayoutCard>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={44}>
          <Col span={12} md={12} xs={24}>
            {/* <TextDropDown
              suffix
              placeholder="Select Week Day"
              style={{ marginTop: 15 }}
              name="dayname"
              lable="Select Day"
              setValue={setValue}
              options={[
                { value: "Monday", key: "Monday" },
                { value: "Tuesday", key: "Tuesday" },
                { value: "Wednesday", key: "Wednesday" },
                { value: "Thursday", key: "Thursday" },
                { value: "Friday", key: "Friday" },
                { value: "Saturday", key: "Saturday" },
                { value: "Sunday", key: "Sunday" },
              ]}
              {...register("dayname", { required: "Day is required" })}
              errors={errors}
            /> */}

            <CustomInput
              style={{ marginTop: 15 }}
              name="fats"
              {...register("fats", { required: "Fats is required" })}
              errors={errors}
              lableColor="black"
              lable="Grasas"
              placeholder="Grasas"
              type={"number"}
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="calories"
              {...register("calories", { required: "Calories is required" })}
              errors={errors}
              lableColor="black"
              lable="Describir calorías"
              placeholder="Describir calorías"
              type={"number"}
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="protein"
              {...register("protein", { required: "Protein is required" })}
              errors={errors}
              lableColor="black"
              lable="Proteína"
              placeholder="Proteína"
              type={"number"}
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="carbs"
              {...register("carbs", { required: "Carbs is required" })}
              errors={errors}
              lableColor="black"
              lable="Carbohidratos"
              placeholder="Carbohidratos"
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
                Seleccionar usuarias
              </p>
              <Select
                mode="multiple"
                placeholder="Seleccionar usuarias"
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

            {/* <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Seleccionar ingredientes
              </p>
              <Select
                mode="multiple"
                placeholder="Seleccionar ingredientes"
                value={selectIngredients}
                onChange={handleIngredients}
                bordered={true}
                showArrow={true}
                style={{ width: "100%" }}
              >
                {filteredIngredients.map((item, ind) => {
                  return (
                    <Select.Option key={ind} value={ind}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </div> */}
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
                Lista de usuarios
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
                        // width: "70%",
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
            {/* Ingredidient */}
            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 20,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Lista de ingredientes
              </p>

              {allIng.map((item, ind) => {
                return (
                  <div
                    style={{
                      border: "1px solid lightgrey",
                      marginTop: 10,
                      marginBottom: 10,
                      padding: 10,
                      width: "70%",
                      borderRadius: 7,
                      // flexDirection: "row",
                      // display: "flex",
                      // justifyContent: "space-between",
                      // alignItems: "center",
                    }}
                  >
                    <div style={{ width: "90%", margin: 5 }}>
                      <p style={{ fontSize: 16 }}>
                        Nombre del ingrediente : {""}
                        <span
                          style={{
                            color: "green",
                            fontSize: 16,
                          }}
                        >
                          {item.name}
                        </span>
                      </p>
                      <p style={{ fontSize: 16, marginTop: 5 }}>
                        Unidad de ingrediente : {""}
                        <span
                          style={{
                            color: "green",
                            fontSize: 16,
                          }}
                        >
                          {item.unit}
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        margin: 5,
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: 16 }}>
                        Ingrese el valor del ingrediente en número :
                      </p>
                      <input
                        name="value"
                        required
                        value={item.value || ""}
                        type="number"
                        onChange={(e) => handleInputChange(ind, e)}
                        style={{
                          border: "1px solid lightgrey",
                          fontSize: 14,
                          width: "20%",
                          borderRadius: 7,
                          padding: 10,
                          marginTop: 5,
                          textAlign: "center",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
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
            title="Actualizar comida"
            loading={mealloading}
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
export default AssignMacro;
