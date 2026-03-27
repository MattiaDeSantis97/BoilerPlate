import { useEffect, useRef, useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.15 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className={`reveal-section ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

export default function Dashboard() {
  const sections = [
    { id: 1, title: 'Innovazione', text: 'Sviluppiamo soluzioni all\'avanguardia.', img: 'https://picsum.photos/1920/1080?random=1' },
    { id: 2, title: 'Design Moderno', text: 'Interfacce pulite e reattive per ogni dispositivo.', img: 'https://picsum.photos/1920/1080?random=2' },
    { id: 3, title: 'Performance', text: 'Velocità e ottimizzazione al primo posto.', img: 'https://picsum.photos/1920/1080?random=3' },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Messaggio inviato con successo!');
  };

  return (
    <div>
      {/* Sezioni Full Screen con Parallasse */}
      {sections.map((sec) => (
        <div
          key={sec.id}
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${sec.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
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

      {/* Area Form di Contatto Integrata nello Scorrimento */}
      <div
        className="d-flex flex-column justify-content-center align-items-center py-5"
        style={{
          backgroundImage: 'url(https://picsum.photos/1920/1080?random=4)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
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
                  <Form.Group className="mb-3" controlId="contactName">
                    <Form.Label className="text-white fw-semibold">Nome</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Il tuo nome" 
                      className="glass-input" 
                      required 
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="contactEmail">
                    <Form.Label className="text-white fw-semibold">Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="La tua email" 
                      className="glass-input" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="contactMessage">
                    <Form.Label className="text-white fw-semibold">Commento</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4} 
                      placeholder="Scrivi il tuo messaggio qui..." 
                      className="glass-input" 
                      required 
                    />
                  </Form.Group>

                  <Button variant="light" type="submit" className="w-100 fw-bold fs-5 mt-2">
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