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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";
import { Colors } from "../utils/colors";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  //  Handle Toast Error
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
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
          <h5>Sign In</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="col-md-12">
                <MDBInput
                  label="Email"
                  type="email"
                  name="email"
                  required
                  invalid="true"
                  feedback="Please provide your email"
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
                  feedback="Please provide your password"
                  value={password}
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
                  L O G I N
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <div style={styles.boxRegister}>
              <p>Don't have an account ?</p>
              <Link to="/register" style={styles.textRegister}>
                Register here
              </Link>
            </div>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </>
  );
};

export default Login;

const styles = {
  container: {
    margin: "auto",
    padding: "15px",
    maxWidth: "450px",
    alignContent: "center",
    marginTop: "240px",
    height: '100vh'
  },
  iconUser: { color: Colors.primary, marginTop: 20, marginBottom: 10 },
  btnLogin: { width: "100%", background: Colors.primary },
  boxRegister: { display: "flex", justifyContent: "center" },
  textRegister: { marginLeft: 5, color: Colors.primary },
};
