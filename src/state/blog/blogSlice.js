import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formDataPatch, formDataPost, privateDelete, privateGet } from "../../utils";

export const getBlogs = createAsyncThunk(
  "get blog",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/blog/get", token);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const createBlog = createAsyncThunk(
  "createBlog",
  async ({ token, data }) => {
    try {
      const response = await formDataPost("/blog/create", data, token);
      return response;
    } catch (err) {
      return { error: err.message };
    }
  }
);
export const updateBlog = createAsyncThunk(
    "update blog",
    async ({ blogId, token, data }) => {
        console.log(blogId);
      try {
        const response = await formDataPatch(
          `/blog/update/${blogId}`,
          data,
          token
        );
        return response.data;
      } catch (err) {
        return { error: err.message };
      }
    }
  );
  export const deleteBlog = createAsyncThunk(
    "delete blog",
    async ({ blogId, token}) => {
        console.log(blogId);
      try {
        const response = await privateDelete(
          `/blog/delete/${blogId}`,
          token
        );
        return response.data;
      } catch (err) {
        return { error: err.message };
      }
    }
  );
export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    isLoading: false,
    blogs: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.error = null;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message;
    });

    builder.addCase(createBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message;
      state.createSuccess = false;
    });
    builder.addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      });
      builder.addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message ;
      });
    builder.addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      });
      builder.addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message ;
      });
  },
});
export default blogSlice.reducer;
