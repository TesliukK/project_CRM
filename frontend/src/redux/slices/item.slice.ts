import { createSlice } from "@reduxjs/toolkit";
import { IItem } from "../../interfaces";

interface IState {
  items: IItem[],

}

const initialState: IState = {
  items: []
};
const itemSlice =  createSlice({
  name: "itemSlice",
  initialState,
  reducers: {},
  extraReducers: builder => builder
});

const {reducer: itemReducer} = itemSlice;

const itemAction = {

};

export {
    itemReducer,
  itemAction
}