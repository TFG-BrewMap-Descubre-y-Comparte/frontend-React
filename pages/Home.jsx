import Navbar from "../components/navbar";
import Slideshow from "../components/SlideShow";
import Ventajas from "../components/Ventajas";
import SeccionTira from "../components/SeccionTira";
import SeccionEquipo from "../components/SeccionEquipo";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Slideshow />
      <Ventajas />
      <SeccionTira />
      <SeccionEquipo />
      <Footer />
    </>
  );
}
