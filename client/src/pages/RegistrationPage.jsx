import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronyic] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[А-Яа-яЁё\s\-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{10,15}$/;

    if (!nameRegex.test(name)) {
      newErrors.name = 'Имя должно состоять только из русских букв';
    }
    if (!nameRegex.test(surname)) {
      newErrors.surname = 'Фамилия должна состоять только из русских букв';
    }
    if (!nameRegex.test(patronymic)) {
      newErrors.patronymic = 'Отчество должно состоять только из русских букв';
    }
    if (!emailRegex.test(email)) {
      newErrors.email = 'Неверный формат email';
    }
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Номер телефона должен быть в формате +71234567890';
    }
    if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов';
    }
    if (password !== passwordRepeat) {
      newErrors.passwordRepeat = 'Пароли не совпадают';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/user/registration', {
        name,
        surname,
        patronymic,
        email,
        phone,
        password,
      });
      localStorage.setItem('token', response.data.token); // Сохраняем токен в localStorage
      setIsRegistered(true);
      navigate('/');
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({
          email: error.response.data.message.includes('email') ? error.response.data.message : '',
          phone: error.response.data.message.includes('phone') ? error.response.data.message : ''
        });
      } else {
        console.error('Registration failed', error);
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  if (isRegistered) {
    return navigate('/'); // Перенаправляем на главную страницу после регистрации
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Form onSubmit={handleRegister} style={{ width: '50%' }}>
        <h2 style={{ color: 'black' }} className='text-center'>Регистрация</h2>
        <Form.Group controlId="formName">
          <Form.Label style={{ color: 'black' }}>Имя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formSurname" className='mt-2'>
          <Form.Label style={{ color: 'black' }}>Фамилия</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите фамилию"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            isInvalid={!!errors.surname}
          />
          <Form.Control.Feedback type="invalid">
            {errors.surname}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPatronymic" className='mt-2'>
          <Form.Label style={{ color: 'black' }}>Отчество</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите отчество"
            value={patronymic}
            onChange={(e) => setPatronyic(e.target.value)}
            isInvalid={!!errors.patronymic}
          />
          <Form.Control.Feedback type="invalid">
            {errors.patronymic}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEmail" className='mt-2'>
          <Form.Label style={{ color: 'black' }}>Электронный адрес</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите электронный адрес"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPhone" className='mt-2'>
          <Form.Label style={{ color: 'black' }}>Номер телефона</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите номер телефона формата +71234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword" className='mt-2'>
          <Form.Label style={{ color: 'black' }}>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
          <Form.Label className='mt-2' style={{ color: 'black' }}>Повторите пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Повторите пароль"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            isInvalid={!!errors.passwordRepeat}
          />
          <Form.Control.Feedback type="invalid">
            {errors.passwordRepeat}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className='mt-4' style={{ width: '100%' }}>
          Зарегистрироваться
        </Button>
        <div className="mt-3 text-center">
          <span>Уже есть аккаунт? </span>
          <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleLoginClick}>Войти</span>
        </div>
      </Form>
    </Container>
  );
};

export default RegistrationPage;
