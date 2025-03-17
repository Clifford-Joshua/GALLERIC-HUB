import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  photos: [],
  perPage: 30,
  error: false,
  loading: false,
  query: "nature",
};

const pexelSlice = createSlice({
  name: "pexel",
  initialState,
  reducers: {
    setPage: (state) => {
      state.page += 1;
    },
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setPage, setPhotos, setError, setLoading, setQuery } =
  pexelSlice.actions;

export default pexelSlice.reducer;
