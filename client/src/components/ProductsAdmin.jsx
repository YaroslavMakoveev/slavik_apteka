import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    manufacturer: '',
    img: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

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

    fetchProducts();
    fetchCategories();
  }, [token]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      quantity: '',
      categoryId: '',
      manufacturer: '',
      img: null,
    });
    setEditingProduct(null);
    setErrorMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      if (editingProduct) {
        await axios.put(`http://localhost:3000/api/products/${editingProduct.id}`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setProducts(products.map(product => product.id === editingProduct.id ? { ...product, ...formData } : product));
      } else {
        await axios.post('http://localhost:3000/api/products', formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setProducts([...products, { id: Date.now(), ...formData }]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting product:', error);
      setErrorMessage('Ошибка при отправке товара. Пожалуйста, попробуйте снова.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.categoryId,
      manufacturer: product.manufacturer,
      img: null,
    });
    handleShowModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage('Нельзя удалить товар, так как он используется.');
      } else {
        console.error('Error deleting product:', error);
        setErrorMessage('Ошибка при удалении товара. Пожалуйста, попробуйте снова.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto' }}>
      {errorMessage && <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>{errorMessage}</Alert>}
      <Button variant="primary" onClick={handleShowModal} style={{ marginBottom: '20px' }}>
        Добавить товар
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category ? product.category.name : 'Нет категории'}</td>
              <td>{product.price} руб.</td>
              <td style={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="warning" onClick={() => handleEdit(product)} style={{ marginRight: '10px' }}>
                  Редактировать
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Редактировать товар' : 'Добавить товар'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Название товара</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Введите название товара"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Описание товара</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Введите описание товара"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Цена товара</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Введите цену товара"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductQuantity">
              <Form.Label>Количество товара</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                placeholder="Введите количество товара"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Категория товара</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Выберите категорию</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProductManufacturer">
              <Form.Label>Производитель товара</Form.Label>
              <Form.Control
                type="text"
                name="manufacturer"
                placeholder="Введите производителя товара"
                value={formData.manufacturer}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Изображение товара</Form.Label>
              <Form.Control
                type="file"
                name="img"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
              {editingProduct ? 'Сохранить' : 'Добавить'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductsAdmin;
