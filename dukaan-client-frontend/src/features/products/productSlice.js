import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";



export  const getAllProducts = createAsyncThunk(
    "product/get",
    async(data,thunkAPI)=>{
        try {
            return await productService.getProducts(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export  const getAProducts = createAsyncThunk(
    "product/get-single",
    async(productId,thunkAPI)=>{
        try {
            return await productService.getAProduct(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addToWishlist = createAsyncThunk("product/wishlist", async (productId,thunkAPI) => {
    try {
        const response = await productService.addToWishlist(productId);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const rateProduct = createAsyncThunk("product/rating", async (rating,thunkAPI) => {
    try {
        const response = await productService.rateTheProduct(rating);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToCart = createAsyncThunk("product/cart", async (item,thunkAPI) => {
    try {
        const response = await productService.addToCart(item);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getCart = createAsyncThunk("product/get-cart", async (thunkAPI) => {
    try {
        const response = await productService.getCart();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const removeProductFromCart = createAsyncThunk("product/remove-cart", async (productId,thunkAPI) => {
    try {
        const response = await productService.removeProductFromCart(productId);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateProductQuantity = createAsyncThunk("product/update-quantity", async (data,thunkAPI) => {
    try {
        const response = await productService.updateProductQuantity(data);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const emptyCart = createAsyncThunk("product/empty-cart", async (thunkAPI) => {
    try {
        const response = await productService.emptyCart();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createOrder = createAsyncThunk("product/create-order", async (order,thunkAPI) => {
    try {
        const response = await productService.createOrder(order);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getMyOrders = createAsyncThunk("product/get-myorders", async (order,thunkAPI) => {
    try {
        const response = await productService.getMyOrders();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    products:[],
    compareProduct:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const productSlice = createSlice({
    name:"product",
    initialState:initialState,
    reducers: {
        addProductToCompare: (state, action) => {
            const product = action.payload;
            
            // Check if the product is already in the compareProduct array
            const isAlreadyInCompare = state.compareProduct.some(item => item._id === product._id);

            if (!isAlreadyInCompare) {
                state.compareProduct.push(product);
            }
        },
        removeProductFromCompare: (state, action) => {
            const productId = action.payload;

            // Remove the product from the compareProduct array by filtering it out
            state.compareProduct = state.compareProduct.filter(item => item._id !== productId);
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllProducts.pending,(state)=>{
            state.isLoading = true; 
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // state.message = action.payload;
            
            // toast.success("Fetched Products Successfully");
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            toast.error("Couldnt Fetch Products " + state.message);
        });
        builder.addCase(addToWishlist.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(addToWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.addToWishlist = action.payload;
            state.message = "Product added to wishlist";

        })
        .addCase(addToWishlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
        builder
        .addCase(getAProducts.pending,(state)=>{
            state.isLoading = true; 
        })
        .addCase(getAProducts.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        })
        .addCase(getAProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            toast.error("Couldnt Fetch Single Product " + state.message);
        });
        builder.addCase(rateProduct.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(rateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.rateProduct = action.payload;
            state.message = "Product rated successfully";

        })
        .addCase(rateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(addToCart.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // state.cart = action.payload;
            state.message = "Product added to Cart";



        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
        builder.addCase(getCart.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(getCart.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.cart = action.payload;
            state.message = "Cart Fetched Succesfully";



        })
        .addCase(getCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
        builder.addCase(removeProductFromCart.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(removeProductFromCart.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // state.cart = action.payload;
            state.message = "Product removed from Cart";
        })
        .addCase(removeProductFromCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
        builder.addCase(updateProductQuantity.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(updateProductQuantity.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // state.cart = action.payload;
            state.message = "Product quantity updated in Cart";
        })
        .addCase(updateProductQuantity.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
        builder.addCase(emptyCart.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(emptyCart.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // state.cart = action.payload;
            state.message = "Cart is Now Empty";
        })
        .addCase(emptyCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
        builder.addCase(createOrder.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(createOrder.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "Order created Successfully";
            toast.success("Order created Successfully");
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
        builder.addCase(getMyOrders.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(getMyOrders.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "Order Fetched Successfully";
            state.orderState = action.payload;
        })
        .addCase(getMyOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });


    }
})

export const { addProductToCompare, removeProductFromCompare } = productSlice.actions;
export default productSlice.reducer;