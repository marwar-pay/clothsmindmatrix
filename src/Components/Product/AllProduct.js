'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { apiGet } from "@/api/apiMethods";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(); // e.g., "price" or "name"
  const [sortOrder, setSortOrder] = useState(); // e.g., "asc" or "desc"
  const router = useRouter();
  const [category , setCategory] = useState('')
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        referenceWebsite,
        limit: productsPerPage,
        page: currentPage,
        minPrice,
        maxPrice,
        search,
        sortBy,
        sortOrder,
        category : category || ''
      });

      const response = await apiGet(`api/product/getproducts?${queryParams}`);
      setProducts(response.data?.products || []);
      setTotalProducts(response.data?.pagination?.totalDocuments || 0); // Assuming `total` is sent by the API
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const queryString = router.query; // Get query params from Next.js router

  useEffect(() => {
    if (queryString?.category) {
      setCategory(queryString.category);
      console.log(queryString.category);
    }
  }, [queryString]);


  useEffect(() => {
    fetchProducts();
  }, [currentPage, minPrice, maxPrice, search, sortBy, sortOrder,category]);

  const handleViewDetails = (id) => {
    router.push(`/product/${id}`);
  };

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    setSortBy();
    setSortOrder();
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <Container className="">
     
      <Row className="mb-3">
        {/* Search */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* Min Price */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Min Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* Max Price */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Max Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* Sort By */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value={null} >None</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
              <option value="discount">Discount</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Sort Order */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Sort Order</Form.Label>
            <Form.Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Reset Button */}
        <Col md={1} className="align-self-end">
          <Button variant="secondary" onClick={resetFilters}>
            Reset
          </Button>
        </Col>
      </Row>

      {/* Product Listing */}
      <Row>
        {loading ? (
          <Col>
            <p>Loading...</p>
          </Col>
        ) : error ? (
          <Col>
            <p className="text-danger">{error}</p>
          </Col>
        ) : (
          products.map((product) => (
            <Col md={3} key={product._id} className="mb-4" onClick={() => handleViewDetails(product._id)}>
              <Card className="h-100 shadow-sm">
                <div
                  style={{
                    height: "230px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    padding: "10px",
                  }}
                >
                  <div className="image-container mb-4 mb-md-0">
                      
                  <Card.Img
                    variant="bottom"
                    src={product.images[0] || "/placeholder.jpg"}
                    alt={product.productName}
                    style={{
                      objectFit: "contain",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }} className="img-fluid rounded shadow-lg"
                  />
                </div>
                </div>
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text style={{ fontSize: '14px', color: '#666' }}>{product.description}</Card.Text>
                  <Card.Text className="text-success">
                    Price: ₹{product.actualPrice}  <span style={{float:'right'}}> MRP: <span className="text-decoration-line-through">₹{product.price}</span></span>
                  </Card.Text>
                  {/* <Card.Text className="text-muted">
                    MRP: <span className="text-decoration-line-through">₹{product.price}</span>
                  </Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="outline-secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          variant="outline-secondary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default AllProduct;
