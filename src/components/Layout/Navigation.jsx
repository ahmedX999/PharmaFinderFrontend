import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import logo from '../../images/logo.ico'
import '../../styles/navigation.css'
import AuthService from "../../Services/auth.service";
import {Link, useNavigate} from "react-router-dom";

const Navigation = ({currentUser}) => {

    const [showAdminLinks, setShowAdminLinks] = useState(false);
    const [showUserLinks, setShowUserLinks] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {

        if (currentUser?.role === 'ADMIN') {
            setShowAdminLinks(true);
            setShowUserLinks(false);
        } else {
            setShowAdminLinks(false)
            setShowUserLinks(true)
        }

    });


    const logOut = () => {
        AuthService.logout();

    };

    return (
        <Container style={{backgroundColor: "#001e28"}}>
            <Navbar style={{backgroundColor: "#001e28"}} expand="lg" className="shadow">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        <span id="nav-dropdown">Pharma Finder</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >

                            <Nav.Link id="nav-dropdown" as={Link} to="/">Home</Nav.Link>

                            {currentUser?.role !== 'OWNER' ? (
                                <>
                                    <NavDropdown title="Pharmacies" id="nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/pharmacies">List of
                                            Pharmacies</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/map">Pharmacies on Map</NavDropdown.Item>

                                    </NavDropdown>
                                    {showAdminLinks && (
                                        <NavDropdown title="Cities/Zones" id="nav-dropdown">
                                            <NavDropdown.Item as={Link} to="/cities">Cities</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/zones">Zones</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/zones/zone/:zoneId/pharmacies">List of
                                                Pharmacies by
                                                Zone</NavDropdown.Item>
                                        </NavDropdown>
                                    )}
                                    {showAdminLinks && (
                                        <NavDropdown title="On-duty Pharmacies" id="nav-dropdown">
                                            <NavDropdown.Item as={Link}
                                                              to="/ondutypharmacies/history">History</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/ondutypharmacies/available">Available this
                                                week</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/ondutypharmacies/available/now">Available
                                                Now</NavDropdown.Item>
                                        </NavDropdown>
                                    )}
                                    {(showUserLinks) && (
                                        <NavDropdown title="On-duty Pharmacies" id="nav-dropdown">
                                            <NavDropdown.Item as={Link} to="/ondutypharmacies/available">Available this
                                                week</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/ondutypharmacies/available/now">Available
                                                Now</NavDropdown.Item>
                                        </NavDropdown>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Nav.Link id="nav-dropdown" as={Link} to="/pharmacy">Pharmacy</Nav.Link>
                                    <Nav.Link id="nav-dropdown" as={Link} to="/ondutypharmacy">OnDutyManagement
                                        </Nav.Link>
                                </>
                            )}

                        </Nav>
                        <Nav>
                        {currentUser ? (
                            <>

                                <Nav.Link id="nav-dropdown" as={Link} to="/profile"
                                > Profile: {currentUser.email}</Nav.Link>
                                <Nav.Link id="nav-dropdown" onClick={logOut}
                                >LogOut</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link id="nav-dropdown" as={Link} to="/login"
                                >Login</Nav.Link>
                                <Nav.Link id="nav-dropdown" as={Link} to="/register"
                                >Register</Nav.Link>
                            </>
                        )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </Container>
    );
};

export default Navigation;
