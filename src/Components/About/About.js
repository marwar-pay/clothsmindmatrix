// pages/about.js

import Image from "next/image";
import img from '../../assets/pinkcityimg/productsmarque/about.jpg'

export default function About() {
  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left Column (Image) */}
          <div className="col-md-6">
            <div className="image-container mb-4 mb-md-0">
              <Image
                src={img}
                alt="About Us"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="col-md-6">
            <h1 className="text-dark mb-3">About MINDMATRIXCARE PRIVATE LIMITED</h1>
            <p className="text-muted">
              MINDMATRIXCARE PRIVATE LIMITED is a brand dedicated to redefining fashion with high-quality, stylish, and comfortable clothing. Whether it's casual wear, formal attire, or ethnic outfits, we bring you the best trends at unbeatable prices.
            </p>
          </div>
        </div>

        <div className=" py-8 px-6 sm:px-10 md:px-20">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-dark">Style That Defines You</h1>
          </header>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-dark mb-4">Our Collection</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We offer a diverse range of clothing for men, women, and children. From trendy everyday wear to elegant formal outfits, our collections are designed to keep you stylish and comfortable.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-dark mb-4">Why Shop With Us?</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-center">
                <span className="mr-2 text-blue-600">✔</span> <strong>Latest Trends:</strong> Stay ahead in fashion with our up-to-date styles.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-600">✔</span> <strong>Premium Fabrics:</strong> High-quality materials for maximum comfort.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-600">✔</span> <strong>Affordable Prices:</strong> Fashion that fits your budget.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-600">✔</span> <strong>Inclusive Sizing:</strong> Clothing options for all body types.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-dark mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              MINDMATRIXCARE PRIVATE LIMITED was founded with a vision to make high-quality fashion accessible to everyone. From humble beginnings, we have grown into a trusted name in the clothing industry, ensuring style meets affordability.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Our Commitment</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are committed to providing an exceptional shopping experience, ensuring that our customers always find the perfect outfit for any occasion. Your style, your way – only at MINDMATRIXCARE PRIVATE LIMITED.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
