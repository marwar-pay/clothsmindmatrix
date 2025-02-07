// 'use client';
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { Container, Row, Col, Button, Form } from "react-bootstrap";
// import axios from "axios";
// import { useCart } from "@/context/CartContext"; // Context for cart management
// import Header from "@/Layout/Header";
// import { apiPost } from "@/api/apiMethods";

// const CartOrderForm = () => {
//   const router = useRouter();
//   const { cart } = useCart();  // Get cart items from context
//   const txnid = `tgD59N${Date.now()}`; // Unique transaction ID
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     mobile: "",
//     email: "",
//     address: "",
//     pincode: "",
//     country: "",
//     state: "",
//     products: cart.map((item) => ({
//       product: item._id || 'default-id',  // Add fallback for undefined IDs
//       productName: item.productName,
//       price: item.actualPrice,
//       category: item.category,
//       description: item.description,
//       images: item.images,
//     })),
//   });
//   const [loading, setLoading] = useState(false);
//   const [paymentUrl, setPaymentUrl] = useState("");

//   // Calculate total amount from cart
//   const totalAmount = cart.reduce((sum, item) => sum + item.actualPrice * item.qty, 0).toFixed(2);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate required fields
//     if (!formData.firstName || !formData.lastName || !formData.mobile) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     setLoading(true); // Show loading indicator
//     console.log("itemrohit", cart)

//     // Prepare order data
//     const orderData = {
//       products: cart.map((item) => ({
//         product: item._id || 'default-id',  // Add fallback for undefined IDs
//         productName: item.productName,
//         quantity: item.qty,
//         price: item.price,
//         actualPrice: item.actualPrice,
//         category: item.category,
//         description: item.description,
//         images: item.images,
//       })),
//       totalAmount: totalAmount,
//       shippingAddress: JSON.stringify({
//         name: `${formData.firstName} ${formData.lastName}`,
//         email: formData.email,
//         mobile: formData.mobile,
//         address: formData.address,
//         pincode: formData.pincode,
//         country: formData.country,
//         state: formData.state,
//         products: JSON.stringify(cart.map((item) => ({
//           productName: item.productName,
//           description: item.description,
//           category: item.category,
//           price: item.actualPrice,
//           images: item.images,
//         }))),
        
//       }),

//       paymentMethod: "paypal",
//     };

//     try {
//       // API call to place the order
//       const orderResponse = await apiPost("api/order2/orders2", orderData);

//       // Prepare data for the payment request
//       const postReqURl = "https://payment.yunicare.in/payment/ImpactStoreGeneratePayment";
//       const postData = {
//         trxId: txnid,
//         amount: String(totalAmount),
//         redirectUrl: "http://impactstore.in/cart", // Your redirect URL after payment
//       };

//       // Request payment URL
//       const response = await axios.post(postReqURl, postData);
//       const url = response?.data?.data?.data?.payment_url;
//       setPaymentUrl(url); // Store payment URL to be used for redirection
//     } catch (err) {
//       console.error("Order or payment request failed:", err);
//       setLoading(false);
//     }
//   };

//   // Open payment URL once it's set
//   useEffect(() => {
//     if (paymentUrl) {
//       window.open(paymentUrl, "_blank"); // Open payment page in a new tab
//     }
//   }, [paymentUrl]);

//   return (
//     <>
//       <Header /> {/* Assuming you have a Header component */}
//       <Container className="mt-5">
//         <div style={{ marginTop: "15%" }}>
//           <h2>Checkout</h2>

//           {/* Display Cart Items */}
//           <Row className="mb-3  border p-3">
//   <Col md={8}>
//     {cart.map((item) => (
//       <Row key={item._id} className="mb-3">
//         <Col md={6}>
//         <img
//                 src={item?.images[0]}
//                 alt={item?.productName}
//                 style={{ width: "100px", height: "100px", objectFit: "cover" }}
//               />
//           <h5>{item.productName}</h5>
//           <p>Quantity: {item.qty}</p>
//         </Col>
//         <Col md={6}>
//           <p>Price: ₹{(item.actualPrice * item.qty).toFixed(2)}</p>
//         </Col>
//       </Row>
//     ))}
//   </Col>
//   <Col md={4} className="text-end">
//     <h4 className="text-success">Total: ₹{totalAmount}</h4>
//   </Col>
// </Row>

//           {/* Shipping Form */}
//           <h5>Shipping Details</h5>
//           <Form onSubmit={handleSubmit}>
//             <Row>
//               <Col md={6}>
//                 <Form.Group controlId="firstName">
//                   <Form.Label>First Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={formData.firstName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, firstName: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="lastName">
//                   <Form.Label>Last Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={formData.lastName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, lastName: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group controlId="mobile">
//                   <Form.Label>Mobile</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={formData.mobile}
//                     onChange={(e) =>
//                       setFormData({ ...formData, mobile: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="email">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group controlId="address">
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={formData.address}
//                     onChange={(e) =>
//                       setFormData({ ...formData, address: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={2}>
//                 <Form.Group controlId="pincode">
//                   <Form.Label>Pincode</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={formData.pincode}
//                     onChange={(e) =>
//                       setFormData({ ...formData, pincode: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={2}>
//                 <Form.Group controlId="country">
//                   <Form.Label>Country</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={formData.country}
//                     onChange={(e) =>
//                       setFormData({ ...formData, country: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={2}>
//                 <Form.Group controlId="state">
//                   <Form.Label>State</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={formData.state}
//                     onChange={(e) =>
//                       setFormData({ ...formData, state: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Button
//               variant="success"
//               type="submit"
//               style={{ marginTop: "20px" }}
//               disabled={loading}
//             >
//               {loading ? "Placing Order..." : "Place Order"}
//             </Button>
//           </Form>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default CartOrderForm;




