import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";

function Header() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const bugReportLink = "https://github.com/kanpurin/GraphVisualizer/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D"; // バグ報告用のリンク
  const featureRequestLink = "https://github.com/kanpurin/GraphVisualizer/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=%5BFeature+Request%5D"; // 機能提案用のリンク

  const linkStyle = {
    paddingLeft: "40px" // ここでリンクの字下げを設定
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home" style={{ fontSize: "40px" }}>GraphVisualizer</Navbar.Brand>
          <Button onClick={handleShow} aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </Button>
        </Container>
      </Navbar>
      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start" target="#offcanvasDarkNavbar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Graph Visualizer</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/network-graph" style={linkStyle}>Network Graph</Nav.Link>
            <Nav.Link href="/2d-graph" style={linkStyle}>2D Graph</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href={bugReportLink}>Report a Bug</Nav.Link>
            <Nav.Link href={featureRequestLink}>Suggest a Feature</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;