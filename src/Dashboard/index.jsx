import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(
    !('IntersectionObserver' in window)
  );
  const domRef = useRef();

  useLayoutEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(domRef.current);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-section ${isVisible ? 'is-visible' : ''}`}
      style={{ minHeight: '10px', width: '100%' }}
    >
      {children}
    </div>
  );
};

export default function Dashboard() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const sections = [
    {
      id: 1,
      title: 'Innovazione',
      text: "Sviluppiamo soluzioni all'avanguardia.",
      img: 'https://picsum.photos/1920/1080?random=1',
    },
    {
      id: 2,
      title: 'Design Moderno',
      text: 'Interfacce pulite e reattive per ogni dispositivo.',
      img: 'https://picsum.photos/1920/1080?random=2',
    },
    {
      id: 3,
      title: 'Performance',
      text: 'Velocità e ottimizzazione al primo posto.',
      img: 'https://picsum.photos/1920/1080?random=3',
    },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Messaggio inviato con successo!');
  };

  const contactSection = sections[0];

  return (
    <div className="overflow-hidden">
      {/* Sezioni Full Screen */}
      {sections.map((sec) => (
        <div
          key={sec.id}
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${contactSection.img})`,
            backgroundSize: 'cover',
            backgroundPosition: `center ${offsetY * 0.4}px` /* Calcolo parallasse mobile/desktop */,
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <ScrollReveal>
            <div className="adaptive-text">
              <h1 className="display-1 fw-bold mb-3">{sec.title}</h1>
              <p className="display-6">{sec.text}</p>
            </div>
          </ScrollReveal>
        </div>
      ))}

      {/* Form di Contatto */}
      <div
        key={contactSection.id}
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${contactSection.img})`,
          backgroundSize: 'cover',
          backgroundPosition: `center ${offsetY * 0.4}px` /* Calcolo parallasse mobile/desktop */,
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <Container>
          <ScrollReveal>
            <Card className="glass-card mx-auto" style={{ maxWidth: '600px' }}>
              <Card.Header className="text-center fs-2 fw-bold border-0 pt-4 pb-0 text-white">
                Contattaci
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleContactSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white fw-semibold">
                      Nome
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Il tuo nome"
                      className="glass-input"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-white fw-semibold">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="La tua email"
                      className="glass-input"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-white fw-semibold">
                      Commento
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Scrivi il tuo messaggio qui..."
                      className="glass-input"
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="light"
                    type="submit"
                    className="w-100 fw-bold fs-5 mt-2"
                  >
                    Invia Messaggio
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
