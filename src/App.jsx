import { useState, useCallback } from 'react';
import BackToTop from './components/BackToTop';
import HeroSection from './components/HeroSection';
import Diagnostics from './components/Diagnostics';
import SolutionSection from './components/SolutionSection';
import FilterSection from './components/FilterSection';
import BenefitsSection from './components/BenefitsSection';
import SocialProofSection from './components/SocialProofSection';
import HowItWorks from './components/HowItWorks';
import FinalCTASection from './components/FinalCTASection';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import BookingPage from './components/BookingPage';
import VideoBookingPage from './components/VideoBookingPage';
import CheckoutPage from './components/CheckoutPage';
import CatalogPage from './components/CatalogPage';

function App() {
  const [page,        setPage]        = useState('home');
  const [bookingData, setBookingData] = useState(null);
  const [cart,        setCart]        = useState([]);

  const addToCart = useCallback((item) => {
    setCart(prev => [...prev, item]);
  }, []);

  // onNavigate(pageName) or onNavigate(pageName, bookingPayload)
  const navigate = useCallback((newPage, data = null) => {
    if (data) setBookingData(data);
    if (newPage === 'checkout') setCart([]); // clear cart once we head to payment
    setPage(newPage);
    window.scrollTo(0, 0);
  }, []);

  if (page === 'services') {
    return (
      <>
        <ServicesPage onNavigate={navigate} cart={cart} />
        <BackToTop />
      </>
    );
  }

  if (page === 'contact') {
    return (
      <>
        <ContactPage onNavigate={navigate} />
        <BackToTop />
      </>
    );
  }

  if (page === 'booking') {
    return (
      <>
        <BookingPage onNavigate={navigate} cart={cart} addToCart={addToCart} />
        <BackToTop />
      </>
    );
  }

  if (page === 'videoBooking') {
    return (
      <>
        <VideoBookingPage onNavigate={navigate} cart={cart} addToCart={addToCart} />
        <BackToTop />
      </>
    );
  }

  if (page === 'catalog') {
    return (
      <>
        <CatalogPage onNavigate={navigate} cart={cart} addToCart={addToCart} />
        <BackToTop />
      </>
    );
  }

  if (page === 'checkout') {
    return (
      <>
        <CheckoutPage booking={bookingData} onNavigate={navigate} />
        <BackToTop />
      </>
    );
  }

  return (
    <>
      <BackToTop />
      <HeroSection onNavigate={navigate} />
      <Diagnostics />
      <SolutionSection />
      <FilterSection />
      <BenefitsSection />
      <SocialProofSection />
      <HowItWorks />
      <FinalCTASection onNavigate={navigate} />
    </>
  );
}

export default App;
