import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const BrandStorySection: React.FC = () => {
  const { setCurrentView } = useShop();

  const handleAboutClick = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#FFFDF9] border-b border-[#5A4038]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Images Layout (Craftsman / Details) */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#5A4038]/10">
                <img
                  src="/src/assets/images/hero_candle_artisan_1791132458744.jpg"
                  alt="Nghệ nhân đúc nến tại Trạm Handmade"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating accent card */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#F7F0E8] p-5 rounded-2xl border border-[#5A4038]/10 shadow-md max-w-xs">
                <div className="flex items-center gap-2 text-[#8B4A4F] mb-1.5">
                  <Heart size={16} className="fill-[#8B4A4F]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Thủ Công 100%</span>
                </div>
                <p className="text-xs text-[#5A4038]/85 italic">
                  “Mỗi ngọn nến thắp lên là một lời nhắc nhở dịu dàng rằng bạn xứng đáng được bình yên.”
                </p>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest">
              <span>Câu Chuyện Của Trạm</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#6F3038] tracking-tight leading-tight">
              TRẠM – một nơi để bạn chậm lại.
            </h2>

            <p className="text-base text-[#5A4038]/85 leading-relaxed">
              Giữa những ngày vội vã, Trạm Handmade tạo ra những món quà nhỏ để bạn có thể dành một khoảng thời gian cho chính mình. Từ sáp nến, mùi hương đến từng chi tiết trang trí, mỗi sản phẩm đều được hoàn thiện thủ công với mong muốn mang đến một trải nghiệm gần gũi và riêng biệt.
            </p>

            <p className="text-sm text-[#5A4038]/75 leading-relaxed">
              Chúng mình tin rằng nến thơm không chỉ dừng lại ở công năng chiếu sáng hay tỏa hương. Đó là chiếc chìa khóa mở ra cánh cửa ký ức, là ngọn lửa ấm áp sưởi ấm tâm hồn bạn sau những giờ làm việc mỏi mệt.
            </p>

            <div className="pt-2">
              <button
                onClick={handleAboutClick}
                className="py-3 px-6 bg-[#6F3038] text-[#FFFDF9] text-xs font-semibold tracking-wider rounded-lg hover:bg-[#5A4038] transition-colors inline-flex items-center gap-2 uppercase shadow-sm group"
              >
                <span>VỀ TRẠM</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
