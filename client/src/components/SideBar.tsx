import React from 'react';
import { Nav } from 'react-bootstrap';
import PizzaLoversLogo from '../header.png';
import './SideBar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SideBar() {
    return(
        <div>
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar" activeKey="/home">
            <img className="SideLogo" src={PizzaLoversLogo} alt="Logo" />
            <Nav.Item className="sideBarItemContainer">
                <i className="bi bi-search-heart"></i>
                <Nav.Link  className="sideBarItem" href="/home">Find PizzaLovers</Nav.Link>
            </Nav.Item>
            <Nav.Item className="sideBarItemContainer">
                <i className="bi bi-envelope-heart"></i>
                <Nav.Link className="sideBarItem" href="/chat">Chat </Nav.Link>
            </Nav.Item>
            <Nav.Item className="sideBarItemContainer">
                <i className="bi bi-gear"></i>
                <Nav.Link className="sideBarItem" href="/settings">Settings </Nav.Link>
            </Nav.Item>
           
        </Nav>
        </div>
        

    );

}

export default SideBar;