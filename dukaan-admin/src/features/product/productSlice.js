import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

// Fetch all products
export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create a product
export const createProducts = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Fetch a single product by ID
export const getAProducts = createAsyncThunk(
  "product/get-single",
  async (productId, thunkAPI) => {
    try {
      return await productService.getAProduct(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const bulkUploadProducts = createAsyncThunk("product/bulk-upload", async (formData, thunkAPI) => {
  try {
      return await productService.bulkUploadProducts(formData)
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }
  })

  export const resetState = createAction("Reset_all")

  const initialState = {
  products: [],
  singleProduct: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  createdProduct: null,
  bulkUploadStatus: null,
  }


export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(getAProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleProduct = action.payload;
      })
      .addCase(getAProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(bulkUploadProducts.pending, (state) => {
        state.isLoading = true
        state.bulkUploadStatus = null
    })
    .addCase(bulkUploadProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.bulkUploadStatus = action.payload
    })
    .addCase(bulkUploadProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error.message
        state.bulkUploadStatus = null
    })
    .addCase(resetState, () => initialState)
  },
});

export default productSlice.reducer;
