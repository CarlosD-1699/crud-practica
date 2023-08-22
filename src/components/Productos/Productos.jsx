import React, { useEffect, useState } from "react";
import { show_alert } from "../../utils/function";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useProducts } from "../../context/ProductContext";
import { useForm } from "react-hook-form";

const Productos = () => {
  const {
    products,
    createProduct,
    getProducts,
    deleteProducts,
    getProduct,
    updateProducts,
  } = useProducts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [op, setOp] = useState(1);
  const [id, setId] = useState("");

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const openModal = (op, id) => {
    setValue("productname", "");
    setValue("description", "");
    setValue("category", "");
    setValue("price", "");
    if (op === 1) {
      console.log(op);
      setTitle("Register Product");
    } else if (op === 2) {
      console.log(op);
      const loadProduct = async () => {
        const productFound = await getProduct(id);
        setId(id);
        setTitle("Edit Product");
        setValue("productname", productFound.productname);
        setValue("description", productFound.description);
        setValue("category", productFound.category);
        setValue("price", productFound.price);
      };
      loadProduct();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const validate = (parameters) => {
    // const name = getValues("productname");
    // console.log(name);
    // if (name.trim() === "") {
    //   show_alert("Write the name of the product", "warning");
    // } else if (description.trim() === "") {
    //   show_alert("Write the description of the product", "warning");
    // } else if (category.trim() === "") {
    //   show_alert("Write the category of the product", "warning");
    // } else if (price === "") {
    //   show_alert("Write the price of the product", "warning");
    // } else {
    if (op === 1 && id === "") {
      createProduct(parameters);
    } else {
      console.log(id);
      updateProducts(id, parameters);
      setId("");
    }
    // }
  };

  const onSubmit = handleSubmit((data) => {
    validate(data);
  });

  // const getProducts = async () => {
  //   let url = "/products";
  //   const result = await axios.get(url);
  //   setProducts(result.data);
  // };

  return (
    <div>
      <Container fluid>
        <Row className="mt-3">
          <Col className="offset-4" md={4}>
            <div className="d-grid gap-2 mb-2">
              <Button
                variant="dark"
                size="lg"
                onClick={() => {
                  handleShow();
                  openModal(1);
                }}
              >
                <i className="fa-solid fa-circle-plus"></i> Añadir{" "}
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Categoria</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {products === null || products === "undefined" ? (
                  <h1>Products not found</h1>
                ) : (
                  products.map((product, id) => {
                    return (
                      <tr key={product._id}>
                        <td>{id + 1}</td>
                        <td>{product.productname}</td>
                        <td>{product.description}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => {
                              handleShow();
                              openModal(
                                2,
                                product._id,
                                product.productname,
                                product.description,
                                product.category,
                                product.price
                              );
                            }}
                          >
                            <i className="fa-solid fa-edit"></i>
                          </Button>
                          &nbsp;
                          <Button
                            onClick={() => deleteProducts(product._id)}
                            variant="danger"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Nombre"
                {...register("productname", { required: true })}
              ></Form.Control>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Descripción"
                {...register("description", { required: true })}
              ></Form.Control>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Categoria"
                {...register("category", { required: true })}
              ></Form.Control>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Precio"
                {...register("price", { required: true })}
              ></Form.Control>
            </div>
            <div className="d-grid col-6 mx-auto">
              <Button
                variant="success"
                type="submit"
                /*onClick={() => validate()}*/
              >
                <i className="fa-solid fa-floppy-disk"></i> Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" id="btnclose" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Productos;
