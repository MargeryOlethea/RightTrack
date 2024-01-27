import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_API_URL;

const initialState = {
  categories: {},
  loading: false,
  error: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategoriesPending(state) {
      state.loading = true;
      state.categories = {};
      state.error = "";
    },
    fetchCategoriesResolved(state, action) {
      state.loading = false;
      state.categories = action.payload.data;
    },
    fetchCategoriesRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesPending,
  fetchCategoriesRejected,
  fetchCategoriesResolved,
} = categoriesSlice.actions;

export const fetchCategoriesThunk = () => async (dispatch) => {
  try {
    dispatch(fetchCategoriesPending());

    const data = await axios.get(`${url}/categories`, {
      headers: { Authorization: `Bearer ${localStorage.access_token}` },
    });

    dispatch(fetchCategoriesResolved(data));
  } catch (error) {
    dispatch(fetchCategoriesRejected(error.message));
    Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }
};

export default categoriesSlice.reducer;
