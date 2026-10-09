import React from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleNav = (view: string, cat?: string) => {
    setCurrentView(view);
    if (cat) {
      setSelectedCategory(cat);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F7F0E8] text-[#5A4038] border-t border-[#5A4038]/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#5A4038]/10">
          
          {/* Column 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif-heading text-2xl font-bold tracking-wider text-[#6F3038] block">
              TRẠM HANDMADE
            </span>
            <p className="font-serif-heading italic text-[#8B4A4F] text-base">
              “Chạm một cảm xúc – Chữa lành tâm hồn”
            </p>
            <p className="text-sm text-[#5A4038]/80 leading-relaxed max-w-md">
              TRẠM HANDMADE là thương hiệu nến thơm thủ công nghệ thuật. Từng ngọn nến được đổ tay từ 100% sáp đậu nành thiên nhiên, lấy cảm hứng từ đại dương, hoa cỏ và những điều bình dị, mang đến cho bạn một góc nhỏ an yên để chậm lại và vỗ về tâm hồn.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-[#6F3038]">
              <a
                href="#facebook"
                onClick={(e) => { e.preventDefault(); }}
                className="w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#5A4038]/10 flex items-center justify-center hover:bg-[#6F3038] hover:text-[#FFFDF9] transition-colors"
                aria-label="Facebook Trạm Handmade"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); }}
                className="w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#5A4038]/10 flex items-center justify-center hover:bg-[#6F3038] hover:text-[#FFFDF9] transition-colors"
                aria-label="Instagram Trạm Handmade"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#tiktok"
                onClick={(e) => { e.preventDefault(); }}
                className="w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#5A4038]/10 flex items-center justify-center hover:bg-[#6F3038] hover:text-[#FFFDF9] transition-colors font-bold text-xs"
                aria-label="TikTok Trạm Handmade"
              >
                TT
              </a>
            </div>
          </div>

          {/* Column 3: Khám phá */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-base font-semibold text-[#6F3038] tracking-wide">
              Khám Phá
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('shop', 'all')}
                  className="hover:text-[#6F3038] transition-colors text-left"
                >
                  Tất cả sản phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'seashell')}
                  className="hover:text-[#6F3038] transition-colors text-left"
                >
                  Nến vỏ sò & đại dương
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('collections')}
                  className="hover:text-[#6F3038] transition-colors text-left"
                >
                  Bộ sưu tập nến
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('custom-builder')}
                  className="hover:text-[#6F3038] transition-colors text-left text-[#8B4A4F] font-medium"
                >
                  Tự phối nến theo ý
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gifts')}
                  className="hover:text-[#6F3038] transition-colors text-left"
                >
                  Hộp quà tặng Trạm
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('journal')}
                  className="hover:text-[#6F3038] transition-colors text-left"
                >
                  Cẩm nang đốt nến
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Hỗ trợ khách hàng */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-base font-semibold text-[#6F3038] tracking-wide">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('track-order')}
                  className="hover:text-[#6F3038] transition-colors text-left font-medium text-[#6F3038]"
                >
                  Tra cứu đơn hàng
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('journal')}
                  className="hover:text-[#6F3038] transition-colors text-left"
                >
                  Hướng dẫn sử dụng & an toàn
                </button>
              </li>
              <li>
                <span className="text-[#5A4038]/70">Chính sách đổi trả trong 7 ngày</span>
              </li>
              <li>
                <span className="text-[#5A4038]/70">Chính sách giao hàng toàn quốc</span>
              </li>
              <li>
                <span className="text-[#5A4038]/70">Chính sách bảo mật thông tin</span>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="flex items-center gap-1.5 text-xs text-[#8B4A4F] hover:underline pt-2 font-medium"
                  title="Dành cho bài tiểu luận môn TMĐT"
                >
                  <ShieldCheck size={14} />
                  Giao diện Quản trị (Admin Demo)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Liên hệ */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-base font-semibold text-[#6F3038] tracking-wide">
              Thông Tin Liên Hệ
            </h4>
            <div className="space-y-3 text-sm text-[#5A4038]/80">
              <div className="flex items-start gap-2.5">
                <MapPin size={17} className="text-[#8B4A4F] shrink-0 mt-0.5" />
                <span>Số 18, Đường Hoa Hồng, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={17} className="text-[#8B4A4F] shrink-0" />
                <span>Hotline: 090 123 4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={17} className="text-[#8B4A4F] shrink-0" />
                <span>chao@tramhandmade.vn</span>
              </div>
              <div className="pt-2 text-xs text-[#5A4038]/70">
                <p>Giờ mở cửa xưởng nến:</p>
                <p className="font-medium text-[#5A4038]">09:00 – 21:00 (Thứ 2 – Chủ Nhật)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5A4038]/70 gap-4">
          <p>© 2026 TRẠM HANDMADE. Dự án Thương mại điện tử Nến thơm thủ công & Quà tặng nghệ thuật.</p>
          <div className="flex items-center gap-1">
            <span>Thiết kế chỉn chu với</span>
            <Heart size={13} className="text-[#6F3038] fill-[#6F3038]" />
            <span>dành cho tâm hồn cần chữa lành</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
