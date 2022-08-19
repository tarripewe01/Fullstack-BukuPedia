/* eslint-disable react-hooks/exhaustive-deps */
import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletedBook, getBooks } from "../redux/features/bookSlice";
import { Colors } from "../utils/colors";
import { toast } from "react-toastify";

const BookManage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { books } = useSelector((state) => ({ ...state.book }));

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  const handleEdit = (id) => {
    navigate(`/editBook/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete this book ?"))
      dispatch(deletedBook({ id, toast }));
  };

  const excerpt = (str) => {
    if (str.length > 85) {
      str = str.substring(0, 85) + "...";
    }
    return str;
  };

  return (
    <>
      <MDBTable striped hover>
        {" "}
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Author</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Publisher</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {books &&
            books.map((book, idx) => {
              return (
                <>
                  <tr className="text-start">
                    <th scope="row">{idx + 1}</th>
                    <td>{book.author}</td>
                    <td>{book.title}</td>
                    <td>{excerpt(book.description)}</td>
                    <td>{book.publisher}</td>
                    <td>
                      <MDBRow>
                        <MDBCol>
                          <MDBBtn
                            style={{
                              width: 90,
                              marginBottom: 5,
                              backgroundColor: Colors.primary,
                            }}
                            onClick={() => navigate(`/editBook/${book._id}`)}
                          >
                            EDIT
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol>
                          <MDBBtn
                            onClick={() => handleDelete(book._id)}
                            style={{ backgroundColor: Colors.danger }}
                          >
                            DELETE
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </td>
                  </tr>
                </>
              );
            })}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default BookManage;
