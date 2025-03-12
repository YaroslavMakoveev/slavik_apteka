import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Преобразование цены в число
  const price = parseFloat(product.price);

  // Расчет скидки
  const discountPercentage = 15;
  const discountPrice = price - (price * (discountPercentage / 100));

  return (
    <Card
      style={{
        minHeight: '400px',
        width: '18rem',
        margin: '1rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={handleClick}
    >
      <Card.Img
        variant="top"
        src={`http://localhost:3000/uploads/${product.img}`}
        style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
      />
      <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>{product.name}</Card.Title>
          <Card.Text style={{ fontSize: '1rem', color: '#666', marginBottom: '10px' }}>{product.description}</Card.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#d32f2f' }}>{discountPrice.toFixed(2)} руб.</span>
              <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333', textDecoration: 'line-through', marginLeft: '10px' }}>{price.toFixed(2)} руб.</span>
            </div>
          </div>
        </div>
        <Button variant="secondary" style={{ width: '100%' }}>
          Подробнее
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
