import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";




// Register User Thunk
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData,thunkAPI) => {
        try {
            const response = await authService.register(userData);
            return response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
       
    }
);

// Login User Thunk
export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.login(userData);
            return response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (thunkAPI) => {
        try {
            const response = await authService.logout();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Get User Wishlist Thunk
export const getUserWishlist = createAsyncThunk("user/wishlist", async (thunkAPI) => {
    try {
        const response = await authService.getUserWishlist();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateUser = createAsyncThunk("user/update", async (userData, thunkAPI) => {
    try {
        const response = await authService.updateUser(userData);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const forgotPasswordToken = createAsyncThunk("user/forgot-password-token", async (userData, thunkAPI) => {
    try {
        const response = await authService.forgotPasswordToken(userData);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetPassword = createAsyncThunk("user/reset-password", async (data, thunkAPI) => {
    try {
        const response = await authService.resetPassword(data);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const getUserFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};

const initialState = {
    user:getUserFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // state.message = action.payload.message;
            state.user = action.payload;
            toast.success("User registered successfully");
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.response.data.message;
            toast.error("User registration failed: " + state.message);
        });
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // state.message = action.payload;
            
            toast.success("User logged in successfully");
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.response.data.message;
            toast.error("User login failed: " + state.message);
        });
        builder.addCase(getUserWishlist.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(getUserWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.wishlist = action.payload.wishlist;
            state.message = "Fetched wishlist";
        })
        .addCase(getUserWishlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }); 
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = {};
            localStorage.removeItem("user");
            toast.success("User logged out successfully");
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            toast.error("User logout failed: " + state.message);
        });
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            toast.success("User updated successfully");
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            toast.error("User update failed: " + state.message);
        });
        builder.addCase(forgotPasswordToken.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(forgotPasswordToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.refreshToken = action.payload;
            toast.success("Email sent successfully");
        })
        .addCase(forgotPasswordToken.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            toast.error("Password reset token failed: " + state.message);
        });
        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            // state.message = action.payload;
            state.pass = action.payload;
            toast.success("Password reset successfully");
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            toast.error("Password reset failed: " + state.message);
        });

    }
});

export default authSlice.reducer;