import { api } from "./mainapi";

export const getAllUsersWithPagination = async (
  pagination,
  setloading,
  setusers,
  setpagination
) => {
  setloading(true);

  try {
    const { data } = await api.get(
      `/admin/users?page=${pagination.current}&limit=${pagination.pageSize}`
    );
    if (data) {
      setusers(data.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    setloading(false);
  }
};

export const createUser = async (setloading, body, toast, reset) => {
  setloading(true);

  try {
    const { data } = await api.post("/admin/createUser", body);
    if (data) {
      setloading(false);
      toast.success("User Has been created successfully");
      reset();
    }
  } catch (error) {
    setloading(false);
    toast.error(error.response.data.message);
  }
};

export const adminLogin = async (setloading, body, toast, reset) => {
  setloading(true);

  try {
    const { data } = await api.post("/admin/adminLogin", body);
    if (data) {
      setloading(false);
      toast.success("User Has been loggedin successfully");
      if (data?.token) {
        localStorage.setItem("adminToken", data?.token);
      }

      reset();
    }
  } catch (error) {
    setloading(false);
    toast.error(error.response.data.message);
  }
};

export const getSingleUserDetails = async (
  setloading,
  id,
  toast,
  setsingleuser
) => {
  setloading(true);

  try {
    const { data } = await api.get(`/admin/getSingleUser/${id}`);
    if (data) {
      setloading(false);
      setsingleuser(data.data);
    }
  } catch (error) {
    setloading(false);
    toast.error(error.response.data.message);
  }
};

export const getUserforMeals = async (setloading, toast, setusers, setings) => {
  setloading(true);

  try {
    const { data } = await api.get(`/admin/getUsersAndingsformeal`);
    if (data) {
      setloading(false);
      setusers(data.data);
      setings(data.ings);
    }
  } catch (error) {
    setloading(false);
    toast.error(error.response.data.message);
  }
};
export const createIng = async (setloading, toast, body, reset) => {
  setloading(true);

  try {
    const { data } = await api.post(`/ings/createIngredient`, body);
    if (data) {
      setloading(false);
      toast.success("Ingredient Has been created successfully");
      reset();
    }
  } catch (error) {
    setloading(false);
    toast.error(error.response.data.message);
  }
};

export const getAllIngsWithPagination = async (
  pagination,
  setloading,
  setings,
  setpagination,
  toast
) => {
  setloading(true);

  try {
    const { data } = await api.get(
      `/ings/getAllIngredients?page=${pagination.current}&limit=${pagination.pageSize}`
    );
    if (data) {
      setings(data.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    toast.error(error.response.data.message);
    setloading(false);
  }
};

export const createMeal = async (setloading, body, toast, reset) => {
  setloading(true);

  try {
    const { data } = await api.post("/meal/createMeal", body);
    if (data) {
      setloading(false);
      toast.success("Meal Has been created successfully");
      reset();
    }
  } catch (error) {
    setloading(false);
    toast.error(error.response.data.message);
  }
};

export const uploadvideo = async (
  setloading,
  setpercentage,
  percentage,
  body,
  toast,
  reset
) => {
  setloading(true);

  const options = {
    onUploadProgress: (progressEvent) => {
      let percent = Math.floor(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (percentage < 100) {
        setpercentage(percent);
      }
    },
  };

  try {
    const { data } = await api.post("/video/uploadVideo", body, options);
    if (data) {
      setloading(false);
      setpercentage(100);
      toast.success("Video Has been uploaded successfully");
      setpercentage(0);
      reset();
    }
  } catch (error) {
    setloading(false);
    setpercentage(0);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getVideos = async (setloading, setvideos, toast) => {
  setloading(true);

  try {
    const { data } = await api.get("/video/getAllVideos");
    if (data) {
      setloading(false);
      setvideos(data.data);
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getAllMacroswithpagination = async (
  pagination,
  setloading,
  setmacros,
  setpagination,
  toast
) => {
  setloading(true);

  try {
    const { data } = await api.get(
      `/admin/macros?page=${pagination.current}&limit=${pagination.pageSize}`
    );
    if (data) {
      setmacros(data.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getAllMealswithpagination = async (
  pagination,
  setloading,
  setmeals,
  setpagination,
  toast
) => {
  setloading(true);

  try {
    const { data } = await api.get(
      `/admin/meals?page=${pagination.current}&limit=${pagination.pageSize}`
    );
    if (data) {
      setmeals(data.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getSearchedMealswithpagination = async (
  pagination,
  setloading,
  setmeals,
  setpagination,
  type,
  toast,
  search
) => {
  setloading(true);

  let engtype = "";
  search.toLowerCase() === "desayuno"
    ? (engtype = "breakfast")
    : search.toLowerCase() === "almuerza" || search.toLowerCase() === "almuerzo"
    ? (engtype = "lunch")
    : search.toLowerCase() === "cena"
    ? (engtype = "dinner")
    : search.toLowerCase() === "merienda"
    ? (engtype = "afternoonsnack")
    : search.toLowerCase() === "colacción 1"
    ? (engtype = "snack 1")
    : search.toLowerCase() === "colacción 2"
    ? (engtype = "snack 2")
    : (engtype = search.toLowerCase());

  const obj = {
    type: type,
    search: type === "type" ? engtype : search,
  };

  try {
    const { data } = await api.post(
      `/admin/searchmeals?page=${pagination.current}&limit=${pagination.pageSize}`,
      obj
    );
    if (data) {
      setmeals(data.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getAllSetsandRepswithpagination = async (
  pagination,
  setloading,
  setreps,
  setpagination,
  toast
) => {
  setloading(true);

  try {
    const { data } = await api.get(
      `/admin/setsandreps?page=${pagination.current}&limit=${pagination.pageSize}`
    );
    if (data) {
      setreps(data.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getSearchedSetsandRepswithpagination = async (
  pagination,
  setloading,
  setsetsandreps,
  setpagination,
  type,
  toast,
  search
) => {
  setloading(true);

  console.log(type, "type");

  const obj = {
    type: type,
    search: search,
  };

  try {
    const { data } = await api.post(
      `/setsandreps/searchsetsandreps?page=${pagination.current}&limit=${pagination.pageSize}`,
      obj
    );
    if (data) {
      setsetsandreps(data.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const createTemplate = async (
  setloading,
  body,
  toast,
  reset,
  navigate
) => {
  setloading(true);

  try {
    const { data } = await api.post("/template/createTemplate", body);
    if (data) {
      setloading(false);
      toast.success("Template Has been created successfully");
      reset();
      navigate(-1);
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getTemplateslist = async (setloading, setlist, toast) => {
  setloading(true);

  try {
    const { data } = await api.get("/template/getTemplateslist");
    if (data) {
      setloading(false);
      setlist(data.data);
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const addmealorexertotemplate = async (
  setloading,
  tempId,
  mealId,
  exerciseId,
  type,
  setvisible,
  toast
) => {
  setloading(true);
  const obj = {
    templateId: tempId,
    mealId: mealId,
    exerciseId: exerciseId,
    type: type,
  };

  try {
    const { data } = await api.put(
      `/template/addMealorExercisetoTemplate`,
      obj
    );
    if (data) {
      setloading(false);
      setvisible(false);
      toast.success("Meal or Exercise has been added successfully");
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const addUserstotemplate = async (setloading, users, id, toast) => {
  setloading(true);

  const obj = {
    templateId: id,
    users: JSON.stringify(users),
  };

  try {
    const { data } = await api.post(`/template/adduserstotemplate`, obj);
    if (data) {
      setloading(false);
      toast.success("Users has been added to template successfully");
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const removeUsersfromtemplate = async (setloading, users, id, toast) => {
  setloading(true);

  const obj = {
    templateId: id,
    users: JSON.stringify(users),
  };

  try {
    const { data } = await api.post(`/template/removeusersfromtemplate`, obj);
    if (data) {
      setloading(false);
      toast.success("Users has been removed from template successfully");
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getAllTemplateswithpagination = async (
  pagination,
  setloading,
  settemplates,
  setpagination,
  toast
) => {
  setloading(true);

  try {
    const { data } = await api.get(
      `/template?page=${pagination.current}&limit=${pagination.pageSize}&fields=_id,title,users`
    );
    if (data) {
      settemplates(data.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getSingleTemplateDetails = async (
  setloading,
  id,
  toast,
  setsingletemplate
) => {
  setloading(true);

  try {
    const { data } = await api.get(`/template/getTemplatesforDisplay/${id}`);
    if (data) {
      setloading(false);
      setsingletemplate(data.data);
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const deletetemplate = async (
  setloading,
  id,
  users,
  state,
  setstate,
  toast
) => {
  setloading(true);

  const obj = {
    templateId: id,
    users: JSON.stringify(users),
  };

  try {
    const { data } = await api.put(`/template/deleteTemplate`, obj);
    if (data) {
      setloading(false);
      toast.success("Template has been deleted successfully");
      setstate(!state);
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const deletemealandexercise = async (
  setloading,
  id,
  state,
  setstate,
  mealId,
  exerciseId,
  users,
  toast
) => {
  setloading(true);

  const obj = {
    templateId: id,
    mealId: mealId,
    exerciseId: exerciseId,
    users: JSON.stringify(users),
  };

  try {
    const { data } = await api.put(`/template/deletemealorexercise`, obj);
    if (data) {
      setloading(false);
      toast.success(
        mealId
          ? "Meal has been deleted from template successfully"
          : "Exercise has been deleted from template successfully"
      );
      window.location.reload();
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const createExercise = async (setloading, body, toast, reset) => {
  setloading(true);

  try {
    const { data } = await api.post("/exercise/createExercise", body);
    if (data) {
      setloading(false);
      toast.success("Exercise Has been created successfully");
      reset();
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const assignUserExercise = async (
  setloading,
  body,
  toast,
  reset,
  navigate
) => {
  setloading(true);

  try {
    const { data } = await api.post(`/setsandreps/assignuserexercise`, body);
    if (data) {
      setloading(false);
      reset();
      navigate(-1);
      toast.success("Sets And Reps Has been assigned to User Successfully");
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getAllExercisesWithPagination = async (
  pagination,
  setloading,
  setexercises,
  setpagination,
  toast
) => {
  setloading(true);

  try {
    const { data } = await api.get(
      `/exercise/getAllExercise?page=${pagination.current}&limit=${pagination.pageSize}`
    );
    if (data) {
      setexercises(data.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getSingleExerciseDetails = async (
  setloading,
  id,
  toast,
  setsingleexercise
) => {
  setloading(true);

  try {
    const { data } = await api.get(`/admin/getSingleExercise/${id}`);
    if (data) {
      setloading(false);
      setsingleexercise(data.data);
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getSingleMealsDetails = async (
  setloading,
  id,
  toast,
  setsinglemeals
) => {
  setloading(true);

  try {
    const { data } = await api.get(`/admin/getSingleMeal/${id}`);
    if (data) {
      setloading(false);
      setsinglemeals(data.data);
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

// export const getSingleMacro = async (setloading, id, toast, setsingleMacro) => {
//   // setloading(true);

//   try {
//     const { data } = await api.get(`/meal/getmacros/${id}`);
//     if (data) {
//       setloading(false);
//       setsingleMacro(data.data);
//     }
//   } catch (error) {
//     setloading(false);
//     if (error.response.data.message) {
//       toast.error(error.response.data.message);
//     } else {
//       toast.error("Something went wrong");
//     }
//   }
// };

export const deletedocument = async (
  setloading,
  id,
  toast,
  path,
  setstate,
  state,
  secondid
) => {
  setloading(true);
  try {
    let url =
      path === "removeuserfrommeal" || path === "removeuserfromexercise"
        ? `/admin/${path}/${id}/${secondid}`
        : `/admin/${path}/${id}`;

    const { data } = await api.delete(url);
    setloading(false);
    toast.success(
      path === "removeuserfrommeal"
        ? "User Has been removed from this meal"
        : path === "removeuserfrommeal"
        ? "User Has been removed from this Exercise"
        : "Document Has been deleted successfully"
    );
    setstate(!state);
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const editExercise = async (
  setloading,
  body,
  toast,
  reset,
  id,
  navigation
) => {
  setloading(true);

  try {
    const { data } = await api.post(`/admin/editexercise/${id}`, body);
    if (data) {
      setloading(false);
      toast.success("Exercise Has been updated successfully");
      navigation("/exercise/allexercise");
      reset();
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const editMeal = async (
  setloading,
  body,
  toast,
  reset,
  id,
  navigation
) => {
  setloading(true);

  try {
    const { data } = await api.post(`/admin/editmeal/${id}`, body);
    if (data) {
      setloading(false);
      toast.success("Meal Has been updated successfully");
      navigation("/meal/allmeals");
      reset();
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const assignMacro = async (
  setloading,
  body,
  toast,
  reset,
  id,
  navigation,
  check
) => {
  setloading(true);
  const macroData = { body, check };

  try {
    const { data } = await api.post(`/meal/createmacros/${id}`, macroData);
    if (data) {
      setloading(false);
      toast.success("Macros Has been assigned to users successfully");
      navigation(-1);
      reset();
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const deletevideo = async (
  setloading,
  id,
  publicid,
  fetchagain,
  setfetchagain,
  toast
) => {
  const obj = {
    publicid: publicid,
  };

  setloading(true);

  try {
    const { data } = await api.delete(`/admin/deletevideo/${id}/${publicid}`);
    setloading(false);
    toast.success("Video has been deleted successfully");
    setfetchagain(!fetchagain);
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const editUser = async (
  setloading,
  body,
  toast,
  reset,
  id,
  navigation
) => {
  setloading(true);

  try {
    const { data } = await api.post(`/admin/edituser/${id}`, body);
    if (data) {
      setloading(false);
      toast.success("User Has been updated successfully");
      navigation("/users/allusers");
      reset();
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

// export const getSingleUserMeals = async (setloading,id,toast,setmeals) => {

//   setloading(true);

//   try {
//     const { data } = await api.get(`/admin/getSingleUserMeals/${id}`);
//     if (data) {
//       setloading(false);
//       setmeals(data.data);
//     }
//   } catch (error) {
//     setloading(false);
//     if (error.response.data.message) {
//       toast.error(error.response.data.message);
//     } else {
//       toast.error("Something went wrong");
//     }
//   }
// }

export const getSingleUserMeals = async (
  pagination,
  setloading,
  setmeals,
  id,
  setpagination,
  toast
) => {
  setloading(true);

  try {
    const { data } = await api.get(
      `/admin/getUserMealsForAdmin/${id}?page=${pagination.current}&limit=${pagination.pageSize}`
    );
    if (data) {
      setmeals(data?.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getSingleUserExercises = async (
  pagination,
  setloading,
  setexercises,
  id,
  setpagination,
  toast
) => {
  setloading(true);

  try {
    const { data } = await api.get(
      `/admin/getUserExerciseForAdmin/${id}?page=${pagination.current}&limit=${pagination.pageSize}`
    );

    if (data) {
      setexercises(data.data);
      setloading(false);
      setpagination({
        ...pagination,
        total: data?.total,
      });
    }
  } catch (error) {
    setloading(false);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

// &fields=_id,mealname,mealtype,protein,fats,carbs,calories,users
