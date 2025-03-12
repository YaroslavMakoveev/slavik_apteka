import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'Email обязателен';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Неверный формат email';
    }
    if (!password) {
      newErrors.password = 'Пароль обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      navigate('/');
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrors({ email: 'Неверный email' });
      }
      if (error.response && error.response.status === 401) {
        setErrors({ password: 'Неверный пароль' });
      }
    }
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  return (
    <Container className="mt-5" style={{ width: '50%' }}>
      <h2 style={{ color: 'black' }} className='text-center mt-4'>Авторизация</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label style={{ color: 'black' }}>Адрес электронной почты</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder='Введите адрес электронной почты'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-2">
          <Form.Label style={{ color: 'black' }}>Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder='Введите пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button className="mt-3" style={{ width: '100%' }} variant="primary" type="submit">
          Войти
        </Button>

        <div className="mt-3 text-center">
          <span>Нет аккаунта? </span>
          <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleRegisterClick}>Зарегистрируйтесь!</span>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
