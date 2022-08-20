/* eslint-disable react-hooks/exhaustive-deps */
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookCard, Spinner } from "../components";
import { getBooks, searchBooks } from "../redux/features/bookSlice";
import { Colors } from "../utils/colors";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { books, loading } = useSelector((state) => ({ ...state.book }));

  const [search, setSearch] = useState("");
  // const [searchShow, setSearchShow] = useState(false);

  // const filteredBooks = books.filter((book) => {
  //   return book.author.toLowerCase().includes(search.toLowerCase());
  // });

  // const handleChange = (e) => {
  //   setSearch(e.target.value);
  //   if (e.target.value === "") {
  //     setSearchShow(false);
  //   } else {
  //     setSearchShow(true);
  //   }
  // };

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchBooks(search));
      navigate(`/books/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (searchShow) {
  //     navigate(`/books/search`);
  //   } else {
  //     navigate("/");
  //   }
  // };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={styles.container}>
      <form
        className="d-flex flex-row input-group w-auto mt-5"
        style={{ justifyContent: "center" }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search Book"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginTop: 20, height: 50, paddingLeft: 10, width: "50%" }}
        />
        <MDBBtn
          style={{
            height: 50,
            marginTop: 20,
            background: Colors.primary,
            textAlign: "center",
          }}
        >
          <MDBIcon fas icon="search" className="fa-2x" />
        </MDBBtn>
      </form>
      <MDBRow className="mt-3">
        {books.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Books Found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {books &&
                books.map((book, index) => <BookCard key={index} {...book} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;

const styles = {
  container: {
    margin: "auto",
    padding: 15,
    maxWidth: 1000,
    alignContent: "center",
  },
};
