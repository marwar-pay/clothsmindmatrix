'use client';
import { useCart } from "@/context/CartContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Header from "@/Layout/Header";

const Cart = () => {
  const { cart,cartitems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const router = useRouter();

  // Handle checkout functionality
  const handleCheckout = () => {
    // Pass cart items as query params or handle via context
    router.push({
      pathname: "/cartorderform",
      // query: { cartItems: JSON.stringify(cart) }, // Sending cart data to the next page
    });
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <div style={{ marginTop: "15%" }}>
          <h2>Cart Items</h2>
          {cartitems?.items?.length === 0 || !cart ? (
            <p>Your cart is empty!</p>
          ) : (
            <Row>
              <Col md={8}>
                {cartitems && cartitems?.items?.map((item) => (
                  <Row key={item._id} className="mb-3 align-items-center">
                    <Col md={3}>
                      <img
                        src={item.product?.images?.[0] || "/default-image.jpg"}
                        alt={item?.product?.productName || "Product Image"}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <span>{item?.product?.productName || "Unnamed Product"}</span>
                    </Col>
                    <Col md={2}>₹{item?.product?.actualPrice}</Col>
                    <Col md={2}>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.product?._id, Number(e.target.value) || 1)
                        }
                        style={{ width: "60px" }}
                      />
                    </Col>

                    <Col md={2}>₹{(item.total).toFixed(2)}</Col>

                    <Col md={2}>
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(item?.product?._id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col md={4}>
                <Row className="mt-4">
                  <Col>
                    <div
                      className="p-3 border rounded"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <h4>Total: ₹{cartitems && cartitems?.totalAmount}</h4>
                      <Button
                        variant="success"
                        className="mt-2 btn-lg btn-block"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </>
  );
};

export default Cart;
