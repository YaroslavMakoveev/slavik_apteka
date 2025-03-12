import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    phone: '',
    role: ''
  });
  const [editingUser, setEditingUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleCloseModal = () => {
    setShowModal(false);
    setUserData({
      name: '',
      surname: '',
      patronymic: '',
      email: '',
      phone: '',
      role: ''
    });
    setEditingUser(null);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`http://localhost:3000/api/user/${editingUser.id}`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...userData } : user));
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting user:', error);
      setErrorMessage('Ошибка при отправке пользователя. Пожалуйста, попробуйте снова.');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserData(user);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setErrorMessage('Ошибка при удалении пользователя. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto' }}>
      {errorMessage && <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>{errorMessage}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.patronymic}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td style={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="warning" onClick={() => handleEdit(user)} style={{ marginRight: '10px' }}>
                  Редактировать
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать пользователя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSurname">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите фамилию"
                value={userData.surname}
                onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPatronymic">
              <Form.Label>Отчество</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите отчество"
                value={userData.patronymic}
                onChange={(e) => setUserData({ ...userData, patronymic: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите телефон"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Роль</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите роль"
                value={userData.role}
                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
              Сохранить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UsersAdmin;
