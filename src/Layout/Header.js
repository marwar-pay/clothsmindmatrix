'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { apiGet } from "@/api/apiMethods";
import BecomeSeller from "@/Components/Page/Becomeseller";
import logo from "../assets/pinkcityimg/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart, cartitems,wishlist } = useCart();
  const router = useRouter();
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await apiGet(`api/website/${referenceWebsite}`);
        setCategories(response?.data?.website?.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await apiGet("api/auth/logOut");
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully!", { autoClose: 3000 });
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      toast.error("Logout failed, please try again");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4 py-2">
        <Link className="navbar-brand" href="/">
          <Image src={logo} alt="logo" width={80} height={50} className="rounded" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/about">About</Link></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Products</a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href="/products/allproducts">All Products</Link></li>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category._id}><Link className="dropdown-item" href={`/products/allproducts?category=${category._id}`}>{category.name}</Link></li>
                  ))
                ) : (
                  <li className="dropdown-item text-muted">No categories found</li>
                )}
              </ul>
            </li>
            <li className="nav-item"><Link className="nav-link" href="/orderhistory">Order History</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/contact">Contact Us</Link></li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Seller</a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href="https://com.yunicare.in/" target="_blank">Login</Link></li>
                <li><BecomeSeller /></li>
              </ul>
            </li>
            {isLoggedIn ? (
              <li className="nav-item"><button className="btn btn-outline-dark" onClick={handleLogout}>Logout</button></li>
            ) : (
              <li className="nav-item"><Link className="nav-link" href="/login">Login</Link></li>
            )}
            <li className="nav-item position-relative">
            <Link href="/cart" className="btn me-2 position-relative">
            <FaShoppingCart />
            {cartitems?.items?.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.8rem" }}
              >
                {cartitems?.items?.length}
              </span>
            )}
          </Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" href="/wishlist">
                <AiFillHeart className="text-danger fs-5" />
                {wishlist?.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{wishlist.length}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
