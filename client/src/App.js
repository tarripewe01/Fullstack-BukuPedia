/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components";
import { Home, Login, Register, AddEditBook, DetailBook, Dashboard } from "./pages";
import { setUser } from "./redux/features/authSlice";
import "./index.css";

function App() {
  const dispatch = useDispatch();

  // ambil data dari localstorage
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addBook" element={<AddEditBook />} />
          <Route path="/editBook/:id" element={<AddEditBook />} />
          <Route path="/book/:id" element={<DetailBook />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
