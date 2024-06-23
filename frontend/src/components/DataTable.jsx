import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  Modal,
} from "react-bootstrap";
import Loading from "./Loading";
import "../costume.css";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState(""); // Added productName state
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const [sortOrder, setSortOrder] = useState(""); // Sort order state
  const [showNoResultsModal, setShowNoResultsModal] = useState(false); // Add state for modal visibility

  useEffect(() => {
    fetchData();
  }, [page, sortOrder]); // Update when page or sortOrder changes

  const fetchData = () => {
    setLoading(true); // Set loading to true when fetching data

    fetch(`http://localhost:5000/api/data/${page}?sort=${sortOrder}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); // Set loading to false after data is fetched
        if (data.length === 0) setShowNoResultsModal(true); // Show modal if data is empty
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Ensure loading is set to false on error as well
      });
  };

  const handleFilter = () => {
    setLoading(true); // Set loading to true when filtering data

    const filterData = {
      manufacturer,
      category,
      productName, // Add productName to filterData
    };

    fetch("http://localhost:5000/api/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterData),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); // Set loading to false after data is filtered
        if (data.length === 0) setShowNoResultsModal(true); // Show modal if data is empty
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Ensure loading is set to false on error as well
      });
  };

  const handleSort = (order) => {
    setLoading(true); // Set loading to true when sorting data
    setSortOrder(order); // Set the sort order

    fetch(`http://localhost:5000/api/data/${page}?sort=${order}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); // Set loading to false after data is sorted
        if (data.length === 0) setShowNoResultsModal(true); // Show modal if data is empty
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Ensure loading is set to false on error as well
      });
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  const handleCloseModal = () => {
    setShowNoResultsModal(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Row>
        <Col md={3}>
          <Form className="mb-3">
            <h5>Filter</h5>
            <Form.Group controlId="formFilterProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFilterManufacturer">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFilterCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleFilter}>
              Apply Filters
            </Button>
          </Form>
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort("asc")}>
                Price Low to High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("desc")}>
                Price High to Low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={9}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SL</th>
                <th>Product Name</th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Category</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row["SL"]}</td>
                  <td>{row["Product Name"]}</td>
                  <td>{row["Manufacturer"]}</td>
                  <td>{row["Price"]}</td>
                  <td>{row["Category"]}</td>
                  <td>{row["Rating"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span>Page {page}</span>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showNoResultsModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>No Results Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          No results were found for your search criteria. Please try again with
          different filters or sorting options.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DataTable;
