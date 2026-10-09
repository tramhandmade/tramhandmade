import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CollectionsSection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const collections = [
    {
      id: 'the-ocean',
      title: 'THE OCEAN',
      subtitle: 'Hơi Thở Đại Dương',
      description: 'Nến lấy cảm hứng từ biển khơi, vỏ sò tự nhiên, sao biển và lớp sáp xanh dịu êm.',
      image: '/src/assets/images/scallop_sand_ocean_1791133416209.jpg',
      categoryTarget: 'seashell',
    },
    {
      id: 'dreamy',
      title: 'DREAMY',
      subtitle: 'Giấc Mơ Êm Đềm',
      description: 'Các mẫu nến hoa mềm mại, sắc màu pastel dịu mắt, hòa quyện hương hoa sen và sen đá thanh tịnh.',
      image: '/src/assets/images/product_floral_lotus_1791132519065.jpg',
      categoryTarget: 'sculpture',
    },
    {
      id: 'sweet-gift',
      title: 'SWEET GIFT',
      subtitle: 'Món Quà Ngọt Ngào',
      description: 'Nến gấu teddy nhỏ xinh, set nến mini vỏ sò 4 màu và thiệp tay ý nghĩa.',
      image: '/src/assets/images/teddy_pink_pot_1791133518314.jpg',
      categoryTarget: 'gift',
    },
    {
      id: 'custom',
      title: 'CUSTOM',
      subtitle: 'Dấu Ấn Riêng Bản',
      description: 'Nến thiết kế theo yêu cầu: tự chọn khuôn, pha sắc màu, chọn mùi hương và khắc tên người thương.',
      image: '/src/assets/images/custom_workshop_candle_1791133786046.jpg',
      isCustomBuilder: true,
    },
  ];

  const handleOpenCollection = (col: typeof collections[0]) => {
    if (col.isCustomBuilder) {
      setCurrentView('custom-builder');
    } else {
      setSelectedCategory(col.categoryTarget || 'all');
      setCurrentView('shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-18 bg-[#F7F0E8]/50 border-b border-[#5A4038]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest block mb-1">
            Không Gian Cảm Xúc
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#6F3038]">
            Bộ Sưu Tập Đặc Trưng
          </h2>
          <p className="text-sm text-[#5A4038]/80 mt-2">
            Mỗi bộ sưu tập là một câu chuyện riêng, được định hình qua từng đường nét sáp nến thủ công và nốt hương chọn lọc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => handleOpenCollection(col)}
              className="group relative bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#5A4038]/10 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] overflow-hidden bg-[#F7F0E8]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-600"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#8B4A4F] uppercase tracking-wider block">
                    {col.subtitle}
                  </span>
                  <h3 className="font-serif-heading text-xl font-bold text-[#6F3038] mt-1 group-hover:text-[#8B4A4F] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#5A4038]/75 mt-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#5A4038]/10 flex items-center justify-between text-xs font-semibold text-[#6F3038]">
                  <span>Khám phá ngay</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#8B4A4F]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
