import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

export const getAllUsers = () => API.get("/user");

export const getBooks = () => API.get("/book");
export const createBook = (bookData) => API.post("/book", bookData);
export const getBook = (id) => API.get(`/book/${id}`);
export const updateBook = (updatedBookData, id) =>
  API.patch(`/book/${id}`, updatedBookData);
export const deleteBook = (id) => API.delete(`/book/${id}`);

export const getBooksBySearch = (searchQuery) =>
  API.get(`/book/search?searchQuery=${searchQuery}`);
export const getTagBooks = (tag) => API.get(`/book/tag/${tag}`);
export const getRelatedBooks = (tags) => API.post(`/book/relatedBooks`, tags);
