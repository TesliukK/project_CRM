import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IItem, ISoldItem } from "../../interfaces";
import { itemService, soldItemService } from "../../services";

interface IState {
  soldItems: ISoldItem[],
  page: number | null,
  totalPages: number| null,
  currentPage: number | null,
  selectedItem: IItem| null,
}

const initialState: IState = {
  soldItems: [],
  page: null,
  totalPages: null,
  currentPage: null,
  selectedItem: null,
};

interface IGetAllPayload {
  page: number;
}

const getAll = createAsyncThunk(
  "soldItemSlice/getAll",
  async ({ page }: IGetAllPayload, thunkAPI) => {
    try {
      const { data } = await soldItemService.getAll(page);
      const totalPages = data.totalPages;
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const create = createAsyncThunk<ISoldItem, { soldItem: ISoldItem }>(
  "soldItemSlice/create",
  async ({ soldItem }, { rejectWithValue }) => {
    try {
      const { data } = await soldItemService.create(soldItem);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

const remove = createAsyncThunk<void, string>(
  "soldItemSlice/remove",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await soldItemService.delete(id);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

const soldItemSlice = createSlice({
  name: "soldItemSlice",
  initialState,
  reducers: {
    // setSelectedCategory: (state, action) => {
    //   state.selectedCategory = action.payload;
    // },
  },
  extraReducers: builder =>
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        const { data, page, totalPages } = action.payload;
        state.soldItems = data;
        state.page = page;
        state.totalPages = totalPages;
        state.currentPage = page;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.soldItems.push(action.payload);
      })
});

const { reducer: soldItemReducer } = soldItemSlice;

const soldItemAction = {
  getAll,
  create,
  remove,
  // setSelectedCategory
};

export {
  soldItemReducer,
  soldItemAction
};