import { SessionStoreKey } from "./../../constants/app.constants";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { hasChangeAuth } from "./../../redux/actions/auth.action";
import { getName } from "./../../services/user.service";

const AdminNavbar = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const logout = () => {
    sessionStorage.removeItem(SessionStoreKey.ACCESS_TOKEN);
    dispatch(hasChangeAuth(null));
  };
  useEffect(() => {
    getName().then((result) => setName(result.data.name));
  }, []);
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <p className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
            {props.brandText}
          </p>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-4-800x800.jpg")
                          .default
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={() => logout()}>
                  <i className="ni ni-user-run" style={{ color: "red" }} />
                  <span style={{ color: "red" }}>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
