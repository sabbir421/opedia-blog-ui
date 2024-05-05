
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicPost } from "../../utils";

export const signup = createAsyncThunk(
  "signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await publicPost("/auth/user/signup", userData);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchUserData = createAsyncThunk(
  "login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await publicPost("/auth/user/login", userData);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    data: null,
    status: null,
    error: null,
    signupSuccess: false,
    token: null,
    loginUser: null,
    loginSuccess: false,
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.data = action.payload;
      state.loginUser = action.payload;
      state.token = action.payload.data;

      state.error = null;
      state.signupSuccess = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.signupSuccess = false;
    });
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.token = action.payload.data.token;
      state.loginUser = action.payload.data.user;
      state.data = action.payload;
      state.error = null;
      state.loginSuccess = true;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message;
      state.status = "reject";
    });
  },
  reducers: {
   
    logout: (state) => {
      state.loginUser = null;
      state.token = null;
      state.loginSuccess = false;
      state.status = null;
      state.data=null
    },
  },
  
});

export const {logout } = authSlice.actions;
export default authSlice.reducer;
