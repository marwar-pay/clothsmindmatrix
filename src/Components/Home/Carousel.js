import Image from 'next/image';
import { Carousel } from 'react-bootstrap';
import img  from '../../assets/pinkcityimg/slider/1.jpg'
import img1  from '../../assets/pinkcityimg/slider/2.jpg'
import img2  from '../../assets/pinkcityimg/slider/3.jpg'
export default function ImageCarousel() {
  return (
    <div className="container-fluid p-0">
      <Carousel interval={3000} indicators={false}>
      

        <Carousel.Item>
          <Image
            className="d-block w-100"
            src={img}
            alt="Second slide"
            style={{ backgroundSize: 'cover' ,width:"100%",backgroundRepeat:"no-repeat" }} />
         
       
        </Carousel.Item>

        <Carousel.Item>
          <Image
            className="d-block w-100"
            src={img1}
            alt="Third slide"
            style={{ backgroundSize: 'cover' ,width:"100%",backgroundRepeat:"no-repeat" }} />
    
        </Carousel.Item>

        <Carousel.Item>
          <Image
            className="d-block w-100"
            src={img2}
            alt="Fourth slide"
            style={{ backgroundSize: 'cover' ,width:"100%",backgroundRepeat:"no-repeat" }} />
      
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
