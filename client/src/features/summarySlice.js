import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_API_URL;

const initialState = {
  summary: {},
  loading: false,
  error: "",
};

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    fetchSummaryPending(state) {
      state.loading = true;
      state.summary = {};
      state.error = "";
    },
    fetchSummaryResolved(state, action) {
      state.loading = false;
      state.summary = action.payload;
    },
    fetchSummaryRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSummaryPending,
  fetchSummaryRejected,
  fetchSummaryResolved,
} = summarySlice.actions;

export const fetchSummaryThunk =
  ({ date }) =>
  async (dispatch) => {
    try {
      dispatch(fetchSummaryPending());

      const { data } = await axios.get(`${url}/summary?date=${date}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      dispatch(fetchSummaryResolved(data));
    } catch (error) {
      dispatch(fetchSummaryRejected(error.message));
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

export default summarySlice.reducer;
