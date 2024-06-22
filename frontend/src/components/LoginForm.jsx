import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";

const clientId =
  "1003848437245-qvtphb5ic5tvdll1hiiet0if2u17kje4.apps.googleusercontent.com";

const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    console.log("Login Success: currentUser:", response);

    const res = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
    );
    const profile = await res.json();
    console.log("User Profile: ", profile);

    onLoginSuccess(profile); // Call the parent component's login success handler with profile data
    navigate("/data");
  };

  const onFailure = (response) => {
    console.log("Login failed: res:", response);
  };

  const login = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });

  return (
    <Container fluid className="p-3 my-5">
      <Row className="align-items-center justify-content-center">
        <Col md="6" lg="4" className="mb-4">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
          />
        </Col>

        <Col md="6" lg="4" className="mb-4">
          <Card className="w-75" style={{ marginTop: "20px" }}>
            <Card.Header
              className="text-center"
              style={{ backgroundColor: "#6f42c1", color: "white" }}
            >
              Login
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <div className="d-flex justify-content-between mx-2 mb-3">
                <Form.Check
                  type="checkbox"
                  id="rememberMe"
                  label="Remember me"
                />
                <a href="#!" className="text-decoration-none">
                  Forgot password?
                </a>
              </div>

              <Button variant="primary" className="mb-3 w-100">
                Sign in
              </Button>

              <div className="divider d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <p className="text-center fw-bold mx-2 mb-0">OR</p>
                <hr className="flex-grow-1" />
              </div>

              <Button
                variant="primary"
                className="mb-3 w-100"
                style={{ backgroundColor: "#3b5998" }}
              >
                <FaFacebookF className="mx-2" />
                Continue with Facebook
              </Button>

              <Button
                variant="primary"
                className="mb-3 w-100"
                style={{ backgroundColor: "#55acee" }}
              >
                <FaTwitter className="mx-2" />
                Continue with Twitter
              </Button>

              <Button
                variant="danger"
                className="mb-3 w-100"
                onClick={() => login()}
              >
                <FaGoogle className="mx-2" />
                Continue with Google
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
