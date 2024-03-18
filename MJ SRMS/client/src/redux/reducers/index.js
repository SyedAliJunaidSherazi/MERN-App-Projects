import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  admin: adminReducer,
  errors: errorReducer,
});
