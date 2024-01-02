import axios from 'axios'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Layout = (props) => {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [isLoggedIn, setisLoggedIn] = useState(false);

    //getToken cagırıyor 
    props.AuthStore.getToken();

    //guvenlik islemleri ?
    useEffect(() => {
        const token = (props.AuthStore.appState != null) ? props.AuthStore.appState.user.access_token : null;
        axios.post(`api/authenticate`, {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            if (!res.data.isLoggedIn) {
                history.push("/login")
            }
            setUser(res.data.user);
            setisLoggedIn(res.data.isLoggedIn);

        })
            .catch((err) => {
                console.log(err, "err")
                // history.push("/login")
                console.log(props.AuthStore.appState.user);
            })
    }, [])

    //cıkıs yapma
    const logout = () => {
        //removeToken metodunu cagır, login sayfasına gonder,  "cıkıs yapma"
        axios.post(`api/logout`, {}, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then(res => console.log("Çıkış işlemi basarılı"))

            .catch(res => console.log("Çıkış işlemi sırasında bir hata oluştu:"))

        props.AuthStore.removeToken();
        history.push("/login");
    }

    return (
        <div>

            <Navbar collapseOnSelect expand="lg" style={{fontSize:"1.4rem", backgroun: "dark"  }} className="bg-body-tertiary py-2 ">
                <Container>
                    <Navbar.Brand href="#home" style={{fontSize:"2rem", marginRight:"2rem"}}>Stoks</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Yonetim Paneli</Nav.Link>
                            <Nav.Link href="/Product">Ürünler</Nav.Link>
                        </Nav>
                        <NavDropdown title="Nurullah Dinç" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profil Duzenle</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Sifre Değistir</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>Cıkış Yap </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {props.children}
        </div>
    )
}

export default inject("AuthStore")(observer(Layout));