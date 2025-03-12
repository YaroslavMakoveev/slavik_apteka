import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AdminCheck from '../middleware/AdminCheck';

function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/user/auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
        setUser(response.data);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUser(null);
    window.location.reload();
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#fbfbfb', color: 'black' }}>
      <Container>
        {/* <img src={}  width={60} className='me-2' alt="Logo" /> */}
        <Navbar.Brand href="/" className='fs-3 fw-normal text-black text-decoration-none'>Аптека</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className='fs-5 text-black'>Главная</Nav.Link>
            <Nav.Link href="/catalog" className='fs-5 text-black'>Каталог</Nav.Link>
            <Nav.Link href="/about" className='fs-5 text-black'>Контакты</Nav.Link>
          </Nav>

          <div className="d-flex ms-auto gap-3 align-items-center">
            {isAuthenticated ? (
              <>
                <Nav.Link className='fs-5 text-black'>{user.surname} {user.name} {user.patronymic}</Nav.Link>
                <AdminCheck>
                  <Button variant="dark" href="/admin">Админ</Button>
                </AdminCheck>
                <Button variant="outline-dark" onClick={handleLogout}>Выйти</Button>
              </>
            ) : (
              <>
                <Button variant="outline-dark" href="/login">Авторизоваться</Button>
                <Button variant="dark" href="/registration">Зарегистрироваться</Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
