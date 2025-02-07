import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { apiPost } from "@/api/apiMethods";
import { useRouter } from "next/navigation";
import Header from "@/Layout/Header";


export default function OrderForm() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const { buyNowProduct } = useCart();
  const router = useRouter();
  const [paymentUrl, setPaymentUrl] = useState("");
  const total = buyNowProduct
    ? buyNowProduct.actualPrice * buyNowProduct?.qty
    : 0;

  const txnid = `tgD59N${Date.now()}`;
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  const [formData, setFormData] = useState({
    referenceWebsite: referenceWebsite,
    products: [
      { 
        product: buyNowProduct?._id,
        quantity: buyNowProduct?.qty,
        price: buyNowProduct?.actualPrice,
        total: buyNowProduct?.actualPrice * buyNowProduct?.qty,
      }
    ],
    shippingAddress: {
      address: "",
      pinCode: "",
      state: "",
      country: "",
    },
  });

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

  const handleInputChange = (e, field, index) => {
    if (field === "products") {
      const updatedProducts = [...formData.products];
      updatedProducts[index][e.target.name] = e.target.value;
      updatedProducts[index].total =
        updatedProducts[index].quantity * updatedProducts[index].price;
      setFormData({ ...formData, products: updatedProducts });
    } else if (field === "shippingAddress") {
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };



 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = window.location.origin;
    console.log(formData);
    try {
      const response = await apiPost("api/order/order", formData);
      console.log(response.data);
      // alert(response.data.message);

      if (response.data && response.data.message === "Order created successfully") {
        console.log("handleSubmit ~ response.data:", response.data);
        // Get the order ID from the response
        const orderId = response.data?.order?._id; // Assuming 'orderid' is part of the response

        // Prepare data for the payment request
        let postReqURl = "https://payment.yunicare.in/payment/phonePeSwiftVita";
        let postData = {
          // "client_id": "SWIFTVITAUAT_2501131447128754045048",
          // "client_version": 1,
          // "client_secret": "N2Q3NGEzYjQtOWNlNC00ODExLThmZjAtOWQwMzE1MTEzZTRl",
          "merchantOrderId": orderId,  // Pass the order ID here
          "amount": Number(total) * 100,  // Multiply the total by 100
          "redirectUrl": `${baseUrl}/thanks?orderId=${orderId}`,
        };
        const paymentResponse = await apiPost(postReqURl, postData);
        console.log(paymentResponse)
        const url = paymentResponse?.data?.redirectUrl;
        window.location.href = url;
      }

      setFormData();
      // router.push("/thanks");
    } catch (error) {
      console.error("Error submitting the order:", error);
      // alert("An error occurred while submitting the order.");
    }
  };




  return (
    <>
      <Header />
      <div className="container mt-5">
        
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Order Form</h1>

         
          <div className="row">
            <div className="col-md-4 ">
            <h2 className="mb-3">Products</h2>
              {formData?.products.map((product, index) => (
                <div key={index} className="border p-3 mb-3 rounded">
                  <div className="form-group mb-2">
                    <label>Product ID</label>
                    <input
                      type="text"
                      name="product"
                      value={product.product}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={product.quantity}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Total</label>
                    <input
                      type="number"
                      value={product.total}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-8">
              <h2 className="mb-3">Shipping Address</h2>
              <div className="form-group mb-3">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData?.shippingAddress?.address}
                  onChange={(e) => handleInputChange(e, "shippingAddress")}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData?.shippingAddress?.pinCode}
                  onChange={(e) => handleInputChange(e, "shippingAddress")}
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
                    handleInputChange(e, "shippingAddress");
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
                {selectedCountry && (
                  <div className="mt-2">
                    {countries
                      .filter((country) => country.name === selectedCountry)
                      .map((country) => (
                        <div key={country.name}>
                          <img
                            src={country.flag}
                            alt={`${country.name} flag`}
                            width="20"
                            className="mr-2"
                          />
                          <span>Languages: {country.languages}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label>State</label>
                <select
                  name="state"
                  onChange={(e) => handleInputChange(e, "shippingAddress")}
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
            </div>
          </div>

          <button type="submit" className="btn btn-success btn-block mt-3">
            Submit Order
          </button>
        </form>
      </div>
    </>
  );
}
