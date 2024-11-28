import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";
import { FaCubes } from "react-icons/fa";
import Swal from "sweetalert2";
import "../../App.css";

const LoginPage: React.FC = () => {
  // State untuk menyimpan nilai form
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  // Fungsi untuk menangani submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Jika email atau password kosong, tampilkan toast
    if (!nik) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }).fire({
        icon: "warning",
        title: "Masukan NIK",
      });
      return;
    }

    if (!password) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }).fire({
        icon: "warning",
        title: "Masukan Password",
      });
      return;
    }

    // Jika berhasil login, tampilkan toast sukses
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    }).fire({
      icon: "success",
      title: "Signed in successfully",
    });
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="shadow-lg" style={{ width: "100%", maxWidth: "900px" }}>
        <Row className="g-0">
          <Col md={6}>
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
              alt="login form"
              fluid
              className="rounded-start"
            />
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <Card.Body className="d-flex flex-column justify-content-center w-100">
              <div className="d-flex flex-row align-items-center mt-2">
                <FaCubes size={40} color="#ff6219" className="me-3" />
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>
              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNik" className="mb-4">
                  <Form.Label>NIK</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="NIK"
                    size="lg"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="dark"
                  size="lg"
                  className="w-100 mb-4"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default LoginPage;
