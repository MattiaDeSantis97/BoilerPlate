import { useEffect, useRef, useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};

export default function Dashboard() {
  const sections = [
    {
      id: 1,
      title: 'Innovazione',
      text: 'Sviluppiamo il futuro.',
      img: 'https://picsum.photos/1920/1080?random=10',
    },
    {
      id: 2,
      title: 'Design',
      text: 'Esperienze immersive.',
      img: 'https://picsum.photos/1920/1080?random=11',
    },
    {
      id: 3,
      title: 'Performance',
      text: 'Velocità pura.',
      img: 'https://picsum.photos/1920/1080?random=12',
    },
  ];

  return (
    <div className="overflow-hidden">
      {sections.map((sec) => (
        <div
          key={sec.id}
          className="d-flex flex-column justify-content-center align-items-center parallax-bg"
          style={{
            backgroundImage: `url(${sec.img})`,
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <ScrollReveal>
            <div className="adaptive-text">
              <h1 className="display-1 fw-bold">{sec.title}</h1>
              <p className="display-6">{sec.text}</p>
            </div>
          </ScrollReveal>
        </div>
      ))}

      {/* Contatto */}
      <div
        className="d-flex flex-column justify-content-center align-items-center py-5 parallax-bg"
        style={{
          backgroundImage: 'url(https://picsum.photos/1920/1080?random=13)',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <Container>
          <ScrollReveal>
            <Card className="glass-card mx-auto" style={{ maxWidth: '600px' }}>
              <Card.Header className="text-center fs-2 fw-bold border-0 pt-4 text-white">
                Contattaci
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Nome</Form.Label>
                    <Form.Control type="text" className="glass-input" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Email</Form.Label>
                    <Form.Control type="email" className="glass-input" />
                  </Form.Group>
                  <Button
                    variant="light"
                    type="submit"
                    className="w-100 fw-bold mt-3"
                  >
                    Invia
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </ScrollReveal>
        </Container>
      </div>
    </div>
  );
}
