import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./slices/item.slice";

const rootReducer = combineReducers ({
  itemReducer
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