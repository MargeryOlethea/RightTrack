import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_API_URL;

const initialState = {
  spendingId: {},
  loading: false,
  error: "",
};

export const spendingIdSlice = createSlice({
  name: "spendingId",
  initialState,
  reducers: {
    fetchSpendingIdPending(state) {
      state.loading = true;
      state.spendingId = {};
      state.error = "";
    },
    fetchSpendingIdResolved(state, action) {
      state.loading = false;
      state.spendingId = action.payload;
    },
    fetchSpendingIdRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSpendingIdPending,
  fetchSpendingIdResolved,
  fetchSpendingIdRejected,
} = spendingIdSlice.actions;

export const fetchSpendingIdThunk =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch(fetchSpendingIdPending({ id }));

      const { data } = await axios.get(`${url}/userspendings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      dispatch(fetchSpendingIdResolved(data));
    } catch (error) {
      dispatch(fetchSpendingIdRejected(error.message));
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

export default spendingIdSlice.reducer;
