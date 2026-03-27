import { useContext } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

export default function Settings() {
  const { theme, toggleTheme, logout, user } = useContext(AppContext);

  const handleDeleteProfile = () => {
    if (
      window.confirm(
        'Sei sicuro di voler cancellare il tuo profilo? Questa azione è irreversibile.'
      )
    ) {
      logout();
      alert('Profilo cancellato con successo.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center py-5"
      style={{
        backgroundImage: 'url(https://picsum.photos/1920/1080?random=5)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: 'calc(100vh - 56px)',
      }}
    >
      <Container style={{ maxWidth: '800px' }}>
        <h2 className="mb-4 fw-bold adaptive-text text-start px-0">
          Impostazioni
        </h2>

        <Card className="glass-card mb-4">
          <Card.Header className="border-bottom border-light fs-5">
            Aspetto
          </Card.Header>
          <Card.Body className="p-4">
            <Form.Check
              type="switch"
              id="theme-switch"
              label={
                theme === 'light'
                  ? 'Attiva Modalità Scura'
                  : 'Disattiva Modalità Scura'
              }
              checked={theme === 'dark'}
              onChange={toggleTheme}
              className="fs-5"
            />
          </Card.Body>
        </Card>

        <Card
          className="glass-card"
          style={{ borderColor: 'rgba(220, 53, 69, 0.5)' }}
        >
          <Card.Header className="text-danger border-bottom border-danger fs-5">
            Zona Pericolosa
          </Card.Header>
          <Card.Body className="p-4">
            <p className="opacity-75">
              La cancellazione del profilo rimuoverà tutti i tuoi dati dal
              sistema.
            </p>
            <Button
              variant="danger"
              onClick={handleDeleteProfile}
              disabled={!user}
              className="fw-bold"
            >
              Cancella Profilo
            </Button>
            {!user && (
              <div className="mt-3 text-warning fw-bold">
                Devi effettuare l'accesso nel Profilo per cancellare il tuo
                account.
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
