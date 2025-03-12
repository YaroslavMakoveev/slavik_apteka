import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryName('');
    setEditingCategory(null);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:3000/api/categories/${editingCategory.id}`, { name: categoryName }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(categories.map(category => category.id === editingCategory.id ? { ...category, name: categoryName } : category));
      } else {
        await axios.post('http://localhost:3000/api/categories', { name: categoryName }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories([...categories, { id: Date.now(), name: categoryName }]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting category:', error);
      setErrorMessage('Ошибка при отправке категории. Пожалуйста, попробуйте снова.');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    handleShowModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage('Нельзя удалить категорию, так как ей принадлежат товары.');
      } else {
        console.error('Error deleting category:', error);
        setErrorMessage('Ошибка при удалении категории. Пожалуйста, попробуйте снова.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto' }}>
      {errorMessage && <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>{errorMessage}</Alert>}
      <Button variant="primary" onClick={handleShowModal} style={{ marginBottom: '20px' }}>
        Добавить категорию
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Название</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td style={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="warning" onClick={() => handleEdit(category)} style={{ marginRight: '10px' }}>
                  Редактировать
                </Button>
                <Button variant="danger" onClick={() => handleDelete(category.id)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Название категории</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название категории"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
              {editingCategory ? 'Сохранить' : 'Добавить'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CategoriesAdmin;
