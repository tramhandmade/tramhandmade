import React from 'react';
import { Heart, Sparkles, Shield, Compass, Leaf, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useShop();

  const reasons = [
    {
      icon: Leaf,
      title: '100% Sáp Thực Vật Tự Nhiên',
      desc: 'Chúng mình cam kết không sử dụng sáp paraffin công nghiệp có hại. Nến Trạm được làm từ sáp đậu nành hạt nhập khẩu kết hợp sáp dừa, cháy sạch không khói đen.',
    },
    {
      icon: Heart,
      title: 'Đúc Tay Tỉ Mỉ Từng Chi Tiết',
      desc: 'Từ việc nhặt nhạnh từng chiếc vỏ sò tự nhiên, sấy hoa khô đến đính kết ngọc trai, mỗi sản phẩm đều chứa đựng tâm huyết và sự nâng niu của người thợ thủ công.',
    },
    {
      icon: Compass,
      title: 'Trải Nghiệm Mùi Hương Chữa Lành',
      desc: 'Mỗi hũ nến mang một câu chuyện riêng, từ mùi hương mặn mòi của biển khơi đến hương hoa nở rộ, giúp vỗ về tinh thần và đánh thức các giác quan tích cực.',
    },
    {
      icon: Sparkles,
      title: 'Cá Nhân Hóa Độc Bản',
      desc: 'Khách hàng có thể tự do sáng tạo từ khuôn dáng, màu sắc, khắc tên đến lời nhắn trao tặng, biến chiếc nến thành món quà duy nhất trên đời.',
    },
  ];

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest block">
            Về Chúng Mình
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#6F3038] leading-tight">
            TRẠM HANDMADE
          </h1>
          <p className="font-serif-heading italic text-lg sm:text-xl text-[#8B4A4F]">
            “Chạm một cảm xúc – Chữa lành tâm hồn”
          </p>
          <p className="text-sm sm:text-base text-[#5A4038]/85 leading-relaxed pt-2">
            TRẠM HANDMADE là thương hiệu nến thơm thủ công nghệ thuật hướng đến những sản phẩm vừa có giá trị sử dụng, vừa mang tính thẩm mỹ và cảm xúc sâu lắng.
          </p>
        </div>

        {/* Narrative & Visual Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#5A4038]/10 bg-[#F7F0E8]">
            <img
              src="/src/assets/images/hero_candle_artisan_1791132458744.jpg"
              alt="Xưởng đúc nến Trạm Handmade"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="md:col-span-6 space-y-4 text-sm text-[#5A4038]/85 leading-relaxed">
            <h2 className="font-serif-heading text-2xl font-bold text-[#6F3038]">
              Trạm Dừng Chân Cho Những Tâm Hồn Mỏi Mệt
            </h2>
            <p>
              Giữa nhịp sống đô thị hối hả và những áp lực vô hình, ai trong chúng ta cũng cần một khoảng lặng. Trạm Handmade ra đời với ước mong trở thành “trạm dừng nhỏ” ấm áp – nơi bạn có thể chậm rãi ngắm nhìn ánh lửa bập bùng và hít hà mùi hương đại dương quen thuộc.
            </p>
            <p>
              Mỗi ngọn nến hình vỏ sò, sao biển hay bông hoa sen nở không đơn thuần là một vật phẩm trang trí, mà là một tác phẩm mang theo nguồn năng lượng bình an gửi tới không gian sống của bạn.
            </p>
          </div>
        </div>

        {/* SECTION: VÌ SAO CHỌN TRẠM? */}
        <div className="pt-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#6F3038]">
              Vì Sao Chọn Trạm Handmade?
            </h2>
            <p className="text-xs sm:text-sm text-[#5A4038]/70 mt-1">
              5 giá trị cốt lõi làm nên sự khác biệt trong từng tác phẩm nến thủ công
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F7F0E8]/50 border border-[#5A4038]/10 hover:bg-[#F7F0E8] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E9D5D0] text-[#6F3038] flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-serif-heading text-lg font-bold text-[#6F3038] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5A4038]/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-[#6F3038] text-[#FFFDF9] space-y-4">
          <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold">
            Ghé Thăm Cửa Hàng & Khám Phá Hương Thơm
          </h3>
          <p className="text-xs sm:text-sm text-[#FFFDF9]/80 max-w-md mx-auto">
            Hãy để Trạm đồng hành cùng bạn trên hành trình tạo dựng không gian sống an yên và ấm cúng.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-3 px-6 bg-[#FFFDF9] text-[#6F3038] hover:bg-[#F7F0E8] rounded-xl text-xs font-bold tracking-wider inline-flex items-center gap-2 uppercase transition-colors"
            >
              <span>XEM CỬA HÀNG TRỰC TUYẾN</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
