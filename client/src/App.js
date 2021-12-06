import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//components
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

//redux
import { loadUser } from "./store/auth-actions";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Alert />
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route
          element={
            isAuthenticated ? <CreateProfile /> : <Navigate to="/login" />
          }
          path="/create-profile"
        />
        <Route
          element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />}
          path="/edit-profile"
        />
        <Route
          element={
            isAuthenticated ? <AddExperience /> : <Navigate to="/login" />
          }
          path="/add-experience"
        />
        <Route
          element={
            isAuthenticated ? <AddEducation /> : <Navigate to="/login" />
          }
          path="/add-education"
        />
        <Route
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          path="/dashboard"
        />
        <Route
          element={isAuthenticated ? <Posts /> : <Navigate to="/login" />}
          path="/posts"
        />
        <Route
          element={isAuthenticated ? <Post /> : <Navigate to="/login" />}
          path="/post/:id"
        />
        <Route element={<Profiles />} path="/profiles" />
        <Route element={<Profile />} path="/profile/:id" />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem", marginTop: 60 }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
