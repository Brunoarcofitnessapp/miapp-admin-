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
import { getUserforMeals, createMeal, editMeal } from "../../api";
import { DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { getDifference, getSimpleDiff } from "../../assets/utilfunctions";

const EditMeal = () => {
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
    if (allInst.length == 0) {
      alert("add your Instruction");
    } else if (allUsers.length == 0) {
      alert("add your Users");
    } else if (allIng.length == 0) {
      alert("add your Ingredients & Ingredients Value ");
    } else {
      const FinalData = {
        ...body,
        instructions: JSON.stringify(allInst),
        users: JSON.stringify(userIds),
        ingredients: JSON.stringify(allIng),
        dayname: JSON.stringify(allDays),
      };
      const formdata = new FormData();
      formdata.append("image", FinalData.image ? FinalData.image[0] : "");
      formdata.append("dayname", FinalData.dayname);
      formdata.append("instructions", FinalData.instructions);
      formdata.append("users", FinalData.users);
      formdata.append("ingredients", FinalData.ingredients);
      formdata.append("mealname", FinalData.mealname);
      formdata.append("mealtype", FinalData.mealtype);
      formdata.append("time", FinalData.time);
      formdata.append("calories", Number(FinalData.calories));
      formdata.append("protein", Number(FinalData.protein));
      formdata.append("carbs", Number(FinalData.carbs));
      formdata.append("fats", Number(FinalData.fats));
      formdata.append("photo", location.state.photo);
      editMeal(
        setmealloading,
        formdata,
        toast,
        reset,
        location.state._id,
        navigate
      );
      // reset();
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
          location.state.users,
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
        getDifference(ingredients, location.state.ingredients, setAllIng)
      );
    }
  }, [ingredients]);

  useEffect(() => {
    setselectdays(getSimpleDiff(days, location?.state.dayname, setAllDays));
  }, []);

  useEffect(() => {
    const fields = [
      "mealname",
      "mealtype",
      "protein",
      "fats",
      "carbs",
      "calories",
      "time",
    ];
    fields.forEach((field) => {
      if (typeof field !== "string") {
        setValue(field, String(location.state[field]));
      } else {
        setValue(field, location.state[field]);
      }
    });
  }, []);

  useEffect(() => {
    setAllInst(location.state.instructions);
  }, []);

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

            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Seleccione Días
              </p>
              <Select
                mode="multiple"
                placeholder="Seleccione Días"
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

            <TextDropDown
              suffix
              placeholder="Seleccionar tipo de comida"
              style={{ marginTop: 15 }}
              name="mealtype"
              lable="Seleccionar tipo de comida"
              defaultValue={location.state.mealtype}
              //   value={location.state.mealtype}
              setValue={setValue}
              //   onChange={(e) => setValue("mealtype", e.target.value)}
              options={[
                { value: "Desayuno", key: "breakfast" },
                { value: "Almuerzo", key: "lunch" },
                { value: "Merienda", key: "afternoonsnack" },
                { value: "Cena", key: "dinner" },
                { value: "Colacción 1", key: "snack 1" },
                { value: "Colacción 2", key: "snack 2" },
              ]}
              {...register("mealtype", { required: "Meal Type is required" })}
              errors={errors}
            />

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
              name="mealname"
              {...register("mealname", { required: "Meal Name is required" })}
              errors={errors}
              lableColor="black"
              lable="Nombre de la comida"
              placeholder=" Nombre de la comida"
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
            <CustomInput
              style={{ marginTop: 15 }}
              name="time"
              {...register("time", {
                required: "Time is required",
              })}
              errors={errors}
              lableColor="black"
              lable="Hora de cocinar"
              placeholder="Hora de cocinar"
              type={"number"}
            />

            <CustomInput
              style={{ marginTop: 15 }}
              name="image"
              {...register("image")}
              errors={errors}
              accept="image/*"
              lableColor="black"
              lable="Imagen de comida"
              placeholder="Imagen de comida"
              type="file"
            />

            {/* <CommonTextArea
              style={{ marginTop: 15 }}
              name="currentTraining"
              {...register("currentTraining", {
                required: "My current training is required",
              })}
              errors={errors}
              lable="My current training is"
              placeholder="Type My current training is"
              rows={6}
              cols={30}
              lableColor="black"
            /> */}

            {/* <TextDropDownMulti
              mode={"multiple"}
              suffix
              placeholder="Select Meal Type"
              style={{ marginTop: 15 }}
              name="mealtype"
              lable="Select Meal Type"
              value={selectedItems}
              options={filteredOptions}
              {...register("mealtype", { required: "Meal Type is required" })}
              errors={errors}
              onChange={handle}
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
                Agregar instrucción
              </p>
              <div
                style={{
                  width: "100%",
                  border: "1px solid lightgrey",
                  borderRadius: 5,
                }}
              >
                <input
                  onChange={(e) => setInst(e.target.value)}
                  value={inst}
                  placeholder="Agregar instrucción"
                  style={{
                    width: "85%",
                    padding: 10,
                    borderRadius: 5,
                    border: "none",
                    outline: "none",
                  }}
                />
                {inst != "" ? (
                  <button
                    onClick={handleInstruction}
                    style={{
                      width: "10%",
                      outline: "none",
                      border: "none",
                      backgroundColor: "black",
                      borderRadius: 5,
                      color: "#FFF",
                    }}
                  >
                    agregar
                  </button>
                ) : null}
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

            <div style={{ marginTop: 15 }}>
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
            </div>
          </Col>
          <Col span={12} md={12} xs={24}>
            {/* Instructions */}
            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 20,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Lista de instrucciones
              </p>

              {allInst.map((item, ind) => {
                return (
                  <div
                    style={{
                      border: "1px solid lightgrey",
                      marginTop: 5,
                      marginBottom: 5,
                      padding: "2px 4px",
                      width: "70%",
                      borderRadius: 7,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      // margin: 5
                    }}
                  >
                    <div style={{ width: "90%", margin: 5 }}>
                      <p style={{ fontSize: 14 }}>
                        Inst : {""}
                        <span
                          style={{
                            color: "green",
                            fontSize: 14,
                          }}
                        >
                          {item}
                        </span>
                      </p>
                    </div>
                    <p onClick={() => removeInst(ind)} style={{ fontSize: 18 }}>
                      <DeleteOutlined style={{ color: "red" }} />
                    </p>
                  </div>
                );
              })}
            </div>

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
                        // required
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
            <div style={{ marginTop: 15 }}>
              <p
                style={{
                  fontSize: 20,
                  fontFamily: "poppins-500",
                  marginBottom: 10,
                  color: "var(--color-dark)",
                }}
              >
                Imagen de comida
              </p>

              <div>
                <img
                  style={{
                    width: "100%",
                    height: 250,
                    borderRadius: 10,
                    objectFit: "cover",
                  }}
                  src={location.state?.photo}
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
export default EditMeal;
