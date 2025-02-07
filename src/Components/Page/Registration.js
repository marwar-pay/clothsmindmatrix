'use client';
import Image from "next/image";
import img from '../../assets/pinkcityimg/login.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useState } from "react";
import { apiPost } from "@/api/apiMethods";
import { useRouter } from "next/navigation";
import Header from "@/Layout/Header";


export default function RegistrationPage() {
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  const [formData, setFormData] = useState({
    referenceWebsite: referenceWebsite || '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    isActive: true,
  });
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiPost('api/auth/signUp', formData);
      toast.success("register successful!");
      setMessage('User registered successfully');
      setTimeout(() => router.push('/login'), 2000); // Navigate to /login after 2 seconds
    } catch (error) {
      toast.error("register failed!");
      // Handle duplicate email error specifically
      if (error.response && error.response.data.includes('duplicate key error')) {
        setMessage('email already exists. Please use a different email address.');
      } else {
        setMessage('Error registering user: ' + (error.response?.data || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div className="row w-100">
        
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center py-5">
                  <Image src={img} alt="Registration Illustration" className="img-fluid"    style={{width:'90%'}} />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center p-5 bg-lights">
                  <h2 className="text-center mb-4">REGISTER</h2>
                  <p className="text-center mb-4">Create your account to access Orders, Wishlist, and Recommendations</p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter Your First Name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter Your Last Name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Mobile No"
                        required
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button className="btn btn-dark" type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    <Link href="/login" className="btn btn-link">Already have an account? Login</Link>
                  </div>
                </div>
              </div>
            </div>
         
       
    
    </>
  );
}
