import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";


export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkAPI) => {
    try {
      return await blogService.getBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

  export const getABlog = createAsyncThunk(
    "blog/get-blog",
    async (id, thunkAPI) => {
      try {
        return await blogService.getBlog(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };



  export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getBlogs.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getBlogs.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.blogs = action.payload;
        })
        .addCase(getBlogs.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        });
        builder.addCase(getABlog.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getABlog.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.currentBlog = action.payload;
        })
        .addCase(getABlog.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
    }
    });

    export default blogSlice.reducer;