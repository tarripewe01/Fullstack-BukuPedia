/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer, Header, PrivateRoute } from "./components";
import {
  Home,
  Login,
  Register,
  AddEditBook,
  DetailBook,
  Dashboard,
  TagBooks,
} from "./pages";
import Chat from "./pages/Chat"
import ChatroomsPage from "./pages/Chatrooms";
import { setUser } from "./redux/features/authSlice";
import "./index.css";

function App() {
  const dispatch = useDispatch();
  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  // ambil data dari localstorage
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user)), setupSocket();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/search" element={<Home />} />
          <Route path="/books/tag/:tag" element={<TagBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addBook"
            element={
              <PrivateRoute>
                <AddEditBook />
              </PrivateRoute>
            }
          />
          <Route
            path="/editBook/:id"
            element={
              <PrivateRoute>
                <AddEditBook />
              </PrivateRoute>
            }
          />
          <Route path="/book/:id" element={<DetailBook />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/chatroom"
            element={
              <PrivateRoute>
                <ChatroomsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
