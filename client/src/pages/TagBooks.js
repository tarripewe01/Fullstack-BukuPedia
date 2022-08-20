import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByTag } from "../redux/features/bookSlice";
import { Spinner } from "../components";
import { excerpt } from "../utils/excerpt";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { Colors } from "../utils/colors";

const TagBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  const { tagBooks, loading } = useSelector((state) => ({ ...state.book }));

  useEffect(() => {
    if (tag) {
      dispatch(getBooksByTag(tag));
    }
  }, [dispatch, tag]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className="container"
      style={{
        marginTop: 100,
        // margin: "auto",
        // maxWidth: 900,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 200,
      }}
    >
      <h3 style={{ textTransform: "uppercase" }}> {tag} </h3>
      <hr />
      {tagBooks &&
        tagBooks.map((book) => (
          <MDBCardGroup
            style={{
              justifyContent: "center",
            }}
            key={book._id}
          >
            <MDBCard style={{ maxWidth: 600, marginTop: 5 }}>
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={book.imageFile}
                    alt={book.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md={8}>
                  <MDBCardBody className="text-start">
                    <MDBCardTitle>{book.title}</MDBCardTitle>
                    <MDBCardText>{book.author}</MDBCardText>
                    <MDBCardText>{excerpt(book.description, 200)}</MDBCardText>
                    <div style={{ float: "left", marginTop: -10 }}>
                      <MDBBtn
                        size="sm"
                        rounded
                        style={{ background: Colors.primary }}
                        onClick={() => navigate(`/book/${book._id}`)}
                      >
                        Read More
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default TagBooks;
