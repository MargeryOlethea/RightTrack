import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_API_URL;

const initialState = {
  goal: {},
  loading: false,
  error: "",
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    fetchGoalPending(state) {
      state.loading = true;
      state.goal = {};
      state.error = "";
    },
    fetchGoalResolved(state, action) {
      state.loading = false;
      state.goal = action.payload;
    },
    fetchGoalRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchGoalPending, fetchGoalRejected, fetchGoalResolved } =
  goalSlice.actions;

export const fetchGoalThunk = () => async (dispatch) => {
  try {
    dispatch(fetchGoalPending());

    const { data } = await axios.get(`${url}/goal`, {
      headers: { Authorization: `Bearer ${localStorage.access_token}` },
    });

    dispatch(fetchGoalResolved(data));
  } catch (error) {
    dispatch(fetchGoalRejected(error.message));
    Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }
};

export default goalSlice.reducer;
