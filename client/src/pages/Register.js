import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBInput,
  MDBSpinner,
  MDBValidation,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { Colors } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState(initialState);
  const { name, email, password, confirmPassword } = formValue;

  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  //  Handle Toast Error
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password should match");
    }
    if (email && password && name && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <div style={styles.container}>
        <MDBCard alignment="center">
          <MDBIcon
            fas
            icon="user-circle"
            className="fa-5x"
            style={styles.iconUser}
          />
          <h5>Sign Up</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="col-md-12">
                <MDBInput
                  label="Full Name"
                  type="text"
                  name="name"
                  required
                  invalid="true"
                  validation="Please provide your Full Name"
                  value={name}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Email"
                  type="email"
                  name="email"
                  required
                  invalid="true"
                  validation="Please provide your email"
                  value={email}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Password"
                  type="password"
                  name="password"
                  required
                  invalid="true"
                  validation="Please provide your password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Confirm Password"
                  type="confirmPassword"
                  name="confirmPassword"
                  required
                  invalid="true"
                  validation="Please provide your confirm password"
                  value={confirmPassword}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <MDBBtn style={styles.btnLogin}>
                  {loading && (
                    <MDBSpinner
                      size="sm"
                      role="status"
                      tag="span"
                      className="me-2"
                    />
                  )}
                  R E G I S T E R
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <div style={styles.boxRegister}>
              <p>Already have an account ?</p>
              <Link to="/login" style={styles.textRegister}>
                Login here
              </Link>
            </div>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </>
  );
};

export default Register;

const styles = {
  container: {
    margin: "auto",
    padding: "px",
    maxWidth: "450px",
    alignContent: "center",
    marginTop: "240px",
  },
  iconUser: { color: Colors.primary, marginTop: 20, marginBottom: 10 },
  btnLogin: { width: "100%", background: Colors.primary },
  boxRegister: { display: "flex", justifyContent: "center" },
  textRegister: { marginLeft: 5, color: Colors.primary },
};
