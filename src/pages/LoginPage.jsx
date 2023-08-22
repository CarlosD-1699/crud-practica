import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/products");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="bg-black vh-100 py-3">
      <Container
        fluid
        className="bg-secondary w-50 mx-auto h-75 my-auto border rounded"
      >
        {signinErrors.map((error, i) => (
          <div
            className="bg-danger mt-2 py-1 px-2 text-white w-50 mx-auto"
            key={i}
          >
            {error}
          </div>
        ))}
        <Row className="mt-3">
          <Col className="w-25 mx-auto" md={4}>
            <div className="flex gap-1 mb-2">
              <h1 className="text-white">Login</h1>
            </div>
          </Col>
        </Row>
        <Row className="mt-2 w-50 mw-100 mx-auto">
          <Col className="py-3">
            <Form className="d-flex flex-column gap-2" onSubmit={onSubmit}>
              <Form.Control
                className="text-white w-full bg-dark px-4 py-2 rounded-md"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-danger">Email is required</p>}
              <Form.Control
                className="text-white w-full bg-dark px-4 py-2 rounded-md"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-danger">Password is required</p>
              )}
              <Button type="submit">Login</Button>
              <p className="d-flex gap-2 justify-content-between">
                Don't have an account?{" "}
                <Link
                  className="text-primary text-wrap text-decoration-none"
                  to="/register"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
