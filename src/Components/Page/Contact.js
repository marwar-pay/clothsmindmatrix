import Contactus from './Contactus';
import ImagePage from './Imagebanner';
import Header from '@/Layout/Header';

export default function Contact() {
  return (
    <>
      <Header />
      <div className="bg-light">
        <ImagePage />
       <Contactus/>

      
      </div>
    </>
  );
}
