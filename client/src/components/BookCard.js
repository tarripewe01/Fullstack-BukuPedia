import {
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
} from "mdb-react-ui-kit";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BookCard = ({ imageFile, title, author, description, tags, _id }) => {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate(`/book/${_id}`);
  };

  return (
    <MDBCardGroup>
      <MDBCard
        className=" mt-5 d-sm-flex"
        style={{ maxWidth: "17rem", alignItems: "center" }}
      >
        <MDBCardImage
          onClick={handleOnclick}
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "60%", height: 250, marginTop: 10 }}
        />
        <div style={styles.author}>{author}</div>

        <MDBCardBody>
          <h6 className="text-center">{title}</h6>
          <span className="text-start tag-card">
            {tags.map((tag) => (
              <Link to={`/books/tag/${tag}`}>#{tag}</Link>
            ))}
          </span>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default BookCard;

const styles = {
  author: {
    textAlign: "center",
    marginBottom: -20,
    marginTop: 10,
  },
};
