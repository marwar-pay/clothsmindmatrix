"use client"
import { apiPut } from "@/api/apiMethods";
import Header from "@/Layout/Header";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ThankYou() {
  const router = useRouter();
  const queryString = router.query;
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const url = 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';
  const client_id = "SWIFTVITAUAT_2501131447128754045048";
  const client_version = 1;
  const client_secret = "N2Q3NGEzYjQtOWNlNC00ODExLThmZjAtOWQwMzE1MTEzZTRl";

  async function fetchAuthToken(client_id, client_version, client_secret) {
    const body = new URLSearchParams({
      client_id,
      client_version,
      client_secret,
      grant_type: "client_credentials",
    }).toString();

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching token:", error.response?.data || error.message);
      throw new Error("Failed to fetch authentication token.");
    }
  }

  useEffect(() => {
    (async () => {
      try {
        if (!queryString.orderId) return;
        const accessToken = await fetchAuthToken(client_id, client_version, client_secret);
        const { data } = await axios.get(`https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order/${queryString.orderId}/status?details=false`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `O-Bearer ${accessToken}`,
          },
        });

        if (data.state === "COMPLETED") {
          setPaymentStatus("completed");
          await apiPut(`/api/order/orders/${queryString.orderId}/status`, {
            status: "processing",
            paymentStatus: "completed",
          });
        } else if (data.state === "FAILED") {
          setPaymentStatus("failed");
          await apiPut(`/api/order/orders/${queryString.orderId}/status`, {
            status: "cancelled",
            paymentStatus: "failed",
          });
        } else {
          setPaymentStatus("pending");
          await apiPut(`/api/order/orders/${queryString.orderId}/status`, {
            status: "pending",
            paymentStatus: "pending",
          });
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, [queryString]);

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", padding: "50px", marginTop: "10%" }}>
        <h1>Thank You!</h1>
        {paymentStatus === "completed" && <p>Your payment was successful! Your order is being processed.</p>}
        {paymentStatus === "failed" && <p>Your payment failed. Please try again or contact support.</p>}
        {paymentStatus === "pending" && <p>Your payment is pending. Please wait while we verify your order.</p>}
        <Link href="/" style={{ textDecoration: "none", color: "blue" }}>Return to Home</Link>
      </div>
    </>
  );
}
