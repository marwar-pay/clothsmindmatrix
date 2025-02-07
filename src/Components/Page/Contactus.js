import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Contactus() {
  return (
    <div className="bg-gray-50">
      <header className="bg-dark text-white p-5 text-center">
        <h1 className="display-4">Contact Us</h1>
        <p className="lead">We would love to hear from you!</p>
      </header>

      <div className="container py-5">
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-12 col-md-6">
            <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="h4 text-dark mb-4">Get In Touch</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                    <input type="text" id="name" className="form-control" placeholder="Your Name" required />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaEnvelope /></span>
                    <input type="email" id="email" className="form-control" placeholder="Your Email" required />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-tag"></i></span>
                    <input type="text" id="subject" className="form-control" placeholder="Subject" required />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-comment"></i></span>
                    <textarea id="message" className="form-control" rows="4" placeholder="Your Message" required></textarea>
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="mt-4 text-white py-2 px-6 rounded-md hover:bg-pink-700" style={{ backgroundColor: "#636161" }}>Submit</button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-12 col-md-6">
            <div className="bg-light p-5 shadow-lg rounded-lg">
              <h2 className="h4 text-dark mb-4">Contact Information</h2>
              <div className="row">
              <div className="d-flex gap-3 mt-2">
                  <FaPhoneAlt className="text-primary me-2" />
                  <a href="tel:+91-9602162483" className="text-dark">+91-9602162483</a>
                </div>
                <div className="d-flex gap-3 mt-2">
                  <FaEnvelope className="text-primary me-2" />
                  <a href="mailto:Mindmatrixcarepvtltd@gmail.com" className="text-dark">Mindmatrixcarepvtltd@gmail.com</a>
                </div>
                <div className="d-flex gap-3 mt-2">
                  <FaMapMarkerAlt className="text-primary me-2" />
                  GroundFloor 85, Shiv Nagar, Bindayaka Jaipur Rajasthan Pincode - 302012
                </div>
              </div>

              <h6 className="mt-4">Follow Us</h6>
              <div className="d-flex gap-3 mt-2">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-dark">
                  <FaFacebook size={24} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-dark">
                  <FaInstagram size={24} />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="text-dark">
                  <FaYoutube size={24} />
                </a>
              </div>

              <div className="mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.5065724388182!2d75.70567402450642!3d26.950852958452177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4ddbb7cf5161%3A0xd177ce5bc9dd23ac!2sGovindam%20Tower%2C%20Kalwar%20Road!5e0!3m2!1sen!2sin!4v1735905802910!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
