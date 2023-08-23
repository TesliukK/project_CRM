import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IItem, IUser } from "../../interfaces";
import { userService } from "../../services";

interface IState {
  users: IUser[],
}

const initialState: IState = {
  users: []
};

const getAll = createAsyncThunk(
  "userSlice/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await userService.getAll();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const remove = createAsyncThunk<void, string>(
  "userSlice/remove",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await userService.delete(id);
      dispatch(getAll());
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.users = data;
      })
});

const { reducer: userReducer } = userSlice;

const userAction = {
  getAll,
  remove
};

export {
  userReducer,
  userAction
};