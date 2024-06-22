import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const clientId =
  "1003848437245-qvtphb5ic5tvdll1hiiet0if2u17kje4.apps.googleusercontent.com";

const SignupForm = ({ onSignupSuccess }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSuccess = async (response) => {
    console.log("Login Success: currentUser:", response);

    const res = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
    );
    const profile = await res.json();
    console.log("User Profile: ", profile);

    // Call the parent component's signup success handler with profile data
    onSignupSuccess(profile);
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

  const handleSignup = () => {
    // Handle signup logic here (e.g., API call to register user)
    console.log("Signing up with:", username, password, confirmPassword);

    // For demonstration, assume signup is successful and simulate profile data
    const profile = {
      given_name: username,
      picture: "https://via.placeholder.com/150",
    };

    // Call the parent component's signup success handler with profile data
    onSignupSuccess(profile);
    navigate("/data");
  };

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
              Sign Up
            </Card.Header>

            <Card.Body>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                className="mb-3 w-100"
                onClick={() => handleSignup()}
              >
                Sign Up
              </Button>

              <div className="text-center mb-3">or</div>

              <Button
                variant="danger"
                className="mb-3 w-100"
                onClick={() => login()}
              >
                Continue with Google
                <FaGoogle className="mx-2" />
              </Button>

              <div className="text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/" className="text-decoration-none">
                    Login
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
