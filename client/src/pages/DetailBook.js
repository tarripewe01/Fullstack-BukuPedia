import {
  MDBCard,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RelatedBooks } from "../components";
import { getBook, getBooksRelated } from "../redux/features/bookSlice";

const DetailBook = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { book, relatedBooks } = useSelector((state) => ({ ...state.book }));
  const tags = book?.tags;

  useEffect(() => {
    if (id) {
      dispatch(getBook(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    tags && dispatch(getBooksRelated(tags));
  }, [dispatch, tags]);

  return (
    <>
      <MDBContainer>
        <div
          className="d-flex align-items-start mb-3"
          style={{ marginTop: 200 }}
        >
          <MDBRow>
            <MDBCol>
              {" "}
              <MDBCardImage
                src={book?.imageFile}
                alt={book?.title}
                position="top"
                style={{ maxWidth: "100%", height: 650, marginTop: 10 }}
              />
              <p
                style={{
                  textAlign: "justify ",
                  textJustify: "newspaper",
                  color: "grey",
                }}
              >
                {moment(book?.createdAt).format("DD/MM/YYYY")}
              </p>
            </MDBCol>
            <MDBCol style={{ marginLeft: 20, textAlign: "start" }}>
              <h6 style={{ color: "grey" }}>{book?.author}</h6>
              <h3>{book?.title}</h3>

              <div style={{ marginTop: 50 }}>
                <h5>Book Description :</h5>
                <p style={{ textAlign: "justify ", textJustify: "newspaper" }}>
                  {book?.description}
                </p>
              </div>

              <div style={{ marginTop: 30 }}>
                <p
                  style={{
                    textAlign: "justify ",
                    textJustify: "newspaper",
                    marginBottom: -5,
                    fontWeight: "600",
                  }}
                >
                  Publisher :
                </p>
                <p
                  style={{
                    textAlign: "justify ",
                    textJustify: "newspaper",
                    marginBottom: -5,
                  }}
                >
                  {book?.publisher}
                </p>
              </div>
            </MDBCol>
            <MDBCol></MDBCol>
          </MDBRow>
        </div>
        <RelatedBooks relatedBooks={relatedBooks} bookId={id} />
      </MDBContainer>
    </>
  );
};

export default DetailBook;
