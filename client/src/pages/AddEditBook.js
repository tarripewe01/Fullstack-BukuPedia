/* eslint-disable no-unused-vars */
import ChipInput from "material-ui-chip-input";
import { MDBBtn, MDBCard, MDBCardBody, MDBValidation } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createBook, updatedBook } from "../redux/features/bookSlice";
import { Colors } from "../utils/colors";

const initialState = {
  title: "",
  description: "",
  tags: [],
  author: "",
  publisher: "",
};

const AddEditBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [bookData, setBooksData] = useState(initialState);
  const { title, description, tags, author, publisher } = bookData;

  const { error, loading, books } = useSelector((state) => ({ ...state.book }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if (id) {
      const onlyBook = books.find((book) => book._id === id);
      setBooksData({ ...onlyBook });
    }
  }, [books, id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags && author && publisher) {
      const updatedBookData = { ...bookData, nama: user?.result?.name };

      if (!id) {
        dispatch(createBook({ updatedBookData, navigate, toast }));
      } else {
        dispatch(updatedBook({ id, toast, updatedBookData, navigate }));
      }
      handleClear();
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setBooksData({ ...bookData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setBooksData({ ...bookData, tags: [...bookData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setBooksData({
      ...bookData,
      tags: bookData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = () => {
    setBooksData({
      title: "",
      description: "",
      tags: [],
      author: "",
      publisher: "",
    });
  };

  return (
    <div className="container" style={styles.container}>
      <MDBCard>
        <h4 style={{ marginTop: 30 }}>
          {id ? "Update a Book" : "Add New Book"}
        </h4>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="d-flex justify-content-start mb-2">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setBooksData({ ...bookData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-md-12 mb-2">
              <input
                placeholder="Enter Title"
                type="text"
                value={title}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid={true}
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12 mb-2">
              <textarea
                placeholder="Enter Description"
                type="description"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid={true}
                validation="Please provide description"
                style={{ height: 100 }}
              />
            </div>
            <div className="col-md-12 mb-2">
              <ChipInput
                value={tags}
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="col-md-12 mb-2">
              <input
                placeholder="Enter Author"
                type="text"
                value={author}
                name="author"
                onChange={onInputChange}
                className="form-control"
                required
                invalid={true}
                validation="Please provide author"
              />
            </div>
            <div className="col-md-12 mb-2">
              <input
                placeholder="Enter Publisher"
                type="publisher"
                value={publisher}
                name="publisher"
                onChange={onInputChange}
                className="form-control"
                required
                invalid={true}
                validation="Please provide publisher"
              />
            </div>
            {/* <div className="col-md-12 mb-2">
              <input
                placeholder="Enter ISBN"
                type="isbn"
                value={isbn}
                name="isbn"
                onChange={onInputChange}
                className="form-control"
                required
                invalid={true}
                validation="Please provide ISBN"
              />
            </div> */}
            <div className="col-12">
              <MDBBtn
                style={{ width: "100%", backgroundColor: Colors.primary }}
              >
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditBook;

const styles = {
  container: {
    margin: "auto",
    padding: "15px",
    maxWidth: "450px",
    alignContent: "center",
    marginTop: "100px",
  },
};
