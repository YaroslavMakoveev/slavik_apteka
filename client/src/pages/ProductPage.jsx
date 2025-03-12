import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Image } from 'react-bootstrap';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data.product); // Извлекаем объект product из ответа
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, token]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Преобразование цены в число
  const price = parseFloat(product.price);

  // Расчет скидки
  const discountPercentage = 15;
  const discountPrice = price - (price * (discountPercentage / 100));

  return (
    <Container style={{ marginTop: '3vh' }}>
      <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Col md={12}>
          <div style={{
            border: '1px solid #ddd',
            width: '700px',
            margin: '0 auto',
            padding: '20px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(to right, #f9f9f9, #e9e9e9)'
          }}>
            <Image src={`http://localhost:3000/uploads/${product.img}`} fluid style={{ maxWidth: '300px', marginBottom: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
            <div style={{
              border: '1px solid #ddd',
              padding: '20px',
              borderRadius: '20px',
              maxWidth: '500px',
              margin: '0 auto',
              background: '#fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h1 style={{ color: '#333', fontWeight: 'bold' }}>{product.name}</h1>
              <p style={{ color: '#666', fontSize: '1.2rem' }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#d32f2f', marginRight: '10px' }}>{discountPrice.toFixed(2)} руб.</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', textDecoration: 'line-through' }}>{price.toFixed(2)} руб.</span>
              </div>
              <p style={{ color: '#666', fontSize: '1.2rem' }}>Производитель: {product.manufacturer}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
