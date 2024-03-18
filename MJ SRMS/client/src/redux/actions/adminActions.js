import {
  ADMIN_LOGIN,
  UPDATE_ADMIN,
  ADD_ADMIN,
  ADD_DEPARTMENT,
  GET_ALL_FACULTY,
  GET_ALL_STUDENT,
  GET_ALL_ADMIN,
  GET_ALL_DEPARTMENT,
  SET_ERRORS,
  UPDATE_PASSWORD,
  GET_ALL_SUBJECT,
} from "../actionTypes";
import * as api from "../api";

export const adminSignIn = (formData, navigate) => async (dispatch) => {

  try {
    const { data }  = await api.adminSignIn(formData);
    console.log("I am fuking admin data: " , data);
    await dispatch({ type: ADMIN_LOGIN, data });
    console.log("data");
    if (data.result.passwordUpdated) navigate("/admin/home");
    else navigate("/admin/update/password");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.message });
  }
};

export const adminUpdatePassword = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.adminUpdatePassword(formData);
    dispatch({ type: UPDATE_PASSWORD, payload: true });
    alert("Password Updated");
    navigate("/admin/home");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllStudent = () => async (dispatch) => {
  try {
    const { data } = await api.getAllStudent();
    dispatch({ type: GET_ALL_STUDENT, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
export const getAllFaculty = () => async (dispatch) => {
  try {
    const { data } = await api.getAllFaculty();
    dispatch({ type: GET_ALL_FACULTY, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllAdmin = () => async (dispatch) => {
  try {
    const { data } = await api.getAllAdmin();
    dispatch({ type: GET_ALL_ADMIN, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllDepartment = () => async (dispatch) => {
  try {
    const { data } = await api.getAllDepartment();
    dispatch({ type: GET_ALL_DEPARTMENT, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllSubject = () => async (dispatch) => {
  try {
    const { data } = await api.getAllSubject();
    dispatch({ type: GET_ALL_SUBJECT, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateAdmin(formData);
    dispatch({ type: UPDATE_ADMIN, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addAdmin(formData);
    alert("Admin Added Successfully");
    dispatch({ type: ADD_ADMIN, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addDepartment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addDepartment(formData);
    alert("Department Added Successfully");
    dispatch({ type: ADD_DEPARTMENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

