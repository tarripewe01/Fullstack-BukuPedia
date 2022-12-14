import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { Colors } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import decode from "jwt-decode";

const Header = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const token = user?.token;

  // timeout Login
  if (token) {
    const decodeToken = decode(token);
    if (decodeToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={styles.header}>
      <MDBContainer>
        <MDBNavbarBrand href="/" style={styles.brand}>
          BukuPedia
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle Navigation"
          onClick={() => setShow(!show)}
          style={{ color: Colors.white }}
        >
          <MDBIcon fas icon="bars" />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?.name === "Admin" && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?.name !== "Admin" && user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/chat">
                    <p className="header-text">Chat Admin</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id && (
              <h5 style={styles.navbar}>Hi, {user?.result?.name}</h5>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={handleLogout}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;

const styles = {
  header: {
    backgroundColor: Colors.primary,
  },
  brand: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 22,
  },
  navbar: {
    color: "rgb(235, 228, 228)",
    fontWeight: 500,
    fontSize: 17,
    marginRight: 20,
    marginTop: 17,
    marginLeft: 20,
  },
};
