import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ItemDetails, ItemForm, SoldItem, SoldItems } from "./components";

import { Categories } from "./components/Categories/Categories";
import MainLayout from "./layouts/Main.layout";
import { ItemInfoPage, ItemPage, LoginPage, UserPage } from "./pages";

const App = () => {

  return (
    <div>
      <Routes>
        <Route path={'login'} element={<LoginPage/>}/>
        <Route index element={<Navigate to={'login'}/>}/>
        <Route path={'/'} element={<MainLayout/>}>
          <Route path={'items'} element= {<ItemPage/>}/>
          <Route path={"itemInfo"} element={<ItemInfoPage/>}/>
          <Route path={'itemForm'} element={<ItemForm/>}/>
          <Route path={'users'} element={<UserPage/>}/>
          <Route path={'categories'} element={<Categories/>}/>
          <Route path={'sold'} element={<SoldItems/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export {App};