// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { publicPost } from "../../utils";

// export const fetchUserData = createAsyncThunk(
//   "vendor login",
//   async (vendor, { rejectWithValue }) => {
//     try {
//       const response = await publicPost("/vendor/login", vendor);
//       return response.payload;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

// export const userLoginSlice = createSlice({
//   name: "userToken",
//   initialState: {
//     isLoading: false,
//     token: null,
//     error: null,
//     loginUser: null,
//     loginSuccess: false,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchUserData.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchUserData.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.token = action.payload.api_token.access;
//       state.loginUser = action.payload;
//       state.error = null;
//       state.loginSuccess = true;
//     });
//     builder.addCase(fetchUserData.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload.response.data.message;
//       state.loginSuccess = false;
//     });
//   },
//   reducers: {
//     logout: (state) => {
//       state.loginUser = null;
//       state.token = null;
//     },
//   },
// });
// export const { logout } = userLoginSlice.actions;
// export default userLoginSlice.reducer;
