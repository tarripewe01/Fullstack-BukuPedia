import { MDBFooter } from "mdb-react-ui-kit";
import React from "react";
import { Colors } from "../utils/colors";

const Footer = () => {
  return (
    <MDBFooter
      className="text-center text-lg-left mt-5"
      style={{ backgroundColor: Colors.primary, color: 'white' }}
    >
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-light" href="https://mdbootstrap.com/">
          Team 3 (Tarri & Setyo) X QuBisa
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
