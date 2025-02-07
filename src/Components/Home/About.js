import { useEffect } from 'react';
import Image from 'next/image';
import img from '../../assets/pinkcityimg/productsmarque/about.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left Column (Image) */}
        <div className="col-md-6" data-aos="fade-up">
          <div className="image-container mb-4 mb-md-0">
            <Image
              src={img}
              alt="About Us"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>

        {/* Right Column (Content) */}
        <div className="col-md-6" data-aos="fade-up">
          <h1 className="text-pink mb-3">About MindMatrix Care</h1>
          <p className="text-muted">
            Welcome to MindMatrix Care! We're a passionate team dedicated to bringing you stylish, high-quality clothing that feels as good as it looks. Our mission is simple – to make fashion accessible, affordable, and tailored to everyone’s unique taste.
            <br />
            What makes us different? We care about the details. From using premium materials to ensuring perfect fits, every item we offer is crafted with you in mind. Whether you're updating your casual wear or dressing up for something special, we’ve got you covered.
            <br />
            At MindMatrix Care, we believe in more than just clothes – we’re a community that celebrates self-expression through fashion. Thank you for choosing us to be part of your style journey!
          </p>
        </div>
      </div>
    </div>
  );
}
