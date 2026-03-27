import { useContext, useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Alert, Container, Row, Col, Badge } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

export default function Profile() {
  const { user, login, register, logout, updateUser } = useContext(AppContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  // Gestione viste interne
  const [activeTab, setActiveTab] = useState('main'); // main, edit, orders, notifications, chat

  // Stati per Modifica Profilo
  const [editName, setEditName] = useState(user?.name || '');
  const [editPassword, setEditPassword] = useState('');
  const [editSuccess, setEditSuccess] = useState(false);

  // Stati per Chat
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Assistenza', text: 'Ciao! Come possiamo aiutarti oggi?' }
  ]);
  const [newMsg, setNewMsg] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'chat' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isLoginMode) {
      if (email && password) {
        const result = login(email, password);
        if (!result.success) setError(result.message);
      }
    } else {
      if (email && password && name) {
        const result = register(email, password, name);
        if (!result.success) setError(result.message);
      }
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const res = updateUser(editName, editPassword);
    if (res.success) {
      setEditSuccess(true);
      setEditPassword('');
      setTimeout(() => setEditSuccess(false), 3000);
    }
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages([...chatMessages, { sender: 'Tu', text: newMsg }]);
    setNewMsg('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'Assistenza', text: 'Un operatore ti risponderà a breve. Attendi in linea.' }]);
    }, 1000);
  };

  if (!user) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center"
        style={{ 
          backgroundImage: 'url(https://picsum.photos/1920/1080?random=4)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          minHeight: 'calc(100vh - 56px)' 
        }}
      >
        <Card className="glass-card m-3" style={{ width: '100%', maxWidth: '400px' }}>
          <Card.Header className="border-0 text-center pt-4 pb-0 fs-3 fw-bold">
            {isLoginMode ? 'Accesso' : 'Registrazione'}
          </Card.Header>
          <Card.Body className="p-4">
            {error && <Alert variant="danger" className="py-2">{error}</Alert>}
            <Form onSubmit={handleAuthSubmit}>
              {!isLoginMode && (
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Nome</Form.Label>
                  <Form.Control type="text" placeholder="Il tuo nome" value={name} onChange={(e) => setName(e.target.value)} className="glass-input" required={!isLoginMode} />
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control type="email" placeholder="nome@esempio.com" value={email} onChange={(e) => setEmail(e.target.value)} className="glass-input" required />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control type="password" placeholder="Inserisci password" value={password} onChange={(e) => setPassword(e.target.value)} className="glass-input" required />
              </Form.Group>
              <Button variant="light" type="submit" className="w-100 fw-bold fs-5 mb-3">
                {isLoginMode ? 'Accedi' : 'Registrati'}
              </Button>
            </Form>
            <div className="d-flex flex-column align-items-center gap-2 mt-3 border-top border-light pt-3">
              <Button variant="link" className="text-white text-decoration-none p-0" onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }}>
                {isLoginMode ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="d-flex flex-column align-items-center py-5"
      style={{ 
        backgroundImage: 'url(https://picsum.photos/1920/1080?random=7)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: 'calc(100vh - 56px)',
        width: '100%'
      }}
    >
      <Container style={{ maxWidth: '1000px' }}>
        <div className="adaptive-text mb-4 mt-2">
          <h1 className="display-4 fw-bold">{activeTab === 'main' ? `Benvenuto, ${user.name}!` : 'Area Personale'}</h1>
        </div>

        <Card className="glass-card">
          <Card.Header className="d-flex justify-content-between align-items-center py-3 border-bottom border-light">
            <span className="fs-4 fw-bold text-white">
              {activeTab === 'main' && 'Dashboard Profilo'}
              {activeTab === 'edit' && 'Modifica Profilo'}
              {activeTab === 'orders' && 'I Miei Ordini'}
              {activeTab === 'notifications' && 'Centro Notifiche'}
              {activeTab === 'chat' && 'Chat Assistenza'}
            </span>
            {activeTab !== 'main' && (
              <Button variant="outline-light" size="sm" onClick={() => setActiveTab('main')}>
                &larr; Indietro
              </Button>
            )}
          </Card.Header>
          <Card.Body className="p-4 text-white">
            
            {/* VISTA PRINCIPALE */}
            {activeTab === 'main' && (
              <Row className="g-4">
                <Col md={6}>
                  <div className="p-3 border border-light rounded bg-dark bg-opacity-25 h-100">
                    <h5 className="border-bottom border-light pb-2 mb-3 fw-bold">Dati Attuali</h5>
                    <p className="mb-2"><strong>Nome:</strong> {user.name}</p>
                    <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                    <p className="mb-0"><strong>Ruolo:</strong> {user.role}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-column gap-3 h-100">
                    <Button variant="outline-light" size="lg" className="text-start fw-semibold" onClick={() => setActiveTab('edit')}>Modifica Profilo</Button>
                    <Button variant="outline-light" size="lg" className="text-start fw-semibold" onClick={() => setActiveTab('orders')}>I Miei Ordini</Button>
                    <Button variant="outline-light" size="lg" className="text-start fw-semibold d-flex justify-content-between align-items-center" onClick={() => setActiveTab('notifications')}>
                      Centro Notifiche <Badge bg="danger">3</Badge>
                    </Button>
                    <Button variant="outline-info" size="lg" className="text-start fw-semibold" onClick={() => setActiveTab('chat')}>Chat Assistenza</Button>
                  </div>
                </Col>
              </Row>
            )}

            {/* VISTA MODIFICA PROFILO */}
            {activeTab === 'edit' && (
              <div className="mx-auto" style={{ maxWidth: '500px' }}>
                {editSuccess && <Alert variant="success">Profilo aggiornato con successo.</Alert>}
                <Form onSubmit={handleUpdateProfile}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email (Non modificabile)</Form.Label>
                    <Form.Control type="email" value={user.email} disabled className="glass-input bg-dark bg-opacity-50 text-white-50" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="glass-input" required />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Nuova Password (lascia vuoto per non modificare)</Form.Label>
                    <Form.Control type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} className="glass-input" placeholder="Nuova password" />
                  </Form.Group>
                  <Button variant="light" type="submit" className="w-100 fw-bold">Salva Modifiche</Button>
                </Form>
              </div>
            )}

            {/* VISTA ORDINI */}
            {activeTab === 'orders' && (
              <div className="text-center py-5">
                <h3 className="fw-bold opacity-50 mb-3">Nessun ordine all'attivo</h3>
                <p className="opacity-75">Non hai ancora effettuato acquisti. Inizia a esplorare il nostro catalogo.</p>
              </div>
            )}

            {/* VISTA NOTIFICHE */}
            {activeTab === 'notifications' && (
              <div className="d-flex flex-column gap-3">
                <Alert variant="info" className="mb-0 bg-dark bg-opacity-50 text-white border-info">
                  <strong>Benvenuto:</strong> Grazie per esserti registrato. Esplora le funzionalità del tuo nuovo account.
                </Alert>
                <Alert variant="warning" className="mb-0 bg-dark bg-opacity-50 text-white border-warning">
                  <strong>Privacy:</strong> Abbiamo aggiornato i nostri termini di servizio in data odierna.
                </Alert>
                <Alert variant="success" className="mb-0 bg-dark bg-opacity-50 text-white border-success">
                  <strong>Promozione:</strong> Hai diritto al 10% di sconto sul tuo primo ordine. Usa il codice WELCOME10.
                </Alert>
              </div>
            )}

            {/* VISTA CHAT ASSISTENZA */}
            {activeTab === 'chat' && (
              <div className="d-flex flex-column" style={{ height: '400px' }}>
                <div className="flex-grow-1 overflow-auto p-3 mb-3 border border-light rounded bg-dark bg-opacity-25 d-flex flex-column gap-2">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`p-2 rounded ${msg.sender === 'Tu' ? 'bg-primary align-self-end text-white' : 'bg-secondary align-self-start text-white'}`} style={{ maxWidth: '75%' }}>
                      <strong className="d-block small opacity-75">{msg.sender}</strong>
                      {msg.text}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <Form onSubmit={handleSendChat} className="d-flex gap-2">
                  <Form.Control type="text" placeholder="Scrivi un messaggio..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} className="glass-input" required />
                  <Button variant="info" type="submit" className="fw-bold">Invia</Button>
                </Form>
              </div>
            )}

          </Card.Body>
        </Card>

        {activeTab === 'main' && (
          <div className="text-end mt-4">
            <Button variant="danger" size="lg" onClick={logout} className="px-5 fw-bold shadow-lg">
              Disconnetti
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}