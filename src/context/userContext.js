import { useContext, createContext, useState } from "react";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [users, setusers] = useState([]);
  const [singleuser, setsingleuser] = useState(null);
  const [ings, setings] = useState([]);
  const [videos, setvideos] = useState([]);
  const [meals, setmeals] = useState([]);
  const [exercises, setexercises] = useState([]);
  const [macros, setmacros] = useState([]);
  const [list, setlist] = useState([]);
  const [setsandreps, setsetsandreps] = useState([]);
  const [templates, settemplates] = useState([]);

  return (
    <AdminContext.Provider
      value={{
        users,
        setusers,
        singleuser,
        setsingleuser,
        ings,
        setings,
        videos,
        setvideos,
        meals,
        setmeals,
        exercises,
        setexercises,
        macros,
        setmacros,
        list,
        setlist,
        setsandreps,
        setsetsandreps,
        templates,
        settemplates,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
