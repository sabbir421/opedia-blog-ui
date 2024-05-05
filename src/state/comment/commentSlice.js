import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateGet, privatePost } from "../../utils";

export const createComment = createAsyncThunk(
  "createBlog",
  async ({ token, data }) => {
    console.log(token,data);
    try {
      const response = await privatePost("/blog/comment", token, data);
      return response;
    } catch (err) {
      return { error: err.message };
    }
  }
);

export const getComment = createAsyncThunk(
    "get comment",
    async ({token,blogId}, { rejectWithValue }) => {
      try {
        const response = await privateGet(`/blog/comment/${blogId}`, token);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    isLoading: false,
    comments: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message;
      state.createSuccess = false;
    });
    builder.addCase(getComment.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(getComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload.data;
        state.error = null;
      });
      builder.addCase(getComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload?.message;
      });
  },
});
export default commentSlice.reducer;
