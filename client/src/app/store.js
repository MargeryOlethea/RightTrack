import { configureStore } from "@reduxjs/toolkit";
import summaryReducer from "../features/summarySlice";
import spendingsReducer from "../features/spendingsSlice";
import spendingIdReducer from "../features/spendingIdSlice";
import categoriesReducer from "../features/categoriesSlice";
import goalReducer from "../features/goalSlice";

export default configureStore({
  reducer: {
    summary: summaryReducer,
    spendings: spendingsReducer,
    spendingId: spendingIdReducer,
    categories: categoriesReducer,
    goal: goalReducer,
  },
});
