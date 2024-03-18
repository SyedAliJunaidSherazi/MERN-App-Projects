import React from "react";
import { Routes, Route } from "react-router-dom";
import AddDepartment from "./components/admin/addDepartment/AddDepartment";
import AdminHome from "./components/admin/AdminHome";

import AdminProfile from "./components/admin/profile/Profile";
import AdminFirstTimePassword from "./components/admin/profile/update/firstTimePassword/FirstTimePassword";
import AdminPassword from "./components/admin/profile/update/password/Password";

import AdminUpdate from "./components/admin/profile/update/Update";
import AdminLogin from "./components/login/adminLogin/AdminLogin";
import AdminRegister from "./components/register/adminRegister/AdminRegister";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />

      {/* Admin  */}

      <Route path="/login/adminlogin" element={<AdminLogin />} />
      <Route path="/register/admin-register" element={<AdminRegister />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/update" element={<AdminUpdate />} />
      <Route path="/admin/update/password" element={<AdminPassword />} />
      <Route
        path="/admin/updatepassword"
        element={<AdminFirstTimePassword />}
      />
      <Route path="/admin/adddepartment" element={<AddDepartment />} />
    </Routes>
  );
};

export default App;
