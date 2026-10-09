import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';

// View Components
import { HeroSection } from './components/home/HeroSection';
import { BrandCommitmentSection } from './components/home/BrandCommitmentSection';
import { FeaturedProductsSection } from './components/home/FeaturedProductsSection';
import { CollectionsSection } from './components/home/CollectionsSection';
import { BrandStorySection } from './components/home/BrandStorySection';
import { CustomCandleIntroSection } from './components/home/CustomCandleIntroSection';
import { GiftCombosSection } from './components/home/GiftCombosSection';
import { CandleJournalSection } from './components/home/CandleJournalSection';

import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/shop/ProductDetailPage';
import { CustomCandleBuilder } from './components/custom/CustomCandleBuilder';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderTrackingPage } from './components/tracking/OrderTrackingPage';
import { AboutPage } from './components/about/AboutPage';
import { JournalPage } from './components/journal/JournalPage';
import { AccountPage } from './components/account/AccountPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  switch (currentView) {
    case 'shop':
      return <ShopPage />;

    case 'product-detail':
      return <ProductDetailPage />;

    case 'custom-builder':
      return <CustomCandleBuilder />;

    case 'collections':
      return (
        <div className="py-8 bg-[#FFFDF9]">
          <CollectionsSection />
          <ShopPage />
        </div>
      );

    case 'gifts':
      return (
        <div className="py-8 bg-[#FFFDF9]">
          <GiftCombosSection />
          <ShopPage />
        </div>
      );

    case 'journal':
      return <JournalPage />;

    case 'about':
      return <AboutPage />;

    case 'track-order':
      return <OrderTrackingPage />;

    case 'checkout':
      return <CheckoutPage />;

    case 'account':
      return <AccountPage />;

    case 'admin':
      return <AdminDashboard />;

    case 'home':
    default:
      return (
        <main>
          {/* Section 1: Hero */}
          <HeroSection />

          {/* Section 2: Cam kết thương hiệu */}
          <BrandCommitmentSection />

          {/* Section 3: Sản phẩm nổi bật */}
          <FeaturedProductsSection />

          {/* Section 4: Bộ sưu tập */}
          <CollectionsSection />

          {/* Section 5: Câu chuyện Trạm */}
          <BrandStorySection />

          {/* Section 6: Tự phối nến */}
          <CustomCandleIntroSection />

          {/* Section 7: Quà tặng theo dịp */}
          <GiftCombosSection />

          {/* Section 8: Cẩm nang nến */}
          <CandleJournalSection />
        </main>
      );
  }
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#5A4038] font-sans antialiased selection:bg-[#E9D5D0] selection:text-[#6F3038]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <div className="flex-1">
          <MainContent />
        </div>

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <SearchModal />
        <ToastContainer />

        {/* Global Footer */}
        <Footer />
      </div>
    </ShopProvider>
  );
}
