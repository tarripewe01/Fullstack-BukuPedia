import {
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
} from "mdb-react-ui-kit";
import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ imageFile, title, author, description, tags, _id }) => {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate(`/book/${_id}`);
  };
  //   const excerpt = (str) => {
  //     if (str.length > 45) {
  //       str = str.substring(0,45) + "...";
  //     }
  //     return str;
  //   };
  return (
    <MDBCardGroup>
      <MDBCard
        onClick={handleOnclick}
        className=" mt-5 d-sm-flex"
        style={{ maxWidth: "17rem", alignItems: "center" }}
      >
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "60%", height: 250, marginTop: 10 }}
        />
        <div style={styles.author}>{author}</div>
        
        <MDBCardBody>
          <h6 className="text-center">{title}</h6>
          {/* <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/book/${_id}`}>Read More ...</Link>
          </MDBCardText> */}
          {/* <span className="text-start tag-card">
          {tags.map((item) => item + ',')}
        </span> */}
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
