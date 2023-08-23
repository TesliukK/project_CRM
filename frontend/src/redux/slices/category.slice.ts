import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ICategory } from "../../interfaces";
import { categoryService } from "../../services";

interface IState {
  categories: ICategory[],
  updateCategory: ICategory | null
}

const initialState: IState = {
  categories: [],
  updateCategory: null
};

const getAll = createAsyncThunk(
  "categorySlice/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await categoryService.getAll();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const create = createAsyncThunk<ICategory, { category: ICategory }>(
  "categorySlice/create",
  async ({ category }, { rejectWithValue }) => {
    try {
      const { data } = await categoryService.create(category);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

const remove = createAsyncThunk<void, string>(
  "categorySlice/remove",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await categoryService.delete(id);
      dispatch(getAll());
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(create.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
});

const { reducer: categoryReducer } = categorySlice;

const categoryAction = {
  getAll,
  create,
  remove
};

export {
  categoryReducer,
  categoryAction
};