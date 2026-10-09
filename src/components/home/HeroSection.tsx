import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleShopClick = () => {
    setSelectedCategory('all');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomClick = () => {
    setCurrentView('custom-builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#F7F0E8] overflow-hidden border-b border-[#5A4038]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B4A4F] tracking-widest uppercase">
              <Sparkles size={14} />
              <span>Thương hiệu nến thơm thủ công & nghệ thuật</span>
            </div>

            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#6F3038] tracking-tight leading-[1.15] text-balance">
              Thắp một ngọn nến,<br />
              giữ lại một khoảng bình yên.
            </h1>

            <p className="text-base sm:text-lg text-[#5A4038]/85 leading-relaxed max-w-xl">
              Nến thơm handmade được tạo nên từ những chi tiết nhỏ – dành cho những khoảnh khắc bạn muốn chậm lại giữa dòng đời vội vã.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleShopClick}
                className="py-3.5 px-7 bg-[#6F3038] text-[#FFFDF9] text-xs font-semibold tracking-wider rounded-lg hover:bg-[#5A4038] transition-colors flex items-center justify-center gap-2 shadow-sm uppercase group"
              >
                <span>KHÁM PHÁ SẢN PHẨM</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleCustomClick}
                className="py-3.5 px-7 bg-[#FFFDF9] border border-[#6F3038] text-[#6F3038] text-xs font-semibold tracking-wider rounded-lg hover:bg-[#E9D5D0] transition-colors flex items-center justify-center shadow-xs uppercase"
              >
                <span>TỰ PHỐI NẾN</span>
              </button>
            </div>

            {/* Quick quiet trust labels */}
            <div className="pt-6 border-t border-[#5A4038]/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5A4038]/75">
              <span>100% sáp đậu nành thiên nhiên</span>
              <span aria-hidden="true">·</span>
              <span>Bấc cotton không chì</span>
              <span aria-hidden="true">·</span>
              <span>Đổ tay thủ công từng chiếc</span>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#5A4038]/10 bg-[#FFFDF9]">
                <img
                  src="/src/assets/images/hero_candle_artisan_1791132458744.jpg"
                  alt="Nến thơm thủ công Trạm Handmade"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Editorial Caption Tag */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-[#FFFDF9]/95 backdrop-blur-xs p-4 rounded-xl shadow-lg border border-[#5A4038]/10 max-w-xs">
                <p className="text-[11px] font-semibold text-[#8B4A4F] uppercase tracking-wider">
                  Bộ sưu tập mới nhất
                </p>
                <p className="font-serif-heading text-sm font-bold text-[#6F3038] mt-0.5">
                  The Ocean · Nến Vỏ Sò & Đại Dương
                </p>
                <p className="text-[11px] text-[#5A4038]/70 mt-1 line-clamp-1">
                  Đúc từ vỏ sò tự nhiên & hương muối biển dịu êm
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