'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import Header from "@/Layout/Header";
import { apiGet, apiPost } from "@/api/apiMethods";

const CartOrderForm = () => {
  const router = useRouter();
  const txnid = `tgD59N${Date.now()}`; // Unique transaction ID
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cart, setCart] = useState([]); // Store cart items here
  const [formData, setFormData] = useState({
    referenceWebsite: process.env.NEXT_PUBLIC_REFERENCE_WEBSITE,
    products: [],
    shippingAddress: {
      address: "",
      pinCode: "",
      state: "",
      country: "",
    },
    type: "cart",
  });
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0).toFixed(2);

  // Fetch cart data from API
  useEffect(() => {
   apiGet("api/cart")
      .then((response) => {
        const cartData = response.data.cart;
        setCart(cartData.items); // Update cart with the items
        setFormData({
          ...formData,
          products: cartData.items.map((item) => ({
            product: item.product._id,
            productName: item.product.productName,
            price: item.product.actualPrice,
            quantity: item.quantity,
            total: item.total,
          })),
        });
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  // Fetch countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,languages")
      .then((res) => res.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name.common,
          flag: country.flags?.png || country.flags?.svg,
          languages: Object.values(country.languages || {}).join(", "),
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetch states based on selected country
  useEffect(() => {
    if (selectedCountry) {
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: selectedCountry }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error("Error fetching states:", data.msg);
            setStates([]);
          } else {
            setStates(data.data.states.map((state) => state.name));
          }
        })
        .catch((error) => console.error("Error fetching states:", error));
    }
  }, [selectedCountry]);

  // Handle input change for form
  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      shippingAddress: {
        ...formData.shippingAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = window.location.origin;
    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        ...formData,
        totalAmount,
      };

      console.log("Form Data Before Submit:", orderData); // Debugging step

      // Send order data to backend
      const response = await apiPost("api/order/order", orderData);
      // alert(response.data.message);
      if (response.data && response.data.message === "Order created successfully") {
        // Get the order ID from the response
        const orderId = response.data.order._id; // Assuming 'orderid' is part of the response

        // Reset form after successful submission
        setFormData({
          referenceWebsite: process.env.NEXT_PUBLIC_REFERENCE_WEBSITE,
          products: [],
          shippingAddress: {
            address: "",
            pinCode: "",
            state: "",
            country: "",
          },
        });
        let postReqURl = "https://payment.yunicare.in/payment/phonePeSwiftVita";
        let postData = {
          // "client_id": "SWIFTVITAUAT_2501131447128754045048",
          // "client_version": 1,
          // "client_secret": "N2Q3NGEzYjQtOWNlNC00ODExLThmZjAtOWQwMzE1MTEzZTRl",
          "merchantOrderId": orderId,  // Pass the order ID here
          "amount": Number(totalAmount) * 100,  // Multiply the total by 100
          "redirectUrl": `${baseUrl}/thanks?orderId=${orderId}`,
        };
        const paymentResponse = await apiPost(postReqURl, postData);
        console.log(paymentResponse)
        const url = paymentResponse?.data?.redirectUrl;
        window.location.href = url;
      }

      // Redirect to thank-you page
      // router.push("/thanks");
    } catch (error) {
      console.error("Error submitting the order:", error);
      alert("An error occurred while submitting the order.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <>
      <Header />
      <Container className="mt-5">
        <div style={{ marginTop: "15%" }}>
          <h2>Checkout</h2>
          {/* Display Cart Items */}
          <Row className="mb-3 border p-3">
            <Col md={8}>
              {cart.map((item) => (
                <Row key={item.product._id} className="mb-3">
                  <Col md={6}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.productName}
                      style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    />
                    <h5>{item.product.productName}</h5>
                    <p>Quantity: {item.quantity}</p>
                  </Col>
                  <Col md={6}>
                    <p>Price: ₹{(item.total).toFixed(2)}</p>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col md={4} className="text-end">
              <h4 className="text-success">Total: ₹{totalAmount}</h4>
            </Col>
          </Row>

          {/* Shipping Form */}
          <h5>Shipping Details</h5>
          <Form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.shippingAddress.address}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.shippingAddress.pinCode}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Country</label>
              <select
                name="country"
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  handleInputChange(e);
                }}
                className="form-control"
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label>State</label>
              <select
                name="state"
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="success"
              type="submit"
              style={{ marginTop: "20px" }}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default CartOrderForm;
