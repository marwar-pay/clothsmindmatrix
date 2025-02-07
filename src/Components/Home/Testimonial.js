import Image from "next/image";
import img1 from '../../assets/pinkcityimg/userwoman.png'; // Update with female image
import img2 from '../../assets/pinkcityimg/userwoman.png'; // Update with family image
import img3 from '../../assets/pinkcityimg/userman.png'; // Update with male image
import img4 from '../../assets/pinkcityimg/customer.png'; // Update with male image

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priya D.',
      role: 'Happy Shopper',
      feedback:
        'MindMatrix Care offers an amazing collection of trendy and comfortable clothing. I love the quality, and shopping here is always a great experience. Highly recommend it!',
      image: img1, // Female image
    },
    {
      name: 'The Sharma Family',
      role: 'Satisfied Customers',
      feedback:
        'Shopping for family outfits has never been easier. MindMatrix Care has stylish clothes for all ages, and the sizes fit perfectly. We’ll be back for more!',
      image: img2, // Family image
    },
    {
      name: 'Rohit S.',
      role: 'Loyal Customer',
      feedback:
        'I always trust MindMatrix Care for my clothing needs. The fabrics are high-quality, and I love the variety. Great service and fast delivery!',
      image: img3, // Male image
    },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4" style={{ color: '#6c757d' }}>
        Our Happy Customers
      </h1>
      <p className="text-center text-secondary mb-5">
        Hear from our customers who love shopping for stylish and comfortable clothing at MindMatrix Care.
      </p>

      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {testimonials.map((testimonial, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="">
                    <div className=" text-center">
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="rounded-circle"
                          style={{ width: '120px', height: '120px' }}
                        />
                      </div>
                      <h5 className="card-title text-dark">{testimonial.name}</h5>
                      <h6 className="text-muted">{testimonial.role}</h6>
                      <p className="card-text text-secondary mt-3">
                        {testimonial.feedback}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <Image src={img4} style={{ width: '100%' }} alt="Customer" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
