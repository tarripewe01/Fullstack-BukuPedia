/* eslint-disable react-hooks/exhaustive-deps */
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookCard, Spinner,  } from "../components";
import { getBooks } from "../redux/features/bookSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { books, loading } = useSelector((state) => ({ ...state.book }));

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={styles.container}>
      <MDBRow className="mt-5">
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
