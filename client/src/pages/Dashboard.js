import {
  MDBCol,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BookManage, UserManage } from "../components";
import { setLogout } from "../redux/features/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

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
            {/* <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab1")}
                active={verticalActive === "tab1"}
              >
                Dashboard
              </MDBTabsLink>
            </MDBTabsItem> */}

            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab1")}
                active={verticalActive === "tab1"}
              >
                Books Management
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab2")}
                active={verticalActive === "tab2"}
              >
                Users Management
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab3")}
                active={verticalActive === "tab3"}
              >
                Chat
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol>
          <MDBTabsContent>
            {/* <MDBTabsPane show={verticalActive === "tab1"}>
              Home content
            </MDBTabsPane> */}
            <MDBTabsPane show={verticalActive === "tab1"}>
              <BookManage />
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === "tab2"}>
              <UserManage />
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === "tab3"}>Chat</MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Dashboard;
