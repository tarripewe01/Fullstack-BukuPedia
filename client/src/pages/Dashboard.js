import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { BookManage } from "../components";

const Dashboard = () => {
  const [verticalActive, setVerticalActive] = useState("tab1");

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  return (
    <div className="px-5 " style={{ marginTop: 100 }}>
      <MDBRow>
        <MDBCol size="2">
          <MDBTabs className="flex-column text-center">
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab1")}
                active={verticalActive === "tab1"}
              >
                Dashboard
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab3")}
                active={verticalActive === "tab3"}
              >
                Books Management
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol>
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === "tab1"}>
              Home content
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === "tab3"}>
              <BookManage />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Dashboard;
