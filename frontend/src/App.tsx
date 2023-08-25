import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Categories } from "./components/Categories/Categories";
import MainLayout from "./layouts/Main.layout";
import { ItemPage, LoginPage, RegisterPage, UserPage } from "./pages";

const App = () => {

  return (
    <div>
      <Routes>
        <Route path={'login'} element={<LoginPage/>}/>
        <Route index element={<Navigate to={'login'}/>}/>
        <Route path={'/'} element={<MainLayout/>}>
          <Route path={'items'} element= {<ItemPage/>}/>
          <Route path={'users'} element={<UserPage/>}/>
          <Route path={'categories'} element={<Categories/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export {App};