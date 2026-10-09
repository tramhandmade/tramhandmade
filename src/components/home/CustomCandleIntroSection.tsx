import React from 'react';
import { Sparkles, ArrowRight, Layers, Palette, Wind, Feather, MessageSquare, Gift } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CustomCandleIntroSection: React.FC = () => {
  const { setCurrentView } = useShop();

  const steps = [
    { icon: Layers, label: 'Kiểu khuôn', desc: 'Vỏ sò, sao biển, cá voi, gấu nhỏ' },
    { icon: Palette, label: 'Màu nến', desc: 'Xanh biển, hồng đất, kem ngà' },
    { icon: Wind, label: 'Mùi hương', desc: 'Muối biển, hoa lê, oải hương, vani' },
    { icon: Feather, label: 'Phụ kiện', desc: 'Vỏ ốc thật, ngọc trai, vảy vàng 24k' },
    { icon: MessageSquare, label: 'Lời nhắn', desc: 'Khắc tên thiệp gỗ thủ công' },
    { icon: Gift, label: 'Bao bì', desc: 'Hộp kraft nơ nhung, hộp mica đèn led' },
  ];

  const handleStartCustomizing = () => {
    setCurrentView('custom-builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#F7F0E8] border-b border-[#5A4038]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#5A4038]/10 shadow-lg relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#E9D5D0] text-[#6F3038] text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={14} />
              <span>Dịch vụ đặc biệt tại Trạm Handmade</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#6F3038]">
              Bạn thích một chiếc nến không giống ai?
            </h2>

            <p className="text-sm sm:text-base text-[#5A4038]/85 leading-relaxed">
              Trở thành “nghệ nhân” cho chính món quà của mình. Tự tay phối màu, chọn hương thơm yêu thích và gắn kết những mảnh ký ức đại dương vào chiếc nến độc bản.
            </p>
          </div>

          {/* 6 Custom Step Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 my-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F0E8]/70 border border-[#5A4038]/10 rounded-xl p-4 text-center flex flex-col items-center hover:bg-[#E9D5D0]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFFDF9] text-[#6F3038] flex items-center justify-center mb-3 shadow-2xs">
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] text-[#8B4A4F] font-bold uppercase tracking-wider block">
                    Bước {idx + 1}
                  </span>
                  <h4 className="font-serif-heading text-sm font-bold text-[#5A4038] mt-0.5">
                    {step.label}
                  </h4>
                  <p className="text-[11px] text-[#5A4038]/70 mt-1 leading-snug line-clamp-2">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Call to Action Button */}
          <div className="text-center pt-2">
            <button
              onClick={handleStartCustomizing}
              className="py-4 px-8 bg-[#6F3038] text-[#FFFDF9] text-xs font-bold tracking-wider rounded-xl hover:bg-[#5A4038] transition-all shadow-md inline-flex items-center gap-2 uppercase group"
            >
              <span>TẠO CHIẾC NẾN CỦA RIÊNG BẠN</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-[#5A4038]/60 mt-3">
              Giá khởi điểm chỉ từ 159.000đ · Hoàn thiện và gửi hàng trong vòng 24–48h
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
