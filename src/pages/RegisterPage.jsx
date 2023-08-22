import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/products");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((values) => {
    signup(values);
  });

  return (
    <div className="bg-black vh-100 py-3">
      <Container
        fluid
        className="bg-secondary w-50 mx-auto h-75 my-auto border rounded"
      >
        {registerErrors.map((error, i) => (
          <div
            className="bg-danger mt-2 py-1 px-2 text-white w-50 mx-auto"
            key={i}
          >
            {error}
          </div>
        ))}
        <Row className="mt-3">
          <Col className="offset-4" md={4}>
            <div className="flex gap-1 mb-2">
              <h1 className="text-white">Register</h1>
            </div>
          </Col>
        </Row>
        <Row className="mt-2 w-50 mw-100 mx-auto">
          <Col className="py-3">
            <Form className="d-flex flex-column gap-2" onSubmit={onSubmit}>
              <Form.Control
                className="text-white w-full bg-dark px-4 py-2 rounded-md"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-danger">Username is required</p>
              )}
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
              <Button type="submit">Register</Button>
              <p className="d-flex gap-2 justify-content-between">
                Already have an account?{" "}
                <Link
                  className="text-primary text-wrap text-decoration-none"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
