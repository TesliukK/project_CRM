import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IItem } from "../../interfaces";
import { itemService } from "../../services";

interface IState {
  items: IItem[],
  updateItem: IItem | null
}

const initialState: IState = {
  items: [],
  updateItem: null
};

const getAll = createAsyncThunk(
  "itemSlice/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await itemService.getAll();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const create = createAsyncThunk<IItem, { item: IItem }>(
  'itemSlice/create',
  async ({item}, {rejectWithValue}) => {
    try {
      const {data} = await itemService.create(item);
      return data
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data)
    }
  }
);

const update = createAsyncThunk<IItem, { id: string; item: Partial<IItem> }>(
  "itemSlice/update",
  async ({ id, item }, { rejectWithValue }) => {
    try {
      const { data } = await itemService.update(id, item);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

const remove = createAsyncThunk<void, string>(
  "itemSlice/remove",
  async (id, { dispatch,rejectWithValue }) => {
    try {
      await itemService.delete(id);
      dispatch(getAll());
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

const itemSlice = createSlice({
  name: 'itemSlice',
  initialState,
  reducers: {
    // setCarForUpdate: (state, action) => {
    //   state.updateItem = action.payload
    },
  extraReducers: builder =>
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        const {data} = action.payload;
        state.items = data
      })
      .addCase(create.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
});

const {reducer: itemReducer} = itemSlice;

const itemAction = {
  getAll,
  create,
  update,
  remove
};

export {
  itemReducer,
  itemAction
};