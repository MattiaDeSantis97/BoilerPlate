import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Dashboard from '../Dashboard';
import Profile from '../Profile';
import Settings from '../Settings';

function App() {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <BrowserRouter basename="/BoilerPlate">
      <Navbar
        ref={navRef}
        expanded={expanded}
        onToggle={(isExpanded) => setExpanded(isExpanded)}
        expand="lg"
        className="bg-body shadow-sm fixed-top"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold text-body"
            onClick={() => setExpanded(false)}
          >
            Boilerplate App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/"
                className="text-body"
                onClick={() => setExpanded(false)}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/profile"
                className="text-body"
                onClick={() => setExpanded(false)}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/settings"
                className="text-body"
                onClick={() => setExpanded(false)}
              >
                Settings
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ paddingTop: '56px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
