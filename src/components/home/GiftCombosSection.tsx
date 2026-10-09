import React from 'react';
import { Gift, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { GIFT_OCCASIONS, PRODUCTS } from '../../data/products';

export const GiftCombosSection: React.FC = () => {
  const { setCurrentView, setSelectedCategory, viewProductDetail } = useShop();

  const handleOccasionClick = (recommendedId: string) => {
    const prod = PRODUCTS.find((p) => p.id === recommendedId);
    if (prod) {
      viewProductDetail(prod);
    } else {
      setSelectedCategory('gift');
      setCurrentView('shop');
    }
  };

  const handleViewAllGifts = () => {
    setSelectedCategory('gift');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#FFFDF9] border-b border-[#5A4038]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest block mb-1">
              <Gift size={14} />
              <span>Gửi Trao Yêu Thương</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#6F3038]">
              Hộp Quà Tặng Theo Dịp
            </h2>
            <p className="text-sm text-[#5A4038]/80 mt-2 max-w-xl">
              Mỗi món quà đều được thắt nơ nhung burgundy, xịt hương thơm tự nhiên và kèm thiệp viết tay theo thông điệp bạn nhắn gửi.
            </p>
          </div>

          <button
            onClick={handleViewAllGifts}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6F3038] hover:text-[#8B4A4F] transition-colors group uppercase tracking-wider"
          >
            <span>Xem tất cả combo quà tặng</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Occasion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GIFT_OCCASIONS.map((occ) => (
            <div
              key={occ.id}
              onClick={() => handleOccasionClick(occ.recommended)}
              className="p-6 bg-[#F7F0E8]/50 hover:bg-[#F7F0E8] border border-[#5A4038]/10 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-[#8B4A4F] uppercase tracking-wider">
                    {occ.tagline}
                  </span>
                  <Sparkles size={14} className="text-[#8B4A4F] opacity-70" />
                </div>
                <h3 className="font-serif-heading text-xl font-bold text-[#6F3038] group-hover:text-[#8B4A4F] transition-colors">
                  {occ.title}
                </h3>
                <p className="text-xs text-[#5A4038]/80 mt-1.5 leading-relaxed">
                  {occ.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#5A4038]/10 flex items-center justify-between text-xs font-semibold text-[#6F3038]">
                <span>Xem mẫu quà gợi ý</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#8B4A4F]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
