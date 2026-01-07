import React, { useState, useEffect } from "react";
import { Container, Navbar, Form, FormControl, Row, Col, Card, Spinner } from "react-bootstrap";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>React SPA</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-3">
            {filteredUsers.map((user) => (
              <Col key={user.id}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{user.username}</Card.Subtitle>
                    <Card.Text>
                      <strong>Email:</strong> {user.email} <br />
                      <strong>City:</strong> {user.address.city}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
