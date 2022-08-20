/* eslint-disable array-callback-return */
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utils/excerpt";

const RelatedBooks = ({ relatedBooks, bookId }) => {
  return (
    <>
      {relatedBooks && relatedBooks.length > 0 && (
        <>
          {relatedBooks.length > 1 && <h4>Related Books</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 mb-5 mt-5">
            {relatedBooks
              .filter((item) => item._id !== bookId)
              .splice(0, 3)
              .map((book) => (
                <>
                  <MDBCol>
                    <MDBCard>
                      <Link to={`/book/${book._id}`}>
                        <MDBCardImage
                          src={book.imageFile}
                          alt={book.title}
                          position="top"
                          style={{ width: 200 }}
                        />
                      </Link>
                      <span className="text-start tag-card">
                        {book.tags.map((tag) => (
                          <Link to={`/books/tag/${tag}`}>#{tag}</Link>
                        ))}
                      </span>
                      <MDBCardBody className="text-start">
                        <MDBCardTitle>{book.title}</MDBCardTitle>
                        <MDBCardText>
                          {excerpt(book.description, 50)}
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </>
              ))}
          </MDBRow>
        </>
      )}
    </>
  );
};

export default RelatedBooks;
