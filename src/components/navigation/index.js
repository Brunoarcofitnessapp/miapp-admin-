import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import CreateUsers from "../../pages/user/CreateUsers";
import AllUsers from "../../pages/user/AllUsers";

// import CreateMeals from "../../pages/meals/CreateMeals";
// import AllMeals from "../../pages/meals/AllMeals";
// import EditMeal from "../../pages/meals/EditMeal";

import CreateExercise from "../../pages/exercise/CreateExercise";
import AllExercise from "../../pages/exercise/AllExercise";
import EditExercise from "../../pages/exercise/EditExercise";

import CreateIngredients from "../../pages/ingredients/CreateIngredients";
import AllIngredients from "../../pages/ingredients/AllIngredients";

import UploadVideo from "../../pages/video/UploadVideo";
import AllVideos from "../../pages/video/AllVideos";

import Emails from "../../pages/emails";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Privacy from "../../pages/privacy&policy";
import PageLayout from "../PageLayout";
import EditUser from "../../pages/user/EditUser";

import AllMeals from "../../pages/meals/CopyAllMeals";
import CreateMeals from "../../pages/meals/CopyCreateMeals";
import EditMeal from "../../pages/meals/CopyEditMeal";

import SingleUserMeal from "../../pages/meals/SingleUserMeal";
import AssignMacro from "../../pages/meals/AssignMacro";
import AssignReps from "../../pages/exercise/AssignReps";
import SingleUserExercise from "../../pages/exercise/SingleUserExercise";
import DuplicateUser from "../../pages/user/DuplicateUser";
import Allmacros from "../../pages/macros/AllMacros";
import CreateTemplate from "../../pages/template/createTemplate";
import AllSetsandReps from "../../pages/setsandreps/AllSetsandReps";
import AllTemplates from "../../pages/template/AllTemplates";
import Templatedetails from "../../pages/template/TemplatesDetails";
const token = localStorage.getItem("adminToken");

const AppRouting = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<HomeRoutes />} />

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

const HomeRoutes = () => {
  return (
    <PageLayout>
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        //user
        <Route exact path="/users/create" element={<CreateUsers />} />
        <Route exact path="/users/allusers" element={<AllUsers />} />
        <Route exact path="/users/editusers" element={<EditUser />} />
        <Route exact path="/users/duplicateuser" element={<DuplicateUser />} />
        {/* //meal */}
        {/* macros */}
        <Route exact path="/macros/allmacros" element={<Allmacros />} />
        {/* setsandreps */}
        <Route
          exact
          path="/setsandreps/allsetsandreps"
          element={<AllSetsandReps />}
        />
        {/* Templates */}
        <Route
          exact
          path="/template/createtemplate"
          element={<CreateTemplate />}
        />
        <Route exact path="/template/alltemplates" element={<AllTemplates />} />
        <Route
          exact
          path="/template/templatedetails"
          element={<Templatedetails />}
        />
        {/* //copy meals */}
        <Route exact path="/meal/create" element={<CreateMeals />} />
        <Route exact path="/meal/editmeals" element={<EditMeal />} />
        <Route
          exact
          path="/meal/allmeals"
          element={<AllMeals singleuser={false} />}
        />
        <Route
          exact
          path="/singleusermeal/:username"
          element={<SingleUserMeal singleuser={true} />}
        />
        <Route exact path="/meal/assignmacro" element={<AssignMacro />} />
        {/* //exercies */}
        <Route exact path="/exercise/create" element={<CreateExercise />} />
        <Route exact path="/exercise/allexercise" element={<AllExercise />} />
        <Route
          exact
          path="/exercise/singleuserexercise"
          element={<SingleUserExercise />}
        />
        <Route exact path="/exercise/editexercise" element={<EditExercise />} />
        <Route exact path="/exercise/assignreps" element={<AssignReps />} />
        {/* //ingredients */}
        <Route
          exact
          path="/ingredient/create"
          element={<CreateIngredients />}
        />
        <Route
          exact
          path="/ingredient/allingredients"
          element={<AllIngredients />}
        />
        {/* //Upload Video */}
        <Route exact path="/video/uploadvideo" element={<UploadVideo />} />
        <Route exact path="/video/allvideos" element={<AllVideos />} />
        <Route exact path="/emails" element={<Emails />} />
        <Route exact path="/privacy" element={<Privacy />} />
      </Routes>
    </PageLayout>
  );
};

export default AppRouting;
