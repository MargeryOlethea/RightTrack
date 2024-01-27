import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_API_URL;

const initialState = {
  spendings: {},
  loading: false,
  error: "",
};

export const spendingsSlice = createSlice({
  name: "spendings",
  initialState,
  reducers: {
    fetchSpendingsPending(state) {
      state.loading = true;
      state.spendings = {};
      state.error = "";
    },
    fetchSpendingsResolved(state, action) {
      state.loading = false;
      state.spendings = action.payload;
    },
    fetchSpendingsRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSpendingsPending,
  fetchSpendingsResolved,
  fetchSpendingsRejected,
} = spendingsSlice.actions;

export const fetchSpendingsThunk =
  ({ search, sort, filter, date }) =>
  async (dispatch) => {
    try {
      dispatch(fetchSpendingsPending());

      const { data } = await axios.get(
        `${url}/userspendings?sort=${sort}&search=${search}&filter=${filter}&date=${date}`,
        {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        },
      );

      dispatch(fetchSpendingsResolved(data));
    } catch (error) {
      dispatch(fetchSpendingsRejected(error.message));
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

export default spendingsSlice.reducer;
