import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./slices/category.slice";
import { itemReducer } from "./slices/item.slice";
import { userReducer } from "./slices/user.slice";

const rootReducer = combineReducers ({
  itemReducer,
  userReducer,
  categoryReducer
})

const setupStore = () => configureStore({
  reducer: rootReducer,
})

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore["dispatch"]

export type {
  RootState,
  AppDispatch,
  AppStore
}

export {
  setupStore
}