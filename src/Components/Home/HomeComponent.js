import Navbar from "@/Layout/Header";
import ImageCarousel from "./Carousel";
import Marquee from "./Marque";
import AllProduct from "../Product/AllProduct";
import About from "./About";
import Testimonials from "./Testimonial";
import BestsellerSection from "./Bestseller";
import Newsletter from "./Newsletter";
import Contactus from "../Page/Contactus";
import ImagePage from "./Imagebanner";
import TopDiscountedCarousel from "../Product/Topdiscount";
import ScrollingOffer from "./Detailshop";






// import Product from "./Product";


function HomeComponent() {
  return (
    <div>
        <Navbar/>
        <ImageCarousel/>
        <About/> 
        <div className="container-fluid">
    <div className="row">
      <div className="col-lg-9 col-md-3 col-sm-12" style={{backgroundColor:"#6c757d",borderRadius:"2em" ,paddingTop:'20px',margin:'5% 0'}}>
      <h1 className="text-white">Featured Products</h1>
      <AllProduct/>
      </div>
      <div className="col-lg-3  col-md-3 col-sm-12" style={{marginTop:'11%'}}>
      <TopDiscountedCarousel/> 
      </div>
      </div>
    </div>
       
      
    <div className="relative w-full h-screen">
  <ScrollingOffer />
</div>
          {/* <ScrollingOffer/> */}
        <Marquee/>
        <ImagePage/>
        <BestsellerSection/>
        <Contactus/>
        <Testimonials/>
        <Newsletter/>
        
    </div>
  )
}

export default HomeComponent