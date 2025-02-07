import Image from "next/image";
import img from "../../assets/pinkcityimg/login.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { apiPost } from "@/api/apiMethods";
import Header from "@/Layout/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiPost("api/auth/logIn", {
        referenceWebsite: referenceWebsite || '',
        email,
        password,
      });

      if (res.status === 200 && res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.msg || "Login successful!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        throw new Error(res.data.msg || "Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Login failed. Please try again.";
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div className="row w-100">
          {/* Left Pane with Image */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center py-5">
            
            <Image
              src={img}
              alt="Login Illustration"
              // width={}
              // height={150}
              className="img-fluid"
              style={{width:'90%'}}
            />
          </div>

          {/* Right Pane with Form */}
          <div className="col-md-6 d-flex flex-column justify-content-center p-5 bg-light">
          <h2 className=" mb-4 text-center mb-4">LOGIN</h2>
          <p className=" text-center mb-4">Get access to your Orders, Wishlist, and Recommendations</p>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="d-flex justify-content-between mb-4">
                <Link href="/forgot-password" className="text-primary">Forgot?</Link>
              </div>

              <button type="submit" className="btn btn-dark w-100 mb-3">Login</button>
              {message && <div className="alert alert-danger">{message}</div>}
              <div className="text-center">
                <Link href="/register" className="text-secondary">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </>
  );
}
