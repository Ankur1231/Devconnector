import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

//components
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
