import Carousel from 'react-bootstrap/Carousel';

function Slider() {
  const carouselImageStyle = {
    height: '92vh', // Задайте фиксированную высоту для изображений
    objectFit: 'cover', // Обеспечивает сохранение пропорций изображения
  };

  return (
    <Carousel data-bs-theme="light">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:3000/static/slide1.jpg"
          alt="First slide"
          style={carouselImageStyle}
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:3000/static/slide2.jpg"
          alt="Second slide"
          style={carouselImageStyle}
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:3000/static/slide3.jpg"
          alt="Third slide"
          style={carouselImageStyle}
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
