import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory ? product.categoryId === selectedCategory : true;
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && nameMatch;
  });

  return (
    <Container>
      <Row className='mt-2'>
        <h1 className='text-center mb-2'>Каталог</h1>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Поиск по названию"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Row>
      <Row>
        <Col md={3} className="d-none d-md-block">
          <Button variant="outline-secondary" className="w-100 mb-2 mt-3" onClick={() => setSelectedCategory(null)}>Все категории</Button>
          {categories.map(category => (
            <Button
              key={category.id}
              variant="outline-secondary"
              className="w-100 mb-2"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </Col>
        <Col md={9}>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CatalogPage;
