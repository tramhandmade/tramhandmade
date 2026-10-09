import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartOpen,
    wishlistIds,
    setIsSearchOpen,
    setSelectedCategory,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'shop', label: 'Cửa hàng' },
    { id: 'collections', label: 'Bộ sưu tập' },
    { id: 'custom-builder', label: 'Tự phối nến' },
    { id: 'gifts', label: 'Quà tặng' },
    { id: 'journal', label: 'Cẩm nang nến' },
    { id: 'about', label: 'Về Trạm' },
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    if (viewId === 'shop') {
      setSelectedCategory('all');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Quiet Announcement Bar */}
      <div className="bg-[#6F3038] text-[#F7F0E8] text-xs py-1.5 px-4 text-center tracking-wide font-normal">
        <span>Miễn phí vận chuyển cho đơn từ 300.000đ · Tặng kèm thiệp viết tay theo yêu cầu cho mọi đơn quà tặng</span>
      </div>

      {/* Main Navbar: Top Bar Contract (Brand - Nav Links - Actions) */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#5A4038]/10 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5A4038] hover:text-[#6F3038] transition-colors"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Zone 1: Brand Wordmark (Single Element) */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex flex-col text-left focus:outline-none"
            >
              <span className="font-serif-heading text-2xl sm:text-2xl font-bold tracking-wider text-[#6F3038] group-hover:opacity-90 transition-opacity">
                TRẠM HANDMADE
              </span>
              <span className="text-[10px] tracking-widest text-[#8B4A4F] uppercase font-sans hidden sm:block">
                Nến Thơm Thủ Công & Nghệ Thuật
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean text with subtle indicator) */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium transition-colors relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-[#6F3038] font-semibold'
                      : 'text-[#5A4038]/80 hover:text-[#6F3038]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F3038] rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Quick Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#5A4038] hover:text-[#6F3038] hover:bg-[#F7F0E8] rounded-full transition-colors"
              aria-label="Tìm kiếm sản phẩm"
              title="Tìm kiếm"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('account')}
              className="p-2 text-[#5A4038] hover:text-[#6F3038] hover:bg-[#F7F0E8] rounded-full transition-colors relative"
              aria-label="Sản phẩm yêu thích"
              title="Danh sách yêu thích"
            >
              <Heart size={20} className={wishlistIds.length > 0 ? 'text-[#8B4A4F] fill-[#8B4A4F]/20' : ''} />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B4A4F] text-[#FFFDF9] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Customer Account */}
            <button
              onClick={() => handleNavClick('account')}
              className="p-2 text-[#5A4038] hover:text-[#6F3038] hover:bg-[#F7F0E8] rounded-full transition-colors"
              aria-label="Tài khoản khách hàng"
              title="Tài khoản"
            >
              <User size={20} />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 py-1.5 px-3 bg-[#6F3038] text-[#FFFDF9] hover:bg-[#5A4038] rounded-md transition-colors shadow-sm focus:outline-none"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag size={18} />
              <span className="text-xs font-semibold tabular-nums">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FFFDF9] p-6 shadow-xl flex flex-col justify-between h-full overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#5A4038]/10">
                <span className="font-serif-heading text-xl font-bold text-[#6F3038]">
                  TRẠM HANDMADE
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#5A4038] hover:text-[#6F3038]"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="py-6 space-y-3">
                {navLinks.map((link) => {
                  const isActive = currentView === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#E9D5D0] text-[#6F3038] font-semibold'
                          : 'text-[#5A4038] hover:bg-[#F7F0E8]'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}

                <div className="pt-4 border-t border-[#5A4038]/10 space-y-2">
                  <button
                    onClick={() => handleNavClick('track-order')}
                    className="block w-full text-left py-2.5 px-3 rounded-lg text-sm text-[#5A4038] hover:bg-[#F7F0E8]"
                  >
                    Tra cứu đơn hàng
                  </button>
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="flex items-center gap-2 w-full text-left py-2.5 px-3 rounded-lg text-sm text-[#8B4A4F] hover:bg-[#F7F0E8] font-medium"
                  >
                    <ShieldCheck size={16} />
                    Giao diện quản trị (Admin)
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#5A4038]/10 text-xs text-[#5A4038]/70">
              <p className="font-serif-heading italic text-[#8B4A4F] mb-1">
                “Chạm một cảm xúc – Chữa lành tâm hồn”
              </p>
              <p>Hotline: 090 123 4567</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
