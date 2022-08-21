/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../utils/colors";
import { useEffect } from "react";
import { deleteUser, getUsers } from "../redux/features/authSlice";
import { excerpt } from "../utils/excerpt";
import { toast } from "react-toastify";

const UserManage = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete this user ?"))
      dispatch(deleteUser({ id, toast }));
  };

  return (
    <>
      <MDBTable striped hover>
        {" "}
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {users &&
            users.map((user, idx) => {
              return (
                <>
                  <tr key={idx} className="text-center">
                    <th scope="row">{idx + 1}</th>
                    <td>_{excerpt(user._id, 15)}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <MDBRow>
                        {/* <MDBCol>
                          <MDBBtn
                            style={{
                              width: 90,
                              marginBottom: 5,
                              backgroundColor: Colors.softGreen,
                            }}
                          >
                            EDIT
                          </MDBBtn>
                        </MDBCol> */}
                        <MDBCol>
                          <MDBBtn
                            onClick={() => handleDelete(user._id)}
                            style={{ backgroundColor: Colors.softRed }}
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

export default UserManage;
