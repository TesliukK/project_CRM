import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IItem } from "../../interfaces";
import { itemService } from "../../services";

interface IState {
    items: IItem[];
    updateItem: IItem | null;
    page: number | null;
    totalPages: number | null;
    itemsCount: number | null;
    currentPage: number | null;
    selectedItem: IItem | null;
}

const initialState: IState = {
    items: [],
    updateItem: null,
    page: null,
    totalPages: null,
    currentPage: null,
    itemsCount: null,
    selectedItem: null,
};

interface IGetAllPayload {
    page: number;
    sortedBy: string;
    search: string;
}

const getAll = createAsyncThunk(
    "itemSlice/getAll",
    async ({ page, sortedBy, search }: IGetAllPayload, thunkAPI) => {
        try {
            const { data } = await itemService.getAll(page, sortedBy, search);
            const totalPages = data.totalPages;
            const itemsCount = data.itemsCount;
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

const create = createAsyncThunk<IItem, IItem>(
    "item/createItem",
    async (item, { rejectWithValue }) => {
        try {
            const { data } = await itemService.create(item);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
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

const remove = createAsyncThunk<void, { id: string; page: number; sortedBy: string; search: string }>(
    "itemSlice/remove",
    async ({ id, page, sortedBy, search }, { dispatch, rejectWithValue }) => {
        try {
            await itemService.delete(id);
            dispatch(getAll({ page, sortedBy, search }));
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const itemSlice = createSlice({
    name: "itemSlice",
    initialState,
    reducers: {
        setItemForUpdate: (state, action) => {
            state.updateItem = action.payload;
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const { data, page, totalPages, itemsCount } = action.payload;
                state.items = data;
                state.page = page;
                state.totalPages = totalPages;
                state.itemsCount = itemsCount;
                state.currentPage = page;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(update.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                const index = state.items.findIndex((item) => item._id === updatedItem._id);
                if (index !== -1) {
                    state.items[index] = updatedItem;
                }
            }),
});

const { reducer: itemReducer, actions: { setItemForUpdate, setSelectedItem } } = itemSlice;

const itemAction = {
    getAll,
    create,
    update,
    remove,
    setItemForUpdate,
    setSelectedItem,
};

export { itemReducer, itemAction };
