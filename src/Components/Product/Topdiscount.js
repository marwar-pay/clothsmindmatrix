import { useEffect, useState } from "react";
import { Carousel, Card } from "react-bootstrap";
import { apiGet } from "@/api/apiMethods";
import { useRouter } from "next/router";

const TopDiscountedCarousel = () => {
  const [topDiscounted, setTopDiscounted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;
const router = useRouter();
  useEffect(() => {
    const fetchTopDiscounted = async () => {
      try {
        const queryParams = new URLSearchParams({
          referenceWebsite,
          limit: 5, // Fetch only top 5 products
          page: 1,
          sortBy: "discount",
          sortOrder: "desc",
        });

        const response = await apiGet(`api/product/getproducts?${queryParams}`);
        setTopDiscounted(response.data?.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDiscounted();
  }, [referenceWebsite]);

  const handleViewDetails = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="mb-4" >
      <h3>Top Discounted Products</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Carousel  indicators={false} controls={true} interval={3000} pause="hover">
          {topDiscounted.map((product) => (
            <Carousel.Item key={product._id} onClick={() => handleViewDetails(product._id)}>
              <Card className="box">
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
                  <Card.Img 
                    variant="top"
                    src={product.images[0] || "/placeholder.jpg"}
                    alt={product.productName}
                    style={{
                      objectFit: "contain",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text className="text-success">
                    Price: ₹{product.actualPrice}  
                    <span style={{ float: 'right' }}>
                      MRP: <span className="text-decoration-line-through">₹{product.price}</span>
                    </span>
                  </Card.Text>
                  <Card.Text className="text-muted">
                    Discount: {Math.round(((product.price - product.actualPrice) / product.price) * 100)}%
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default TopDiscountedCarousel;
