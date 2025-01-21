import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import { toast } from "react-toastify";

export const postQuery = createAsyncThunk(
    "contact/post",
    async (query, thunkAPI) => {
        try {
            return await contactService.postQuery(query);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAllQuery = createAsyncThunk(
    "contact/get",
    async (thunkAPI) => {
        try {
            return await contactService.getAllQuery();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    queries: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const contactSlice = createSlice({
    name: "contact",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(postQuery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postQuery.fulfilled, (state, action) => {
                state.currentQuery = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(postQuery.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAllQuery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllQuery.fulfilled, (state, action) => {
                state.queries = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success('We \'ll get back to you soon');
                
            })
            .addCase(getAllQuery.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                toast.error(action.error.message);
            });
    }
});

export default contactSlice.reducer;